const mongoose = require('mongoose');
const userSchema =  mongoose.Schema({
    userName:String,
    name:String,
    email:String,
    password:String
})

// later name is pluraliseed
module.exports = mongoose.model ("user" , userSchema)
