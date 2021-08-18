import React from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { connect } from 'react-redux';
import { registerUserData } from './../../duck/userReducer';
import { Link } from 'react-router-dom';

// need first name, last name, password, phone number and email
function NewUser(props) {
  async function registerUser() {
    const result = await axios.post(`/api/users/register`, {
      firstName,
      lastName,
      password,
      phoneNumber,
      email,
    });
    const userInfo = {
      ...result.data,
      isLoggedIn: true,
    };
    props.registerUserData(userInfo);
    setFirstName('');
    setLastName('');
    setPassword('');
    setPhoneNumber('');
    setEmail('');
  }
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div>
      <h2>Welcome New User. Please fill out the info below</h2>
      <Form>
        <Form.Group
          className="mb-3"
          controlId="formFirstName"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        >
          <Form.Label>First Name</Form.Label>
          <Form.Control type="input" placeholder="First Name" />
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="formLastName"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        >
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="input" placeholder="Last Name" />
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="formPhoneNumber"
          onChange={(e) => setPhoneNumber(e.target.value)}
          value={phoneNumber}
        >
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="input" placeholder="Phone number" />
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="formBasicEmail"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        >
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="formBasicPassword"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        >
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Link to="/">
          <Button variant="primary" type="submit" onClick={registerUser}>
            Submit
          </Button>
        </Link>
      </Form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  registerUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewUser);
