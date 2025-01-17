const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost:27017/mongopractice`);

// accept a object , har user k paas ky ky hoga
const userSchema = mongoose.Schema({
    name:String,
    userName:String,
    email:String,
});

// create a model and on basis of model we can CRUD
module.exports = mongoose.model('user', userSchema);
