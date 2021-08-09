const Users = require('../repositories/users')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY

const register = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email)
    if (user) {
      return res.status(409).json({
        status: 'error',
        code: 409,
        message: 'Email used',
      })
    }
    const { id, email, subscription } = await Users.createUser(req.body)
    return res.status(201).json({
      status: 'success',
      code: 201,
      data: { id, email, subscription },
    })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email)
    const { email, subscription } = user
    const isValidPassword = await user?.isValidPassword(req.body.password)
    if (!user || !isValidPassword) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Incorrect email or password',
      })
    }
    const id = user.id
    const payload = { id }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' })
    await Users.updateToken(id, token)
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: { token, email, subscription },
    })
  } catch (error) {
    next(error)
  }
}

const logout = async (req, res, next) => {
  try {
    const id = req.user.id
    await Users.updateToken(id, null)
    return res.status(204).json({})
  } catch (error) {
    next(error)
  }
}

const current = async (req, res, next) => {
  try {
    const { email, subscription } = req.user
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: { email, subscription },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  register,
  login,
  logout,
  current,
}
