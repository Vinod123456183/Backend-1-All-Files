const mongoose = require('mongoose');

// Iss Advance Tutorial K liye humne extra config folder nahi banaya h
mongoose.connect("mongodb://127.0.0.1:27017/testing_Advance_Db_Commands");

const userSchema =  mongoose.Schema({
    userName:String,
    name:String,
    age:String,
    password:String,
    isMarried:Boolean,
    email:String,
    // isAdmin:Boolean
})

module.exports = mongoose.model ("user" , userSchema)
