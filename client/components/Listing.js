import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router'; //// -dom
import { fetchListing } from '../store/listing';

const Listing = () => {
  const { listing } = useSelector((state) => state);

  const { cmc_id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchListing(cmc_id));
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>24 H</td>
            <td>{listing.percent_change_24h}</td>
          </tr>
          <tr>
            <td>30 D</td>
            <td>{listing.percent_change_30d}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Listing;
