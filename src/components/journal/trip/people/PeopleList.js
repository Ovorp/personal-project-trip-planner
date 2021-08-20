import React from 'react';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios';
import '../../../../css/people.css';

function sendTxt(userPhoneNumber) {
  axios
    .post('/api/text', { userPhoneNumber })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

export default function PeopleList(props) {
  return (
    <div className="people">
      <Accordion className="acc-main">
        {props.arrOfPeople.map((val) => {
          return (
            <Accordion.Item eventKey={val.people_id}>
              <Accordion.Header>
                <div className="acc-header">
                  {val.first_name === '' && val.last_name === '' ? (
                    'No Name found'
                  ) : (
                    <>
                      {val.first_name} {val.last_name}
                    </>
                  )}
                  <Button onClick={() => sendTxt(val.phone_number)}>
                    Send reminder Txt
                  </Button>
                </div>
              </Accordion.Header>
              <Accordion.Body className="acc-body">
                <p>
                  <span className="body-bold">Email: </span>
                  {val.email}
                </p>
                <p>
                  <span className="body-bold">Phone number: </span>
                  {[...val.phone_number].map((val, i) => {
                    if (i === 0) {
                      return <>{`(${val}`}</>;
                    }
                    if (i === 2) {
                      return <>{`${val})`}</>;
                    }
                    if (i === 5) {
                      return <>{`${val}-`}</>;
                    }
                    return <>{val}</>;
                  })}
                </p>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </div>
  );
}
