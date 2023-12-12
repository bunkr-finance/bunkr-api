const express = require("express");
const {validateToken} = require("../config/functions")
const {Bvns, User, usersAccounts, Banks} = require("../config/models")
const {Types} = require("mongoose")

const profile_r = express.Router();
profile_r.use(express.json());

let ObjectId = Types.ObjectId;


profile_r.post("/uploadBVN",validateToken,async (req, res)=>{
    const {_id} = req.user;
    const {bvn} = req.body;

    const user = await User.findById(_id).exec()
    let response

    if (user!== null){    
        const bvn_check =  await Bvns.findOne({
            "bvn": bvn
        })
        
        switch(bvn_check){
            case null:
                response = {
                    message:"unable to verify BVN",
                    data:{},
                    success:false,
                    token:""
                }
                res.statusCode = 404;
                return res.send(response);

            default:
                await User.findByIdAndUpdate(_id,{"bvn_verified":true, "bvn":bvn});

                const {user_name, phoneNo} = bvn_check;
                response = {
                    message:"",
                    data:{bvn, user_name, phoneNo},
                    success:true,
                    token:""
                }
                res.statusCode = 200
                return res.send(response)
                

        }
    }else{
        response = {
            message:"user not found",
            data:{},
            success:false,
            token:""
        }
        res.statusCode = 404
        return res.send(response)
    }

})

profile_r.get("/fetchConnectedBanks", validateToken, async(req, res)=>{
        try{
            const {_id} = req.user;
            const user = await User.findById(_id).exec()
            if (user === null){
                res.statusCode = 404
                response = {
                    message:"User not found",
                    data:{},
                    success:false,
                    token:""
                }
            }else{
                const {bvn} = user;
                const banks = await Banks.find({
                    "bvn":bvn
                })

                res.statusCode = 200
                response = {
                    message:"",
                    data:{
                        bank_accounts:banks
                    },
                    success:true,
                    token:""
                }
                return res.send(response)
            }
        }catch{

        }
    
})

profile_r.post("/connectAccount", validateToken, async(req, res)=>{
    const user = req.user
    try
        {
        const {_id} = user;
        const {bankCode, accNo, bankName} = req.body;
        let response;
        const u_check = await User.findById(_id).exec()
        

        if (u_check===null){
            res.statusCode = 404;
            response = {
                message:"User not found",
                data:{},
                token:"",
                success:false
            }
            return res.send(response)
        }else{
            acc_check = await usersAccounts.findOne({
                "_id": new ObjectId(_id),
                "accounts":{
                    bankCode:bankCode,
                    accountNumber:accNo,
                    bankName:bankName
                }
            })
            if (acc_check === null){
                try{
                    await usersAccounts.create({
                        "_id": new ObjectId(_id),
                        "accounts":[
                            {
                                bankCode:bankCode,
                                accountNumber:accNo,
                                bankName:bankName
                            }
                        ]
                    })
                }catch(error){
                    await usersAccounts.findByIdAndUpdate(_id,{"$push":{"accounts":{
                        bankCode:bankCode,
                        accountNumber:accNo,
                        bankName:bankName
                    }}})
                }
                res.statusCode = 200
                response = {
                    message:"Account added",
                    success:true,
                    token:"",
                    data:{}

                }
                return res.send(response)
            }else{
                res.statusCode = 400
                response = {
                    message:"Account previously linked",
                    success:false,
                    token:"",
                    data:{}
                }
                return res.send(response)
            }
        }
    }catch(error){
        
    }
})

// profile_r.post("verifyPhone",validateToken, async (req, res)=>{
//     const {_id} = req.user;
//     const {phoneNo} = req.body

// })


module.exports = profile_r;