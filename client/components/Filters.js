import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Filters = ({ setListingsPerPage, listingsPerPage }) => {
  return (
    <div>
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
