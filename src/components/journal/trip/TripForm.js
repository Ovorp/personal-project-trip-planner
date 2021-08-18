import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { addNewTripToStore } from './../../../duck/tripReducer';

function TripForm(props) {
  const [tripName, setTripName] = useState('');

  async function addNewTrip(tripName, userId) {
    const result = await axios.post(`/api/trip`, { tripName, userId });
    props.addNewTripToStore(result.data);
    setTripName('');
  }

  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Trip Name</Form.Label>
          <Form.Control
            placeholder="Enter the Name of your trip"
            onChange={(e) => setTripName(e.target.value)}
            value={tripName}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={() => addNewTrip(tripName, props.user.id)}
        >
          Add Trip to your list
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
  addNewTripToStore,
};

export default connect(mapStateToProps, mapDispatchToProps)(TripForm);
// Trip name
