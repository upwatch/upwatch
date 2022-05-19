import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchListings } from '../store/listings';
import { formatAsDollars, formatAsPercent, formatBigFloat } from '../utility';

const AllListings = () => {
  //const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { listings } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchListings());
  }, []);

  if (!listings.length) {
    return <p>Loading...</p>;
  } else {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <td>#</td>
              <td>NAME</td>
              <td>PRICE</td>
              <td>1H %</td>
              <td>24H %</td>
              <td>MARKET CAP</td>
              <td>VOLUME</td>
              <td>CIRCULATING SUPPLY</td>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing) => {
              return (
                <tr key={listing.cmc_rank}>
                  <td>{listing.cmc_rank}</td>
                  <td>
                    <img className='logo' src={listing.logoUrl} />
                    {listing.name}
                  </td>
                  <td>{formatAsDollars(listing.price)}</td>
                  <td>{formatAsPercent(listing.percent_change_1h)}</td>
                  <td>{formatAsPercent(listing.percent_change_24h)}</td>
                  <td>{formatAsDollars(listing.market_cap)}</td>
                  <td>{formatBigFloat(listing.volume_24h)}</td>
                  <td>{formatBigFloat(listing.circulating_supply)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default AllListings;
