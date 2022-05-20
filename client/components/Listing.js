import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router'; //// -dom
import { fetchListing } from '../store/listing';
import { formatAsPercent, formatAsDollars, formatBigFloat } from '../utility';

const Listing = () => {
  const { listing } = useSelector((state) => state);

  const { cmc_id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchListing(cmc_id));
  }, []);

  return (
    <div>
      <div>
        <img src={listing.logoUrl} />
        {formatAsDollars(listing.price)}
        {listing.description}
      </div>
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
  );
};

export default Listing;
