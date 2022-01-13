const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const userRoute = require('./routes/userRoutes')
const messageRoute = require('./routes/messageRoute')
const bodyParser = require('body-parser')
dotenv.config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(
  cors({
    credentials: true,
    origin: 'https://react-node-bootstrapp-2022.netlify.app/',
  })
)

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin,X-Requested-With,Content-Type, Accept, Authorization'
//   )
//   if (req.method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
//     return res.status(200).json({})
//   }
//   next()
// })

//routes

app.use('/users', userRoute)
app.use('/message', messageRoute)
app.get('/', (req, res, next) => {
  res.send('Hello black world')
})

//listen

let PORT = process.env.PORT
const host = '0.0.0.0'

const connected = mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connection successful')
  })
  .catch((err) => {
    console.log(err)
  })
const startServer = async () => {
  try {
    await connected.then(() => {
      if (PORT == null || PORT == '') {
        PORT = 8000
      }
      app.listen(PORT, host, () => {
        console.log(`we are live on port ${PORT}`)
      })
    })
  } catch (error) {
    console.log(error)
  }
}
startServer()
