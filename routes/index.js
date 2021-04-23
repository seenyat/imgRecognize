const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const getDataForImage = require("../apiRequest");

// Multer init
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(123);
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});

const upload = multer({ storage: storage });

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.post("/file-upload", upload.single("file"), function (req, res, next) {
  // res.sendStatus(100);
  res.send(req.file.filename);
});

// API

router.get("/getData/:filename", async (req, res) => {
  console.log(req.params.filename);
  let x = await getDataForImage(req.params.filename);
  res.json({ data: x });
});

module.exports = router;
