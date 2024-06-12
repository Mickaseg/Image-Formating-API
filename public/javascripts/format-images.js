const sharp = require('sharp')
const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '../images/vanilla');


// // Lister tous les fichiers en utilisant forEach
// files.forEach(function (file) {
//     console.log(file);
// });

const formatImage = (image,width,height,format) => {
sharp(image) // specify the path to the image
    .resize(width, height) // resize the image to 200x200 pixels
    .toFormat(format)
    .toBuffer('output.jpg', (err,data, info) => { // save the output to 'output.jpg'
        if (err) {
            console.error('Error occurred', err);
        } else {
fs.writeFile(`output.${format}`, data, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
});
            console.log(data)
            console.log('Image resized successfully', info);
        }
    });
}

formatImage('../images/vanilla/Moody1.jpg',200,200,'avif')

