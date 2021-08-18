import React from 'react';
import { Switch, Route } from 'react-router-dom';
import TripSum from './../components/journal/trip/TripSum';
import ToDo from './../components/journal/trip/toDo/ToDo';
import People from './../components/journal/trip/people/People';
import TripPic from './../components/journal/pictures/TripPic';
import Sum from './../components/journal/trip/Sum';

// import Home from './components/Home/Home';

export default (
  <Switch>
    <Route component={TripSum} path="/journal/trip" />
    <Route component={Sum} path="/journal/sum" />
    <Route component={ToDo} path="/journal/todo" />
    <Route component={People} path="/journal/people" />
    <Route component={TripPic} path="/journal/trip-pic" />
  </Switch>
);
