async function addPeople(req, res) {
  const { firstName, lastName, email, phoneNumber } = req.body;
  const db = req.app.get('db');

  const person = await db.people.add_people([
    firstName,
    lastName,
    email,
    phoneNumber,
  ]);

  console.log(person);

  res.status(200).json(person[0]);
}

async function updatesPeople(req, res) {
  const { firstName, lastName, email, phoneNumber, peopleId } = req.body;
  const db = req.app.get('db');

  const oldPerson = await db.people
    .get_people_by_id(peopleId)
    .catch((err) => console.log(err));
  console.log(oldPerson);
  const { first_name, last_name, phone_number } = oldPerson[0];

  const newPerson = {
    firstName: firstName || first_name,
    lastName: lastName || last_name,
    email: email || oldPerson[0].email,
    phoneNumber: phoneNumber || phone_number,
  };

  const newPeople = await db.people.update_people([
    peopleId,
    newPerson.firstName,
    newPerson.lastName,
    newPerson.email,
    newPerson.phoneNumber,
  ]);

  res.status(200).json(newPeople[0]);
}

function deletePersonList(req, res) {}

function deletePeople(req, res) {
  const { peopleId } = req.body;
  const db = req.app.get('db');

  db.people
    .delete_people(peopleId)
    .then(() => res.status(200).json('Person was deleted'))
    .catch((err) => console.log(err));
}

function createsPeopleList(req, res) {
  const { peopleId, tripId } = req.body;
  const db = req.app.get('db');
  db.people
    .create_people_list([tripId, peopleId])
    .then(() =>
      res.status(200).json('A new row was added to the People List table.')
    )
    .catch((err) => console.log(err));
}

async function updatePeopleList(req, res) {
  const { peopleId, tripId, newTripId } = req.body;
  const db = req.app.get('db');

  const newList = await db.people
    .update_people_list([tripId, peopleId, newTripId])
    .catch((err) => console.log(err));

  console.log(newList);
  res.status(200).json(newList);
}

function resetPeople(req, res) {
  const db = req.app.get('db');
  db.people
    .reset_people()
    .then(() => res.status(200).json('people has been reset'))
    .catch((err) => console.log(err));
}

module.exports = {
  addPeople,
  updatesPeople,
  deletePeople,
  createsPeopleList,
  updatePeopleList,
  resetPeople,
};
