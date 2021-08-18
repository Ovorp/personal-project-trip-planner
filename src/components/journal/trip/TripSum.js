import React from 'react';
import tripRoutes from './../../../routes/tripRoutes';
import { connect } from 'react-redux';

function TripSum(props) {
  const tripSum = props.trip.filter(
    (val) => val.tripId === props.user.currentTripId
  )[0];

  return (
    <div>
      <h1>{tripSum.tripName}</h1>

      {tripRoutes}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    trip: state.trip,
  };
};

export default connect(mapStateToProps)(TripSum);
