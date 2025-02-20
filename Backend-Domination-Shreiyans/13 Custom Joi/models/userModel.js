const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      trim: true,
      index: true,
      unique: true,
      sparse: true,
    },
    name: {
      type: String,
      trim: true,
    },
    age: {
      type: Number,
    },
    contact: {
      type: Number,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    collection: "users",
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => {
        delete ret._id;
        return ret;
      },
    },
  }
);

const User = mongoose.model("User", userSchema);

// Joi Validation Schema
const validateModel = (data) => {
  const schema = Joi.object({
    userName: Joi.string().alphanum().min(3).max(30).required().messages({
      "string.empty": "Username is required",
      "string.min": "Username must be at least 3 characters",
      "string.max": "Username must be at most 30 characters",
      "string.alphanum": "Username must contain only letters and numbers",
    }),

    name: Joi.string().min(2).max(50).optional().messages({
      "string.min": "Name must be at least 2 characters",
      "string.max": "Name must be at most 50 characters",
    }),

    age: Joi.number().integer().min(0).max(150).optional().messages({
      "number.min": "Age cannot be negative",
      "number.max": "Age cannot be more than 150",
      "number.integer": "Age must be a whole number",
    }),

    contact: Joi.number()
      .integer()
      .min(1000000000)
      .max(9999999999)
      .optional()
      .messages({
        "number.min": "Invalid contact number",
        "number.max": "Invalid contact number",
        "number.integer": "Contact number must be a whole number",
      }),

    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required()
      .messages({
        "string.email": "Please enter a valid email address with .com or .net",
        "any.required": "Fix mail",
      }),
  });

  const { error } = schema.validate(data);
  return error;
};

module.exports = { User, validateModel };
