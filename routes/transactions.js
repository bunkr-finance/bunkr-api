const express = require("express");

const trxs_r = express.Router();
trxs_r.use(express.json());


module.exports = trxs_r;