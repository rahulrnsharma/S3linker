const AWS = require('aws-sdk');
require('dotenv').config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

s3.listObjectsV2({ Bucket: process.env.S3_BUCKET }, (err, data) => {
  if (err) {
    console.error("S3 Connection Failed:", err.message);
  } else {
    console.log("S3 Bucket Accessible, objects:", data.Contents.length);
  }
});
