import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';

export default function Weather() {
  const [zipCode, setZipCode] = useState('');
  const [currentWeather, setCurrentWeather] = useState();

  async function getWeather(zip) {
    const result = await axios
      .get(`/api/weather/${zip}`)
      .catch((err) => console.log(err));
    setCurrentWeather(result.data);
  }

  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="zipCode">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control
            placeholder="Zip Code"
            onChange={(e) => setZipCode(e.target.value)}
            value={zipCode}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={() => getWeather(zipCode)}
        >
          Submit
        </Button>
      </Form>
      {currentWeather ? (
        <Carousel className="carousel1" fade variant="dark">
          <Carousel.Item>
            <Card>
              <Card.Body>
                <Card.Title>Location</Card.Title>
                <Card.Text>{currentWeather.name}</Card.Text>
              </Card.Body>
            </Card>
          </Carousel.Item>
          <Carousel.Item>
            <Card>
              <Card.Body>
                <Card.Title>Temperature</Card.Title>
                <Card.Text>
                  <ul>
                    <li>Feels Like : {currentWeather.main.feels_like}</li>
                    <li>Humidity : {currentWeather.main.humidity}</li>
                    <li>Current Temperature : {currentWeather.main.temp}</li>
                    <li>High Today : {currentWeather.main.temp_max}</li>
                    <li>Low Today : {currentWeather.main.temp_min}</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Carousel.Item>
          <Carousel.Item>
            <Card>
              <Card.Body>
                <Card.Title>Weather</Card.Title>
                <Card.Text>
                  There are {currentWeather.weather[0].description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Carousel.Item>
          <Carousel.Item>
            <Card>
              <Card.Body>
                <Card.Title>Wind</Card.Title>
                <Card.Text>
                  The wind speed is {currentWeather.wind.speed} mph
                </Card.Text>
              </Card.Body>
            </Card>
          </Carousel.Item>
        </Carousel>
      ) : null}
    </div>
  );
}
