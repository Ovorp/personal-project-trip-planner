const { uploadToS3, getFromS3, deleteFromS3 } = require('./s3');
const fs = require('fs');
const util = require('util');

const unlinkImageFile = util.promisify(fs.unlink);

async function uploadImage(req, res) {
  const imageFile = req.file;
  const { description, tripId, userId } = req.body;
  const db = req.app.get('db');
  const result = await uploadToS3(imageFile).catch((err) =>
    console.log(err, '!!!UploadImage!!!')
  );
  console.log(result);
  await unlinkImageFile(imageFile.path);
  await db.picture.add_picture([tripId, userId, result.key, description]);
  const imageInfo = {
    imageKey: result.key,
    imageLocation: result.Location,
    imageDescription: description,
  };
  res.status(200).json(imageInfo);
}

function getImage(req, res) {
  const key = req.params.key;
  const readStream = getFromS3(key);

  readStream.pipe(res.status(200));
}

function deleteImage(req, res) {
  const key = req.params.key;
  deleteFromS3(key);
  res.send('the image should have been deleted');
}

async function getAllImages(req, res) {
  const { userId, tripId } = req.query;
  const db = req.app.get('db');

  if (userId && tripId) {
    return res
      .status(417)
      .json('Please only send a user Id or trip Id not both');
  }
  if (userId) {
    const result = await db.picture.get_picture_by_user(userId);
    return res.status(200).json(result);
  }
  if (tripId) {
    const result = await db.picture.get_picture_by_trip(tripId);
    return res.status(200).json(result);
  }
}

module.exports = { uploadImage, getImage, deleteImage, getAllImages };
