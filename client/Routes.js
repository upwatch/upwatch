import React, { Component, Fragment, useEffect } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import AllListings from './components/AllListings';
import Listing from './components/Listing';

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path='/listings' component={AllListings} />
        <Route path='/listings/:cmc_id' component={Listing} />
      </Switch>
    </div>
  );
};

export default Routes;
