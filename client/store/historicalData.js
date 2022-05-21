import axios from 'axios';
import { formatHistoricalData } from '../utility';

const SET_HISTORICAL_DATA = 'SET_HISTORICAL_DATA';

const setHistoricalData = (data) => {
  return {
    type: SET_HISTORICAL_DATA,
    data,
  };
};

export const fetchHistoricalData = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `https://api.pro.coinbase.com/products/btc-usd/candles?granularity=86400`
      );
      dispatch(setHistoricalData(formatHistoricalData(data)));
    } catch (error) {
      console.log(error);
    }
  };
};

export default function historicalReducer(state = [], action) {
  switch (action.type) {
    case SET_HISTORICAL_DATA:
      return action.data;
    default:
      return state;
  }
}
