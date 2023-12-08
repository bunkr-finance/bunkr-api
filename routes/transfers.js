const express = require("express");

const transfers_r = express.Router();
transfers_r.use(express.json());


module.exports = transfers_r;