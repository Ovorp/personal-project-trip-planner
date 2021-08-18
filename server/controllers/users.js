const bcryptjs = require('bcryptjs');

async function getTestData(req, res) {
  const db = req.app.get('db');
  const testData = await db.test();
  res.status(200).json(testData);
}

function getUserInfoIfHasSession(req, res) {
  const db = req.app.get('db');
  if (req.session.user.id) {
    db.user.find_user_by_id(req.session.user.id).then((response) => {
      res.status(200).json(response);
    });
  } else {
    res.status(200).json('Please log in');
  }
}

async function register(req, res) {
  const { firstName, lastName, password, phoneNumber, email } = req.body;
  const db = req.app.get('db');
  const result = await db.user
    .find_user_by_email(email)
    .catch((err) => console.log(err));
  if (result[0]) {
    res.status(406).json('This email is already taken');
    return;
  }
  const salt = await bcryptjs.genSalt(10);
  const hash = await bcryptjs.hash(password, salt);

  const newUser = await db.user
    .register([firstName, lastName, hash, phoneNumber, email])
    .catch((err) => console.log(err));

  const user = newUser[0];
  req.session.user = {
    firstName: user.users_first_name,
    lastName: user.users_last_name,
    id: user.users_id,
    email: user.users_email,
    phoneNumber: user.phone_number,
  };
  res.status(200).json(req.session.user);
}

async function login(req, res) {
  const { email, password } = req.body;
  const db = req.app.get('db');
  const result = await db.user.login(email).catch((err) => console.log('test'));
  const user = result[0];
  if (!user) {
    res.status(404).json('User is not found');
    return;
  }
  const isAuth = await bcryptjs.compare(password, user.users_password);
  if (!isAuth) {
    res.status(403).json('Please try loggin on again');
    return;
  }

  req.session.user = {
    firstName: user.users_first_name,
    lastName: user.users_last_name,
    id: user.users_id,
    email: user.users_email,
    phoneNumber: user.phone_number,
  };
  res.status(200).json(req.session.user);
}

async function updateUserInformation(req, res) {
  const { firstName, lastName, phoneNumber, email } = req.body;

  const db = req.app.get('db');
  const findUser = await db.user.find_user_by_email(email);
  const alreadyUsedEmail = findUser[0].users_email;
  if (alreadyUsedEmail === email) {
    res.status(406).json('Please choose another email');
    return;
  }

  // Need to handle case where there is already that email in the system
  const updatedUser = {
    firstName: firstName || req.session.user.firstName,
    lastName: lastName || req.session.user.lastName,
    phoneNumber: phoneNumber || req.session.user.phoneNumber,
    email: email || req.sesssion.user.email,
    id: req.session.user.id,
  };

  const userInfo = [
    updatedUser.id,
    updatedUser.firstName,
    updatedUser.lastName,
    updatedUser.phoneNumber,
    updatedUser.email,
  ];

  db.user
    .update_user_info(userInfo)
    .then((req.session.user = updatedUser))
    .catch((err) => console.log(err));
  res.status(200).json('User information has been updated');
}

async function updatePassword(req, res) {
  const userId = req.session.user.id;
  const password = req.body.password;
  const db = req.app.get('db');
  const salt = await bcryptjs.genSalt(10);
  const hash = await bcryptjs.hash(password, salt);

  db.user
    .update_password([userId, hash])
    .then(res.status(200).json('Updated password'))
    .catch((err) => console.log(err));
}

async function logout(req, res) {
  req.session.destroy();
  res.status(200).json('logged out');
}

function userDatabaseReset(req, res) {
  const db = req.app.get('db');
  db.user
    .reset_users()
    .then(() => console.log('Database for users has been reset'))
    .catch((err) => console.log(err));

  res.status(200).json('Database for users has been reset');
}

module.exports = {
  getTestData,
  register,
  logout,
  updateUserInformation,
  updatePassword,
  login,
  userDatabaseReset,
  getUserInfoIfHasSession,
};
