import React from 'react';
import { connect } from 'react-redux';
import fishLogo from './../../logos/fishLogo.png';
import './../../css/Header.css';

function Header(props) {
  const { firstName, lastName } = props.user;

  return (
    <header>
      <h1>
        {firstName} {lastName}
      </h1>

      <img src={fishLogo} alt="fish logo" className="fishLogo" />
    </header>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(Header);

//need to write the function to load profile pictures.
