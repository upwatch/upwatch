import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import listingsReducer from './listings';
import listingReducer from './listing';
import historicalReducer from './historicalData';
import metricsReducer from './metrics';

const reducer = combineReducers({
  listings: listingsReducer,
  listing: listingReducer,
  historicalData: historicalReducer,
  metrics: metricsReducer,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
