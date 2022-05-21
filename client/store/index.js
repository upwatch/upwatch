import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import listingsReducer from './listings';
import listingReducer from './listing';
import historicalReducer from './historicalData';

const reducer = combineReducers({
  auth,
  listings: listingsReducer,
  listing: listingReducer,
  historicalData: historicalReducer,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
