import React from 'react';
import { connect } from 'react-redux';
import '../../../css/sum.css';

function Sum(props) {
  const tripSum = props.trip.filter(
    (val) => val.tripId === props.user.currentTripId
  )[0];

  const needToDo = tripSum.toDoList.filter((val) => val.is_done === false);
  return (
    <div className="summary">
      <div className="sum-card sum-card-list">
        <h3>Things that need to be done</h3>
        {needToDo.map((val) => {
          return <li key={val.to_do_list_item_id}>{val.item_name}</li>;
        })}
      </div>
      <div className="sum-card">
        <h3>Who is coming:</h3>
        {tripSum.peopleList.map((val) => {
          return (
            <li key={val.people_id}>
              {val.first_name} {val.last_name}
            </li>
          );
        })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    trip: state.trip,
  };
};

export default connect(mapStateToProps)(Sum);
