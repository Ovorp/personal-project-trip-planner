import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import PersonForm from './PersonForm';
import PeopleList from './PeopleList';

function People(props) {
  const [addPerson, setAddPerson] = useState(false);
  const arrOfPeople = props.trip.filter(
    (val) => val.tripId === props.user.currentTripId
  )[0].peopleList;

  return (
    <div>
      <Button onClick={() => setAddPerson(!addPerson)}>
        Add a new person to this trip
      </Button>
      {addPerson ? <PersonForm /> : null}

      <PeopleList arrOfPeople={arrOfPeople} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    trip: state.trip,
  };
};

export default connect(mapStateToProps)(People);
