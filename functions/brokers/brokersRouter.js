const express = require("express");
const router = express.Router();

const brokersController = require("./brokersController");

router.post("/create" , brokersController.create);
// router.post("/login" , leadsController.login )


module.exports = router;