const express = require('express');
const fileUpload = require('express-fileupload');
const uploadRoute = require('./src/routes/upload');
require('dotenv').config();

const app = express();
app.use(fileUpload());
app.use('/upload-product-image', uploadRoute);

app.listen(3000, () => console.log("Server running on port 3000"));
