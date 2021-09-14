const express = require("express");
const router = express.Router();
const { viewSignin, actionSignIn, actionSignOut } = require("./controller");

router.get("/", viewSignin);
router.post("/", actionSignIn);
router.get("/signout", actionSignOut);

module.exports = router;
