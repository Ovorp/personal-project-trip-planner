import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

function Images(props) {
  const [imageFiles, setImageFiles] = useState([]);

  useEffect(() => {
    async function getPics(userId) {
      const result = await axios
        .get(`/api/image?userId=${userId}`)
        .catch((err) => console.log(err));
      setImageFiles(result.data);
    }
    getPics(props.user.id);
  }, []);

  return (
    <div className="pic-grid">
      {imageFiles.map((image) => (
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
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Images);
