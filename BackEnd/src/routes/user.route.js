const express = require("express");
const { CreateUser } = require("../controllers/user.controller");
const upload = require("../middlwares/multer")

const router = express.Router();

router.get("create-user", upload.single("file"), CreateUser)

module.exports = router;