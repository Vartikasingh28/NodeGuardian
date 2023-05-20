const createCode = require("../codeCreator");
const codeModel = require("../models/codeModel");

const router = require("express").Router();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./static/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const myStorage = multer({ storage: storage });

router.post("/uploadfile", myStorage.single("myfile"), (req, res) => {
  res.status(200).json({ status: "success" });
});

router.get("/generateCode", (req, res) => {
  createCode((filename) => {
    res.json({ filename });
  });
});

router.post("/generateCodeFromData", (req, res) => {
  const { dependencies, files, name, createdBy } = req.body;
  // console.log(dependencies);
  createCode(dependencies, files, name, (filename) => {
    new codeModel({
      title: name,
      dependencies,
      createdBy,
      created_at: new Date(),
      updated_at: new Date(),
    }).save()
      .then((result) => {
        res.json({ filename });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ status: "failed" });
      });
  });
});

module.exports = router;
