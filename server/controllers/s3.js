require('dotenv').config();
const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');
const { AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_ACCESS_KEY, AWS_SECRET_KEY } =
  process.env;

const bucketName = AWS_BUCKET_NAME;
const region = AWS_BUCKET_REGION;
const accessKeyId = AWS_ACCESS_KEY;
const secretAccessKey = AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

function uploadToS3(imageFile) {
  const imageFileStream = fs.createReadStream(imageFile.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: imageFileStream,
    Key: imageFile.filename,
  };

  return s3.upload(uploadParams).promise();
}

function getFromS3(imageFileKey) {
  const downloadParams = {
    Key: imageFileKey,
    Bucket: bucketName,
  };

  return s3.getObject(downloadParams).createReadStream();
}

function deleteFromS3(imageFileKey) {
  var params = {
    Bucket: bucketName,
    Key: imageFileKey,
  };

  s3.deleteObject(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else console.log(data); // successful response
  });
}

module.exports = { uploadToS3, getFromS3, deleteFromS3 };
