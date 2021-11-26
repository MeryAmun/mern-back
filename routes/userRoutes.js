const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/userModel')
const router = express.Router()

//register user
router.post('/register', (req, res, next) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
  console.log(user)
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

module.exports = router
