const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/students', {useNewUrlParser: true})

const Schema = mongoose.Schema

const studentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
  },
  gender: {
    type: Number,
    enum: [0, 1] , // 限制值只能是0或1
    default: 0,
  },
  hobbies: {
    type: String
  }
})

module.exports = mongoose.model('Student', studentSchema)