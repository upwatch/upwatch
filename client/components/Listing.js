import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router'; //// -dom
import { fetchListing } from '../store/listing';
import { fetchHistoricalData } from '../store/historicalData';
import { formatAsPercent, formatAsDollars, formatBigFloat } from '../utility';
import LineChart from './LineChart';

const d = [
  {
    date: 'Fri May 20 2022 20:00:00 GMT-0400 (Eastern Daylight Time)',
    low: 28913.26,
    high: 29319.67,
    open: 29155.74,
    close: 29129.14,
  },
  {
    date: 'Thu May 19 2022 20:00:00 GMT-0400 (Eastern Daylight Time)',
    low: 28690.92,
    high: 30729.83,
    open: 30274.59,
    close: 29155.75,
  },
  {
    date: 'Wed May 18 2022 20:00:00 GMT-0400 (Eastern Daylight Time)',
    low: 28645.2,
    high: 30500,
    open: 28671.5,
    close: 30274.59,
  },
  {
    date: 'Tue May 17 2022 20:00:00 GMT-0400 (Eastern Daylight Time)',
    low: 28605,
    high: 30675.92,
    open: 30412.1,
    close: 28672.94,
  },
];

const chartDays = 1;

const Listing = () => {
  // const ok = d
  //   .filter((e, i) => i <= chartDays)
  //   .reduce((a, b) => (a.close <= b.close ? a : b), {});

  // console.log('ok', ok);

  const test = d.filter((e, i) => i <= chartDays);
  console.log('test', test);
  const { listing } = useSelector((state) => state);

  const { cmc_id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchListing(cmc_id));
  }, []);

  useEffect(() => {
    dispatch(fetchHistoricalData());
  }, []);

  return (
    <div className='listing-container'>
      <div>
        <table className='all-listings-table'>
          <thead>
            <tr>
              <th>{listing.name}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img src={listing.logoUrl} />
              </td>
            </tr>
            <tr>
              <td>
                <strong>{listing.symbol}</strong>
              </td>
            </tr>
            <tr>
              <td>
                <strong>{formatAsDollars(listing.price)}</strong>
              </td>
            </tr>
          </tbody>
        </table>

        <table className='all-listings-table'>
          <thead>
            <tr>
              <th colSpan='2'>Price Performance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>% Change (24h)</strong>
              </td>
              <td>{formatAsPercent(listing.percent_change_24h)}</td>
            </tr>
            <tr>
              <td>
                <strong>% Change (30d)</strong>
              </td>
              <td>{formatAsPercent(listing.percent_change_30d)}</td>
            </tr>
            <tr>
              <td>
                <strong>% Change (60d)</strong>
              </td>
              <td>{formatAsPercent(listing.percent_change_60d)}</td>
            </tr>
            <tr>
              <td>
                <strong>% Change (90d)</strong>
              </td>
              <td>{formatAsPercent(listing.percent_change_90d)}</td>
            </tr>
          </tbody>
        </table>
        <table className='all-listings-table'>
          <thead>
            <tr>
              <th colSpan='2'>Market And Volume Stats</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Volume (24h)</strong>
              </td>
              <td>{formatBigFloat(listing.volume_24h)}</td>
            </tr>
            <tr>
              <td>
                <strong>Circulating Supply</strong>
              </td>
              <td>{formatBigFloat(listing.circulating_supply)}</td>
            </tr>
            <tr>
              <td>
                <strong>Market Cap</strong>
              </td>
              <td>{formatAsDollars(listing.market_cap)}</td>
            </tr>
            <tr>
              <td>
                <strong>Diluted Market Cap</strong>
              </td>
              <td>{formatAsDollars(listing.fully_diluted_market_cap)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <LineChart />
    </div>
  );
};

export default Listing;
