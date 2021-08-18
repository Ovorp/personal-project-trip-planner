import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { setCurrentTripId } from './../../../duck/userReducer';

//turn these into accordian items would be cool
function TripListCard(props) {
  return (
    <div>
      {props.tripArr.map((val, i) => {
        return (
          <div className="trip-card" key={val.tripId}>
            <p key={i}>{val.tripName}</p>
            <Button
              variant="info"
              key={val.tripId}
              onClick={() => props.setCurrentTripId(val.tripId)}
            >
              Select this trip
            </Button>
          </div>
        );
      })}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  setCurrentTripId,
};

export default connect(mapStateToProps, mapDispatchToProps)(TripListCard);
