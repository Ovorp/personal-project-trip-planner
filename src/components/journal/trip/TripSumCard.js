import React from 'react';

export default function TripSumCard(props) {
  return (
    <div>
      <h1>See your trip summary</h1>
      <h2>{props.tripName}</h2>
      <h3>{props.tripId}</h3>
    </div>
  );
}
