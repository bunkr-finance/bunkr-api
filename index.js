const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const analytics_r = require("./routes/analytics");
const auth_r = require("./routes/auth");
const bills_r = require("./routes/bills");
const profile_r = require("./routes/profile");
const trxs_r = require("./routes/transactions");
const transfers_r = require("./routes/transfers");
const {mongodb_uri} = require("./config/functions");
// const {MongooseError} = require("mongoose");

const app = express();

app.use(express.json());
app.use(cors())

app.use("/api/auth", auth_r);
app.use("/api", profile_r);
app.use("/api", transfers_r);
app.use("/api", analytics_r);
app.use("/api/bills", bills_r);
app.use("/api", trxs_r);


let port = 2000

app.listen(port, async ()=>{
    try{
        await mongoose.connect(mongodb_uri);
        console.log("connected successfully");
    }catch(error){
        console.log(error);
        console.log(`unable to connect to db`);
    }
    console.log(`running on port ${port}`);
})
