const express = require("express");
const router = express.Router();
const { viewSignin, actionSignIn } = require("./controller");

router.get("/", viewSignin);
router.post("/", actionSignIn);

module.exports = router;
