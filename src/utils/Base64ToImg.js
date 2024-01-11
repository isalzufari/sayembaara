const isBase64 = require('is-base64');
const base64Img = require('base64-img');
const InvariantError = require('../exceptions/InvariantError');

const Base64ToImg = async (imageBase64) => {
  return new Promise((resolve, reject) => {
    if (!isBase64(imageBase64, { mimeRequired: true })) {
      throw new InvariantError('Invalid base64: Review gagal ditambahkan')
    }

    base64Img.img(imageBase64, './public/images', Date.now(), async (err, filepath) => {
      if (err) {
        reject(err);
        throw new InvariantError('base64Img: Job gagal ditambahkan')
      }

      const filename = filepath.split("\\").pop().split("/").pop();
      resolve(filename);
    });
  })
}

module.exports = Base64ToImg;
