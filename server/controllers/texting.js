require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = process.env.TWILIO_NUMBER;
const client = require('twilio')(accountSid, authToken);

function sendText(req, res) {
  const { userPhoneNumber } = req.body;

  client.messages
    .create({
      body: 'You have a fishing trip coming up!!!',
      from: `+${phoneNumber}`,
      to: `+1${userPhoneNumber}`,
    })
    .then((message) => res.status(200).json(message))
    .catch((err) => res.status(500).json(err));
}

module.exports = { sendText };
