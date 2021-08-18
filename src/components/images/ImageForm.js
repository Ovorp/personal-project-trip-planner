import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { connect } from 'react-redux';

async function postImage({ image, description, tripId, userId }) {
  const formData = new FormData();
  formData.append('image', image);
  formData.append('description', description);
  formData.append('tripId', tripId);
  formData.append('userId', userId);
  //need to figure out a way to add trip id and user id

  const result = await axios.post('/api/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return result.data;
}

//write a on mount function that gets all picture information and sets it to set images

function ImageForm(props) {
  const [file, setFile] = useState({});
  const [description, setDescription] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [imageDescription, setImageDescription] = useState([]);

  useEffect(() => {
    async function getPics(tripId) {
      const result = await axios
        .get(`/api/image?tripId=${tripId}`)
        .catch((err) => console.log(err));
      setImageFiles(result.data);
    }
    getPics(props.user.currentTripId);
  }, [images, props.user.currentTripId]);

  // the above line might cause problems

  console.log(imageFiles);

  const submit = async (e) => {
    e.preventDefault();
    const result = await postImage({
      image: file,
      description,
      tripId: props.tripId,
      userId: props.userId,
    });
    setImages([result.imageKey, ...images]);
    setImageDescription([result.imageDescription, ...imageDescription]);
    setDescription('');
  };

  const fileSelected = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  return (
    <div>
      <Form className="pic-form">
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control type="file" onChange={fileSelected} accept="image/*" />
          <Form.Control
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="Picture description"
          />
        </Form.Group>
        <Button type="submit" onClick={submit}>
          Submit
        </Button>
      </Form>
      <div className="pic-grid">
        {imageFiles.map((image, i) => (
          <div key={image.picture_id}>
            <img
              className="pictures"
              src={`/api/image/${image.picture_key}`}
              alt={image.picture_description}
            />
            <p>{image.picture_description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const mapDispatchToProps = {};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    picture: state.picture,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageForm);
