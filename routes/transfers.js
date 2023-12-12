const express = require("express");
const { validateToken } = require("../config/functions");

const transfers_r = express.Router();
transfers_r.use(express.json());

transfers_r.get("/verifyreciepient", validateToken, async(req, res)=>{
    const user = req.user;
    try{

        const {_id} = user;

    }catch(error){

    }
})

transfers_r.post("/makeTransfer", validateToken, async(req, res)=>{
    
})


module.exports = transfers_r;