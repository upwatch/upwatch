import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { fetchListings } from '../store/listings';
import { formatAsDollars, formatAsPercent, formatBigFloat } from '../utility';

const AllListings = () => {
  //const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const { listings } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchListings());
  }, []);

  if (!listings.length) {
    return <p>Loading...</p>;
  } else {
    return (
      <div>
        <table className='all-listings-table'>
          <thead>
            <tr>
              <th>Rank</th>
              <th>{''}</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>% CHANGE (1h)</th>
              <th>% CHANGE (24h)</th>
              <th>MARKET CAP</th>
              <th>VOLUME (24hr)</th>
              <th>CIRCULATING SUPPLY</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing) => {
              return (
                <tr
                  key={listing.cmc_rank}
                  onClick={() => history.push(`/listings/${listing.cmc_id}`)}
                >
                  <td>{listing.cmc_rank}</td>
                  <td>
                    <img className='logo' src={listing.logoUrl} />
                  </td>
                  <td>
                    <strong>{listing.name}</strong>
                  </td>
                  <td>{formatAsDollars(listing.price)}</td>
                  <td>{formatAsPercent(listing.percent_change_1h)}</td>
                  <td>{formatAsPercent(listing.percent_change_24h)}</td>
                  <td>{formatAsDollars(listing.market_cap)}</td>
                  <td>{formatBigFloat(listing.volume_24h)}</td>
                  <td>{formatBigFloat(listing.circulating_supply)}</td>
                </tr>
                // </Link>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default AllListings;
