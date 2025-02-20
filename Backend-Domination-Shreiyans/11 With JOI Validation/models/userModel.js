const mongoose = require("mongoose");
const Joi = require("joi");
mongoose.connect("mongodb://127.0.0.1:27017/joitestdb");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    minLength: 3,
  },
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  age: {
    type: Number,
    required: true,
    min: 18,
  },
  contact: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
  },
});

// How Joi Works , jis File me Schema Build ussi file me JOI
// Funtion return error

// USER Schema Baad me bne
//Usse Phle Joi chle phle y parse then schema will made

function validateModel(data) {
  let schema = Joi.object({
    userName: Joi.string().min(3).required(),
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    age: Joi.number().min(18).required(),
    contact: Joi.number().required(),
  });

  let { error } = schema.validate(data);
  // if error k andar message then print
  // optional chaining
  // console.log(resolve.error?.message);
  return error;
}

// With Joi

let userModel = mongoose.model("User", userSchema);

module.exports = { validateModel, userModel };
