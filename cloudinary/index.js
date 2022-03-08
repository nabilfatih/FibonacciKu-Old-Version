const crypto = require('crypto');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const cloudinaryConfig = (req, res, next) => {
	cloudinary.config({
		cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET
	});
	next();
}	

const storage = new CloudinaryStorage({
  cloudinary,
  folder: 'fibonacciku-profile',
  allowedFormats: ['jpeg', 'jpg', 'png'],
  transformation: [{ width: 128, height: 128, crop: "scale" }],
  filename: function (req, file, cb) {
  	let buf = crypto.randomBytes(16);
  	buf = buf.toString('hex');
  	let uniqFileName = file.originalname.replace(/\.jpeg|\.jpg|\.png/ig, '');
  	uniqFileName += buf;
    cb(undefined, uniqFileName);
  }
});

module.exports = {
	cloudinaryConfig,
	storage
}