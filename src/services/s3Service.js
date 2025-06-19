const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { v4: uuid } = require('uuid');
require('dotenv').config();

const s3 = new S3Client({
  region: process.env.AWS_REGION || 'eu-north-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY || 'AKIA56H7BDGNI673FFG4',
    secretAccessKey: process.env.AWS_SECRET_KEY || 'bl04ABEsjIiYNo8rS3KeygOK',
    signatureVersion: 'v4',
  }
});
console.log("Connecting to:", process.env.S3_BUCKET, process.env.AWS_REGION);

exports.uploadToS3 = async (file) => {
  try {
    const key = `${uuid()}_${file.name}`;
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET || 'mediversal-bucket',
      Key: key,
      Body: file.data,
      ContentType: file.mimetype,
    });
    const result = await s3.send(command);
    // Add the S3 URL to the result for downstream use
    result.Location = `https://${process.env.S3_BUCKET || 'mediversal-bucket'}.s3.${process.env.AWS_REGION || 'eu-north-1'}.amazonaws.com/${key}`;
    return result;
  } catch (err) {
    console.error("S3 upload error:", err);
    return null;
  }
};

