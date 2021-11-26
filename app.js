const express = require('express')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const userRoute = require('./routes/userRoutes')
const bodyParser = require('body-parser')

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

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type, Accept, Authorization'
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})
//routes

app.use('/users', userRoute)
app.get('/', (req, res, next) => {
  res.send('Hello black world')
})

//listen

app.listen(6000, () => {
  console.log('We are live on port 6000')
})
