import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Listing from './Listing';

const Pagination = ({ listings, listingsPerPage, setCurrentPage }) => {
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    let pageNumberArray = [];
    for (let i = 1; i < Math.ceil(listings.length / listingsPerPage); i++) {
      pageNumberArray.push(i);
    }
    setPageNumbers(pageNumberArray);
  }, [listings, listingsPerPage]);

  return (
    <div className='paginationContainer'>
      {pageNumbers.map((number) => {
        return (
          <p
            key={number}
            className='paginationNumbers'
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </p>
        );
      })}
    </div>
  );
};

export default Pagination;
