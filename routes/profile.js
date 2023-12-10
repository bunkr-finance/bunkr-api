const express = require("express");
const {validateToken} = require("../config/functions")
const {Bvns, User} = require("../config/models")

const profile_r = express.Router();
profile_r.use(express.json());

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
                await User.findByIdAndUpdate(_id,{"bvn_verified":true});

                const {bvn, user_name, phoneNo} = bvn_check;
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

module.exports = profile_r;