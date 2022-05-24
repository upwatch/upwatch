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
    console.log('arr', pageNumberArray);
    setPageNumbers(pageNumberArray);
  }, [listings, listingsPerPage]);
  console.log('from', listingsPerPage);
  return (
    <div>
      {pageNumbers.map((number) => {
        return (
          <p
            key={number}
            className='page-numbers'
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
