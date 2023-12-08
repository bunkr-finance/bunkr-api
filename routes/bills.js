const express = require("express");

const bills_r = express.Router();
bills_r.use(express.json());


module.exports = bills_r;