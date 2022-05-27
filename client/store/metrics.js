import axios from 'axios';

const SET_METRICS = 'SET_METRICS';

const setMetrics = (metrics) => {
  return {
    type: SET_METRICS,
    metrics,
  };
};

export const fetchMetrics = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/metrics');
      dispatch(setMetrics(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export default function metricsReducer(state = {}, action) {
  switch (action.type) {
    case SET_METRICS:
      return action.metrics;
    default:
      return state;
  }
}
