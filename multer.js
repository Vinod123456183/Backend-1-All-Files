const multer = require("multer");
const storage = multer.memoryStorage();
const path = require("path");

const fileFilter = (req, file, cb) => {
  const allowedTypes = [".jpeg", ".jpg", ".png"];
  let ext = path.extname(file.originalname);
  let includedorNot = allowedTypes.includes(ext);

  if (!includedorNot) {
    return cb(new Error("File type not allowed"), false);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});

module.exports = upload;
