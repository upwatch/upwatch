import axios from 'axios';

const SET_LISTINGS = 'SET_LISTINGS';

const setListings = (listings) => {
  return {
    type: SET_LISTINGS,
    listings,
  };
};

export const fetchListings = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/listings');
      dispatch(setListings(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export default function listingsReducer(state = [], action) {
  switch (action.type) {
    case SET_LISTINGS:
      return action.listings;
    default:
      return state;
  }
}
