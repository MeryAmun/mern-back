const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies.jwt
    console.log(token)
    if (!token) {
      res.status(401).json({
        message: 'No token',
      })
    } else {
      const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
      const rootUser = await User.findOne({
        _id: verifyToken._id,
        'tokens.token': token,
      })
      if (!rootUser) {
        res.status(401).json({
          message: 'User not found ',
        })
      } else {
        res.status(200).json({
          message: 'Authorized user',
        })
      }
    }
    next()
  } catch (error) {
    console.log(error)
  }
}
