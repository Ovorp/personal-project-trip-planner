import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUserData } from './../../duck/userReducer';
import { loadDataToStore } from './../../duck/tripReducer';

function Login(props) {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  async function logInUser(email, password) {
    const result = await axios
      .post('/api/users/login', { email, password })
      .catch((err) => console.log(err));

    if (!result) {
      return console.log('wrong creds');
    } else {
      const userInfo = {
        ...result.data,
        isLoggedIn: true,
      };

      props.registerUserData(userInfo);

      async function getInfo(userId) {
        const userInfoForStore = await axios
          .get(`/api/all/${userId}`)
          .catch((err) => console.log(err));

        console.log(userInfoForStore);
        props.loadDataToStore(userInfoForStore.data);
      }
      console.log(userInfo);
      getInfo(userInfo.id);
    }
  }

  // Need to create a error if login fails

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="formBasicPassword"
          onChange={(e) => setUserPassword(e.target.value)}
        >
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          onClick={() => logInUser(userEmail, userPassword)}
        >
          Submit
        </Button>
      </Form>
      <br />
      <br />
      <br />
      {/* need to change this  */}
      <div>
        <h2>Are you new?</h2>
        <Link to="/newuser">
          <Button variant="primary">Register</Button>
        </Link>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  registerUserData,
  loadDataToStore,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
