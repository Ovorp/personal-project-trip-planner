require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const multer = require('multer');
const axios = require('axios');
const upload = multer({ dest: 'uploads/' });

const {
  getTestData,
  register,
  login,
  logout,
  updateUserInformation,
  updatePassword,
  userDatabaseReset,
  getUserInfoIfHasSession,
} = require('./controllers/users.js');
const {
  addNewTrip,
  changeTripName,
  deleteTrip,
  resetTripData,
} = require('./controllers/trip.js');
const {
  addToDoListItem,
  updateToDoListItem,
  deleteToDoListItem,
  getToDoListItem,
  resetToDo,
} = require('./controllers/toDoList.js');
const {
  addPeople,
  updatesPeople,
  deletePeople,
  createsPeopleList,
  updatePeopleList,
  resetPeople,
} = require('./controllers/people.js');
const {
  uploadImage,
  getImage,
  deleteImage,
  getAllImages,
} = require('./controllers/images.js');

const { sendText } = require('./controllers/texting.js');

// const { IAM } = require('aws-sdk');  Dont think i need this
const { SERVER_PORT, CONNECTION_STRING, SECRET, WEATHER_KEY } = process.env;

const app = express();

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
}).then((dbInstance) => {
  app.set('db', dbInstance);
  console.log('The database is running');
});

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

app.use(express.json());

app.use(express.static(`${__dirname}/../build`));

// Weather endpoint open to everyone

// app.get('/', (req, res) => {
//   res.send('Hello, World');
// });

app.get(`/api/weather/:zipCode`, (req, res) => {
  const { zipCode } = req.params;
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&units=imperial&appid=${WEATHER_KEY}`
    )
    .then((response) => {
      const { name, weather, main, wind } = response.data;

      const weatherResult = { name, weather, main, wind };
      res.status(200).json(weatherResult);
    })
    .catch((err) => console.log(err));
});

app.get(`/api/weather`, (req, res) => {
  const { latitude, longitude, unitsSystem } = req.query;
  const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?';
  const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_KEY}`;

  axios
    .get(weatherUrl)
    .then((response) => {
      console.log(response.data);
      res.status(200).json(response.data);
    })
    .catch((err) => console.log(err));
});

//  Middleware to check if the user has a session.

function isLoggedIn(req, res, next) {
  if (!req.session.user) {
    res.status(401).json('Please log in');
  }
  next();
}

const IMAGE_API = '/api/image';

const USER_API = '/api/users';
const TRIP_API = `/api/trip`;
const TO_DO_LIST_API = `/api/todolist`;
const PEOPLE_API = `/api/people`;

//reset endpoint only for testing do not normally use
app.delete(`${USER_API}/reset`, userDatabaseReset);
app.delete(`${TRIP_API}/reset`, resetTripData);
app.delete(`${TO_DO_LIST_API}/reset`, resetToDo);
app.delete(`${PEOPLE_API}/reset`, resetPeople);
app.get('/api/test', getTestData);
//See above

// Create new users
app.post(`${USER_API}/register`, register);
// Logging in users
app.post(`${USER_API}/login`, login);
// Update user information
app.put(`${USER_API}`, isLoggedIn, updateUserInformation);
app.put(`${USER_API}/password`, isLoggedIn, updatePassword);
//  Log out
app.post(`${USER_API}/logout`, logout);
// Check to see if someone is logged in
app.get(`${USER_API}`, getUserInfoIfHasSession);

// Trip endpoints
app.use(isLoggedIn);

app.get(`/api/all/:userId`, async (req, res) => {
  const { userId } = req.params;
  const db = req.app.get('db');

  const resultTrip = await db.get_all
    .get_all_trips(userId)
    .catch((err) => console.log(err));

  const arrOfTripId = resultTrip.map((val) => val.trip_id);

  const arrOfToDo = await Promise.all(
    arrOfTripId.map(async (val) => {
      return await db.get_all.get_all_todo(val);
    })
  );

  const arrOfPeople = await Promise.all(
    arrOfTripId.map(async (val) => {
      return await db.get_all.get_all_people(val);
    })
  );

  let flatArrOfToDo = arrOfToDo.flat();
  let flatArrOfPeople = arrOfPeople.flat();
  let result = [];

  for (let i = 0; i < arrOfTripId.length; i++) {
    let toDoListItems = flatArrOfToDo.filter(
      (val) => val.trip_id === resultTrip[i].trip_id
    );
    let people = flatArrOfPeople.filter(
      (val) => val.trip_id === resultTrip[i].trip_id
    );

    let objForTripStore = {
      tripId: resultTrip[i].trip_id,
      tripName: resultTrip[i].trip_name,
      toDoList: toDoListItems,
      peopleList: people,
    };

    result.push(objForTripStore);
  }

  res.status(200).json(result);
});

app.post(`${TRIP_API}`, addNewTrip);
app.put(`${TRIP_API}`, changeTripName);
app.delete(`${TRIP_API}`, deleteTrip);

// To do list endpoints
// app.post(`${TO_DO_LIST_API}`, createToDoList);
app.post(`${TO_DO_LIST_API}`, addToDoListItem);
app.put(`${TO_DO_LIST_API}`, updateToDoListItem);
app.get(`${TO_DO_LIST_API}/:tripId`, getToDoListItem);
app.delete(`${TO_DO_LIST_API}`, deleteToDoListItem);

// People endpoints
app.post(`${PEOPLE_API}`, addPeople);
app.post(`${PEOPLE_API}/list`, createsPeopleList);
app.put(`${PEOPLE_API}`, updatesPeople);
app.put(`${PEOPLE_API}/list`, updatePeopleList);
app.delete(`${PEOPLE_API}`, deletePeople);

// Image endpoints
app.post(`${IMAGE_API}`, upload.single('image'), uploadImage);
app.get(`${IMAGE_API}/:key`, getImage);
app.get(`${IMAGE_API}`, getAllImages);
app.delete(`${IMAGE_API}/:key`, deleteImage);

// Texting endpoints
app.post('/api/text', sendText);

let port = process.env.PORT || SERVER_PORT || 5050;

app.listen(port, () => console.log('port', port));
