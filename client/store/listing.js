import axios from 'axios';

const SET_LISTING = 'SET_LISTING';

const setListing = (listing) => {
  return {
    type: SET_LISTING,
    listing,
  };
};

export const fetchListing = (cmc_id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/listings/${cmc_id}`);
      dispatch(setListing(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export default function listingReducer(state = {}, action) {
  switch (action.type) {
    case SET_LISTING:
      return action.listing;
    default:
      return state;
  }
}
