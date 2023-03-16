const multer = require("multer");
const path = require("path");
/*
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};
*/

var storage = multer.diskStorage({
  destination: './uploads/images',
  filename: (req, file, cb) => {
      return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
});


var uploadFile = multer({
  storage: storage,
  // fileFilter: imageFilter
 });
module.exports = uploadFile;