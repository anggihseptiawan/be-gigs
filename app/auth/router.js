const express = require("express");
const router = express.Router();
const { signUp, signIn } = require("./controller");
const multer = require("multer");
const os = require("os");

router.post("/signup", multer({ dest: os.tmpdir() }).single("image"), signUp);
router.post("/signin", signIn);

module.exports = router;
