const express = require("express");
const { model } = require("mongoose");
const mongoose = require("mongoose");
var app = express();
let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

model.exports = mongoose.model("User", userSchema);
