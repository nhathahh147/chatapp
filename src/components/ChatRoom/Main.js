import React from 'react';

import { Route, Switch } from 'react-router-dom';

import ChatWindow from './ChatWindow'
import Information from '../User/Information'

const Routes = () => {
  return (
    <Switch>
      <Route path='/' exact component={ChatWindow}/>
      <Route path='/information' component={Information}/>
    </Switch>
  );
};

export default Routes;
