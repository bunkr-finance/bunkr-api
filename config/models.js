const {Schema, Types, model} = require("mongoose");


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
    balance: Types.Decimal128
});

const userAccountSchema = new Schema({
    _id: {
        type:Types.ObjectId
    },
    accounts: [accountSchema]
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

const User = model("users", userSchema);
const usersAccounts =  model("userAccounts", userAccountSchema);
const Bvns = model("testBVNs", bvnSchema);


module.exports = {
    User,
    usersAccounts,
    Bvns
}