    const mongoose = require('mongoose');

    mongoose.connect('mongodb://localhost:27017/MINIPROJECT');

    const userSchema = new mongoose.Schema({
        username: String,
        name:String,
        email: { type: String, unique: true },
        password:String,
        age: Number,
        posts:[{
            type:mongoose.Schema.Types.ObjectId  ,ref:"post"
        }]
    });

    module.exports = mongoose.model('User', userSchema);
