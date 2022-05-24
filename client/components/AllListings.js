import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { fetchListings } from '../store/listings';
import { formatAsDollars, formatAsPercent, formatBigFloat } from '../utility';
import Pagination from './Pagination';
import Filters from './Filters';

const AllListings = () => {
  const [nameSearch, setNameSearch] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();
  const { listings } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchListings());
  }, []);

  //pagination
  const [listingsPerPage, setListingsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [indexOfFirstListing, setIndexOfFirstListing] = useState(1);
  const [indexOfLastListing, setIndexOfLastListing] = useState(
    Number.MAX_SAFE_INTEGER
  );

  useEffect(() => {
    setIndexOfFirstListing(
      currentPage * listingsPerPage - (listingsPerPage - 1)
    );
    setIndexOfLastListing(currentPage * listingsPerPage);
  }, [currentPage, listingsPerPage]);
  console.log(listingsPerPage);
  if (!listings.length) {
    return <p>Loading...</p>;
  } else {
    return (
      <div>
        <Filters
          setListingsPerPage={setListingsPerPage}
          setNameSearch={setNameSearch}
          setCurrentPage={setCurrentPage}
        />
        <Pagination
          listings={listings}
          listingsPerPage={listingsPerPage}
          setCurrentPage={setCurrentPage}
        />
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
            {[...listings]
              .sort((a, b) => a.cmc_rank - b.cmc_rank)
              .filter((listing) => {
                if (nameSearch.length > 0) {
                  return listing.name.toLowerCase().includes(nameSearch);
                }
                return listing;
              })
              .map((listing) => {
                if (
                  listing.cmc_rank >= indexOfFirstListing &&
                  listing.cmc_rank <= indexOfLastListing
                )
                  return (
                    <tr
                      key={listing.cmc_rank}
                      onClick={() =>
                        history.push(`/listings/${listing.cmc_id}`)
                      }
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
                  );
              })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default AllListings;
