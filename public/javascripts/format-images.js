const sharp = require('sharp')
const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '../images');

const treatImages = (image, name) => {

    return new Promise((resolve, reject) => {
        let width = 0;
        let height = 0;

        sharp(image)
            .metadata()
            .then(function (metadata) {
                if(metadata.width < 600 || metadata.height < 600) {
                    width = metadata.width;
                    height = metadata.height;
                }else{
                    if (metadata.width > metadata.height) {
                        height = 600;
                        width = Math.floor((600 * metadata.width) / metadata.height);
                    } else {
                        width = 600;
                        height = Math.floor((600 * metadata.height) / metadata.width);
                    }
                }

                return sharp(image)
                    .resize(width, height)
                    .jpeg({
                        quality: 80,
                        mozjpeg: false,
                        chromaSubsampling: '4:4:4'
                    })
                    .toBuffer()
            })
            .then(data => {
                console.log(data)
                // return data;
                fs.writeFile(path.join(directoryPath, `${name}.jpg`), data, (err) => {
                    if (err) reject(err);
                    else {
                        console.log('The file has been saved!');
                        resolve();
                    }
                });
            })
            .catch(err => {
                console.error('Error occurred', err);
                reject(err);
            });
    });
}

const formatImages = (images) => {
    console.log(images)
    const imagePromises = images.map((image, index) => {
        return treatImages(image.buffer, image.originalname.split('.')[0]);
    });

    return Promise.all(imagePromises);
}

module.exports = formatImages;

