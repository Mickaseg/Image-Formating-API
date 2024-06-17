const express = require('express');
const router = express.Router();
const path = require('path')

const multer = require('multer')
const upload = multer({storage: multer.memoryStorage()})

const formatImages = require('../public/javascripts/format-images.js');
const outputDir = path.join(__dirname, '../images/');

router.post('/', upload.array('image'), async (req, res, next) => {
    if (!req.files || req.files.length === 0) {
        res.status(400).send('No images provided');
        return;
    }

    try {
        await formatImages(req.files);
        res.send('Received and formatted images');
    } catch (err) {
        res.status(500).send('Error occurred while formatting images');
    }
});


module.exports = router;