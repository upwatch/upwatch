const axios = require('axios');
const {
  db,
  models: { Listing, Metrics, User },
} = require('./server/db');

async function getData(uri, apiKey) {
  try {
    const response = await axios.get(uri, {
      headers: {
        'X-CMC_PRO_API_KEY': apiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function createData(apiKey) {
  try {
    const listingDataUri =
      'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';
    const metricsDataUri =
      'https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest';
    const metaDataUri =
      'https://pro-api.coinmarketcap.com/v1/cryptocurrency/info';

    const { data: listingData } = await getData(listingDataUri, apiKey);
    const { data: metricsData } = await getData(metricsDataUri, apiKey);
    const metaDataQueryParams =
      '?id=' + listingData.map((data) => data.id).join(',');
    const { data: metaData } = await getData(
      metaDataUri + metaDataQueryParams,
      apiKey
    );

    // await Market.destroy({ truncate: true }); // clears instances in model
    await db.sync({ force: true }); // clears db and matches models to tables

    await Promise.all([
      listingData.map((data) =>
        Listing.create({
          cmc_id: data.id,
          last_updated: data.last_updated,
          name: data.name,
          symbol: data.symbol,
          slug: data.slug,
          cmc_rank: data.cmc_rank,
          circulating_supply: data.circulating_supply,
          total_supply: data.total_supply,
          price: data.quote.USD.price,
          volume_24h: data.quote.USD.volume_24h,
          volume_change_24h: data.quote.USD.volume_change_24h,
          percent_change_1h: data.quote.USD.percent_change_1h,
          percent_change_24h: data.quote.USD.percent_change_24h,
          percent_change_7d: data.quote.USD.percent_change_7d,
          percent_change_30d: data.quote.USD.percent_change_30d,
          percent_change_60d: data.quote.USD.percent_change_60d,
          percent_change_90d: data.quote.USD.percent_change_90d,
          market_cap: data.quote.USD.market_cap,
          market_cap_dominance: data.quote.USD.market_cap_dominance,
          fully_diluted_market_cap: data.quote.USD.fully_diluted_market_cap,
          logoUrl: metaData[data.id].logo,
          description: metaData[data.id].description,
        })
      ),

      await Metrics.create({
        last_updated: metricsData.quote.USD.last_updated,
        total_cryptocurrencies: metricsData.total_cryptocurrencies,
        active_exchanges: metricsData.active_exchanges,
        total_volume_24h_reported:
          metricsData.quote.USD.total_volume_24h_reported,
        total_market_cap: metricsData.quote.USD.total_market_cap,
        total_market_cap_yesterday:
          metricsData.quote.USD.total_market_cap_yesterday,
        total_market_cap_yesterday_percentage_change:
          metricsData.quote.USD.total_market_cap_yesterday_percentage_change,
      }),

      await User.create({ username: 'cody', password: '123' }),
    ]);
  } catch (error) {
    console.log(error);
  }
}

module.exports = createData;
