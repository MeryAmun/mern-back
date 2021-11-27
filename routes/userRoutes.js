const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const Message = require('../models/messageModel')
const router = express.Router()

//login route

router.post('/login', (req, res, next) => {
  const password = req.body.password
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: 'Auth Failed',
        })
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Auth failed',
          })
        }
        if (result) {
          const token = user.generateToken()
          res.cookie('jwt', token, {
            espiresIn: new Date(Date.now() + 86400000),
            httpOnly: true,
          })
          return res.status(200).json({
            massage: 'Auth successful',
          })
        }
      })
    })
})
//register user
router.post('/register', (req, res, next) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })

  user
    .save()
    .then((result) => {
      console.log(result)
      res.status(201).json({
        message: 'user created',
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        error: err,
      })
    })
})

//message
router.post('/message', (req, res, next) => {
  const message = new Message({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  })
  console.log(message)
  message
    .save()
    .then((result) => {
      console.log(result)
      res.status(201).json({
        message: 'message sent',
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        error: err,
      })
    })
})

module.exports = router
