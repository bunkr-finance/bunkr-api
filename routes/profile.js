const express = require("express");

const profile_r = express.Router();
profile_r.use(express.json());


module.exports = profile_r;