import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { connect } from 'react-redux';
import { loadDataToStore } from './../../../../duck/tripReducer';

function PersonForm(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  async function addPerson(tripId) {
    const peopleAPI = '/api/people';
    const result = await axios
      .post(peopleAPI, {
        firstName,
        lastName,
        email,
        phoneNumber,
      })
      .catch((err) => console.log(err));
    const peopleId = result.data.people_id;
    await axios
      .post(`${peopleAPI}/list`, {
        peopleId,
        tripId,
      })
      .catch((err) => console.log(err));
    const userInfoForStore = await axios
      .get(`/api/all/${props.user.id}`)
      .catch((err) => console.log(err));

    props.loadDataToStore(userInfoForStore.data);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhoneNumber('');
  }

  return (
    <div>
      Person Form
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            placeholder="Phone number"
            onChange={(e) => setPhoneNumber(e.target.value.toString())}
            value={phoneNumber}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          onClick={() => addPerson(props.user.currentTripId)}
        >
          Add Person to the Trip
        </Button>
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
  loadDataToStore,
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonForm);
