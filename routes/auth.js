const express = require("express");
const {User} = require("../config/models");
const {create_token} = require("../config/functions")
const bcrypt = require("bcrypt");



const auth_r = express.Router();
auth_r.use(express.json());

// create an email verification to send otps
auth_r.post("/createAccount", async(req, res)=>{
    const {email, pwd} = req.body;
    const user_Check = await User.findOne({
        email
    })
    let response;

    switch(user_Check){
        case null:
            break

        default:
            response = {
                message: `${email} already used`,
                data:{},
                success:false,
            }
            res.statusCode = 400
            return res.send(response)

    }
    let hashedPassword;
    hashedPassword = await bcrypt.hash(pwd,8)

    
    const data = {
        email,
        pwd:hashedPassword
    }
    try{
        await User.create(data);
        response = {
            message: "Account created, OTP sent for verification",
            data:{},
            success:true
        }
        res.statusCode = 200
        return res.send(response);
    }catch(error){
        // return error.errors
    }

});

auth_r.post("/signin", async (req, res)=>{
    const {email, pwd} = req.body;
    const u_check = await User.findOne({
        email:email
    })
    let response, token;
    if (u_check===null){
        response = {
            message:`Account with email '${email}' not found`,
            success:false,
            data:{}
        }
        res.statusCode = 404;
        return res.send(response);
    }
    const pwd_check = await bcrypt.compare(pwd, u_check["pwd"]);
    if(pwd_check===false){
        response = {
            message:"Incorrect Password",
            success:false,
            data:{}
        }
        res.statusCode = 401;
        return res.send(response);
    }
    token = create_token(
        {"_id":u_check["_id"].toString }
    )
    response = {
        message:"",
        data:{
            "verified":u_check.verified
        },
        success:true,
        token:token
    }
    res.statusCode = 200
    return  res.send(response)
});

module.exports = auth_r;