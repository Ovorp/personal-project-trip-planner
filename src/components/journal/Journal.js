import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import JournalNavBar from './../navBar/JournalNavBar';
import TripSum from './trip/TripSum';
import TripForm from './trip/TripForm';
import TripListCard from './trip/TripListCard';

function NoTripSelect(props) {
  const [addTrip, setAddTrip] = useState(false);
  return (
    <>
      <p>This is where you can pick what trip you want to select</p>
      <Button variant="primary" onClick={() => setAddTrip(!addTrip)}>
        + Add new trip
      </Button>
      {addTrip ? <TripForm /> : null}
      {/* This will probably have to be a new component */}
      <TripListCard tripArr={props.tripArr} />
    </>
  );
}

function Journal(props) {
  const tripId = props.user.currentTripId;
  const isLoggedIn = props.user.isLoggedIn;
  //need to fix this to get it from redux
  const tripArr = props.trips;

  //Will need to get a list of trips from the server and store it on redux on mount

  function journalHomePage() {
    return (
      <>
        <JournalNavBar tripId={tripId} />
        {tripId ? <TripSum /> : <NoTripSelect tripArr={tripArr} />}
      </>
    );
  }

  return (
    <div>
      <h1>Journal Component</h1>{' '}
      {!isLoggedIn ? (
        <h2>Please go to the home page and log in</h2>
      ) : (
        journalHomePage()
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    trips: state.trip,
  };
};

export default connect(mapStateToProps)(Journal);
