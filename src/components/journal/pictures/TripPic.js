import React from 'react';
import ImageForm from '../../images/ImageForm';

import { connect } from 'react-redux';

function TripPic(props) {
  return (
    <>
      <ImageForm tripId={props.user.currentTripId} userId={props.user.id} />
    </>
  );
}

const mapDispatchToProps = {};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    picture: state.picture,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TripPic);
