const express = require('express');
const router = express.Router();
const s3Service = require('../services/s3Service');
const db = require('../db');

router.post('/', async (req, res) => {
  try {
    if (!req.files?.image) return res.status(400).send("No file uploaded");

    const file = req.files.image;
    const result = await s3Service.uploadToS3(file);
    if (!result || !result.Location) return res.status(500).send("S3 upload failed");

    const originalName = file.name !== undefined ? file.name : null;
    const s3Url = result.Location !== undefined ? result.Location : null;

    const [rows] = await db.execute(
      'INSERT INTO product_images (original_name, s3_url) VALUES (?, ?)',
      [originalName, s3Url]
    );
    res.json({ id: rows.insertId, url: s3Url });
  } catch (err) {
    res.status(500).send("Server error");
  }
});


module.exports = router;
