const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const Message = require('../models/messageModel')
const router = express.Router()

//message
router.post('/', (req, res, next) => {
  const message = new Message({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  })

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
