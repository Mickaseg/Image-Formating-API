const express = require('express');
const router = express.Router();
const path = require('path')

const multer = require('multer')
const upload = multer({storage: multer.memoryStorage()})


router.post('/', upload.single('image'), function(req, res, next) {
    // Assume that req.body.image is a base64-encoded image
    if (!req.file) {
        res.status(400).send('No image provided');
        return;
    }

    console.log(req.file.buffer)

    res.send('Received image');

});


module.exports = router;