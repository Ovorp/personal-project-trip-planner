async function addNewTrip(req, res) {
  const { tripName, userId } = req.body;
  //   const { id } = req.session.user.id;
  const db = req.app.get('db');
  const trip = await db.trip
    .add_trip([userId, tripName])
    .catch((err) => console.log(err));

  res.status(200).json(trip[0]);
}

async function changeTripName(req, res) {
  const { tripName, tripId } = req.body;
  const db = req.app.get('db');
  const trip = await db.trip
    .update_trip([tripId, tripName])
    .catch((err) => console.log(err));
  console.log(trip);
  res.status(200).json(trip[0]);
}

function deleteTrip(req, res) {
  const { tripId } = req.body;
  const db = req.app.get('db');

  db.trip
    .delete_trip(tripId)
    .then(() => res.status(200).json('Trip has been deleted'))
    .catch((err) => console.log(err));
}

function resetTripData(req, res) {
  const db = req.app.get('db');
  db.trip
    .reset_trip()
    .then(() => res.status(200).json('trip data has been reset'))
    .catch((err) => console.log(err));
}

module.exports = { addNewTrip, changeTripName, deleteTrip, resetTripData };
