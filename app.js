const express = require('express')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const router = express.Router()

const app = express()

mongoose
  .connect(
    'mongodb+srv://mamba:mamba2021@transport.jlugw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('connection successful')
  })
  .catch((err) => {
    console.log(err)
  })

app.get('/', (req, res, next) => {
  res.send('Hello wolrd')
})

//listen

app.listen(6000, () => {
  console.log('We are live on port 5000')
})
