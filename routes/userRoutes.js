const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const authCheck = require('../middleware/authCheck')
const router = express.Router()

//login route

router.post('/login', async (req, res, next) => {
  try {
    const password = req.body.password
    const user = await User.findOne({ email: req.body.email })

    if (user.length < 1) {
      return res.status(401).json({
        message: 'Auth Failed',
      })
    }
    const isMatch = await bcrypt.compare(password, user.password, (err) => {
      if (err) {
        return res.status(401).json({
          message: 'Auth failed',
        })
      }
      if (isMatch) {
        const token = user.generateToken()
        res.cookie('jwt', token, {
          expiresIn: new Date(Date.now() + 86400000),
          httpOnly: true,
        })
        return res.status(200).json({
          message: 'Auth successful',
        })
      }
    })
  } catch (error) {}
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

router.get('/logout', (req, res, next) => {
  res.clearCookie('jwt', { path: '/' })
  res.status(200).json({
    message: 'user logged out',
  })
})

router.get('/auth', authCheck, (req, res, next) => {})
module.exports = router
