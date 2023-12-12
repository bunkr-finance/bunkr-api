const {Schema, Types, model} = require("mongoose");
const mongoose = require("mongoose")


const userSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    pwd:{
        type:String
    },
    dob:{
        type:Date,
        default:Date.now()

    },
    bvn:{
        type:String,
        default:""
    },
    phoneNo:{
        type:String,
        default:""
    },
    verified:{
        type:Boolean,
        default:false
    },
    bvn_verified:{
        type:Boolean,
        default:false
    }

});

const accountSchema = new Schema({
    bankName:String,
    bankCode:String,
    accountNumber:String,
    
});

const userAccountSchema = new Schema({
    _id: {
        type:Types.ObjectId
    },
    accounts: Array
});


const bvnSchema = new Schema({
    bvn :{
        type:String,
        required:true
    },
    user_name:{
        type:String,
        required:true
    },
    phoneNo:{
        type:String,
        required:true
    },

});

// this schema is for dummy banks
const BankSchema =  new Schema({
    bankName:{
        type:String,
        unique:true
    },
    bankCode:{
        type:String,
        unique:true
    },
    accNo:{
        type:String,
        unique:true
    },
    accName: {
        type:String
    },
    balance:{
        type:Number,
        default:0.0
    },
    img_url:{
        type:String,
        unique:true
    },
    bvn:{
        type:String
    }
})


const User = model("users", userSchema);
const usersAccounts =  model("userAccounts", userAccountSchema);
const Bvns = model("testBVNs", bvnSchema);
const Banks = model("testBanks", BankSchema)


module.exports = {
    User,
    usersAccounts,
    Bvns,
    Banks
}