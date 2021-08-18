import React from 'react';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import './../../css/navBar.css';
import { connect } from 'react-redux';
import { loggingOut } from './../../duck/userReducer';
import { loadDataToStore } from './../../duck/tripReducer';
// import routes from './../../routes';
function NavBar(props) {
  function logout() {
    axios
      .post(`/api/users/logout`)
      .then()
      .catch(() => console.log('the log out did not work'));
    props.loggingOut();
    props.loadDataToStore([]);
  }
  return (
    <nav className="mainNav">
      <Nav defaultActiveKey="/" className="flex-column">
        <LinkContainer to="/">
          <Nav.Link>Home</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/journal/sum">
          <Nav.Link>Journal</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/pictures">
          <Nav.Link>Pictures</Nav.Link>
        </LinkContainer>
        {/* <Nav.Link>Trips</Nav.Link> */}
        <Nav.Link>Something Else</Nav.Link>
        <div className="logout">
          <Nav.Link>
            <h4 onClick={logout}>Log out</h4>
          </Nav.Link>
        </div>
      </Nav>
    </nav>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  loggingOut,
  loadDataToStore,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

// <nav>
//   <Link to="/">
//     <h2>Home</h2>
//   </Link>
//   <ol>
//     <Link to="/journal">
//       <h3>Journal</h3>
//     </Link>
//     <li>Trips</li>
//     <li>Pictures</li>
//     <li>Something Else</li>
//   </ol>
//   <h4>Log Out</h4>
// </nav>
