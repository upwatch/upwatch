import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Filters = ({
  setListingsPerPage,
  setNameSearch,
  setCurrentPage,
  nameSearch,
}) => {
  const nameFilter = (name) => {
    setCurrentPage(1);
    setListingsPerPage(Number.MAX_SAFE_INTEGER);
    setNameSearch(name.toLowerCase());
  };

  const handleListingsPerPage = (e) => {
    if (!nameSearch.length) {
      setListingsPerPage(e.target.value);
      setCurrentPage(1);
    }
  };

  return (
    <div className='filters-container'>
      <div className='filters'>
        <input
          autoComplete='off'
          placeholder='Filter by Name '
          onChange={(e) => nameFilter(e.target.value)}
        ></input>
      </div>
      <div className='filters'>
        <select defaultValue={'DEFAULT'} onChange={handleListingsPerPage}>
          <option value='DEFAULT' disabled hidden>
            Listings Per Page
          </option>
          <option value={Number.MAX_SAFE_INTEGER}>View All</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
