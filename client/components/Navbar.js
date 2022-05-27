import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMetrics } from '../store/metrics';
import {
  formatAsDollars,
  formatDate,
  formatBigFloat,
  formatAsPercent,
} from '../utility';

const Navbar = () => {
  const { metrics } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMetrics());
  }, []);

  return (
    <nav>
      <div className='metrics'>
        <p>
          <small>Crypto Market Cap: </small>
          {formatAsDollars(metrics.total_market_cap)}
        </p>
        <p>
          <small>24 H Volume: </small>
          {formatBigFloat(metrics.total_volume_24h_reported)}
        </p>
        <p>
          <small>Overall Volume Change: </small>
          {formatAsPercent(
            metrics.total_market_cap_yesterday_percentage_change
          )}
        </p>
        <p>
          <small>Last Updated: </small>
          {formatDate(metrics.updatedAt)}
        </p>
      </div>
      <div className='logoContainer'>
        <Link to='/listings' style={{ textDecoration: 'none' }}>
          <h1>UPWATCH</h1>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
