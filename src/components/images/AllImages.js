import React from 'react';
import Images from './Images';

import { connect } from 'react-redux';

function AllImages(props) {
  const isLoggedIn = props.user.isLoggedIn;

  return (
    <>
      {!isLoggedIn ? (
        <h2>Please go to the home page and log in</h2>
      ) : (
        <Images />
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(AllImages);
