const mongoose = require ("mongoose");
const userSchema = mongoose.Schema({
    userName : String,
    email: String,
    password: String,
    role:String,
})

const user=mongoose.model("User",userSchema);
module.exports=user;