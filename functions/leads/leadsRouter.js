const express = require("express");
const router = express.Router();

const leadsController = require("./leadsController");

router.post("/create" , leadsController.create);
// router.post("/login" , leadsController.login )


module.exports = router;