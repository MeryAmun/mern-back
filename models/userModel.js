const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // tokens: [
  //   {
  //     token: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  // ],
})

//hash password

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 10)
  }
  next()
})

//generate token  to verify user
// userSchema.methods.generateToken = async function () {
//   try {
//     let generatedToken = jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
//     this.tokens = this.tokens.concat({ token: generatedToken })
//     await this.save()
//     return generatedToken
//   } catch (error) {
//     console.log(error)
//   }
// }

module.exports = mongoose.model('User', userSchema)
