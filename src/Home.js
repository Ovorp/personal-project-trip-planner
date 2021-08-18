import React from 'react';
import Weather from './components/Weather';
import Login from './components/login/Login';
import { connect } from 'react-redux';

function Home(props) {
  const isLoggedIn = props.user.isLoggedIn;

  return (
    <div>
      <h1>{!isLoggedIn ? 'Welcome App Please log in' : null}</h1>
      {!isLoggedIn ? <Login /> : <Weather />}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Home);
