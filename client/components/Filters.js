import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Filters = ({ setListingsPerPage, setNameSearch, setCurrentPage }) => {
  const nameFilter = (name) => {
    setCurrentPage(1);
    setListingsPerPage(Number.MAX_SAFE_INTEGER);
    setNameSearch(name.toLowerCase());
  };

  return (
    <div>
      <input
        autoComplete='off'
        placeholder='Filter by Name '
        onChange={(e) => nameFilter(e.target.value)}
      ></input>
      <select
        defaultValue={'DEFAULT'}
        onChange={(e) => setListingsPerPage(e.target.value)}
      >
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
  );
};

export default Filters;

{
  /* <div className='filters'>
<select
  defaultValue={'DEFAULT'}
  onClick={(e) => setUsersPerPage(e.target.value)}
>
  <option value='DEFAULT' disabled hidden>
    User Per Page
  </option>
  <option value={Number.MAX_SAFE_INTEGER}>View All</option>
  <option value={10}>10</option>
  <option value={20}>20</option>
  <option value={30}>30</option>
  <option value={40}>40</option>
  <option value={50}>50</option>
</select> */
}
