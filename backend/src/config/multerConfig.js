const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = path.join(__dirname, "../../uploads/dogs");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const sanitizedFileName = file.originalname
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9.-]/g, "");
    cb(null, `${Date.now()}-${sanitizedFileName}`);
  },

});


const upload = multer({
  storage, 
  limits: {
    fileSize: 20 * 1024 * 1024, // 5 MB size limit
  },
});

module.exports = upload;
