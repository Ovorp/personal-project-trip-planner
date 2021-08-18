import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function sendTxt(userPhoneNumber) {
  axios
    .post('/api/text', { userPhoneNumber })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

export default function PeopleList(props) {
  return (
    <div>
      People List
      {props.arrOfPeople.map((val) => {
        return (
          <div key={val.people_id}>
            {val.first_name} {val.last_name} {val.email} {val.phone_number}
            <Button onClick={() => sendTxt(val.phone_number)}>
              Send reminder Txt
            </Button>
          </div>
        );
      })}
    </div>
  );
}
