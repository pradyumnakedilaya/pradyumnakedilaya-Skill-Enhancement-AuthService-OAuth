const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  Id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  creationDate: {
    type: String,
    default: Date(),
  },
  token: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    default: "Unspecified",
  },
  grade: {
    type: Number,
    default: 0,
  },
  SocialLink: {
    type: String,
    default: "None",
  },
  LastLogin: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('User', UserSchema)
