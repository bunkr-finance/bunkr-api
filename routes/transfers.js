const express = require("express");
const { validateToken } = require("../config/functions");

const transfers_r = express.Router();
transfers_r.use(express.json());

transfer_r.get("/verifyreciepient", validateToken, async(req, res)=>{
    const user = req.user;
    
})


module.exports = transfers_r;