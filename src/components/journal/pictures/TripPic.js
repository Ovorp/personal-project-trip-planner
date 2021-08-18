import React, { useState, useEffect } from 'react';
import ImageForm from '../../images/ImageForm';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import axios from 'axios';

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
