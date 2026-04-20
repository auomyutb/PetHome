const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || 10)
const APP_SECRET = process.env.APP_SECRET

const hashPassword = async (password) => {
  // Accepts a password from the request body
  return await bcrypt.hash(password, SALT_ROUNDS)
  // Creates a hashed password and encrypts it 12 times
}

const comparePassword = async (password, storedPassword) => {
  // Accepts the password provided in the login request and the currently stored password
  // Compares the two passwords for a match
  if (!storedPassword) return false
  return await bcrypt.compare(password, storedPassword)
  // Returns true if the passwords match
  // Returns false if the passwords are not a match
}

const createToken = (payload) => {
  // Accepts a payload with which to create the token
  return jwt.sign(payload, APP_SECRET)
  // Generates the token and encrypts it, returns the token when the process finishes
}

const stripToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"]
    const token = authHeader?.split(" ")[1]

    if (!token) {
      return res.status(401).send("No Token")
    }

    res.locals.token = token
    next()
  } catch (error) {
    res.status(401).send({ status: "Error", msg: "Strip Token Error!" })
  }
}

const verifyToken = (req, res, next) => {
  try {
    if (!res.locals.token) {
      return res.status(401).send("No Token")
    }

    const payload = jwt.verify(res.locals.token, APP_SECRET)
    res.locals.payload = payload

    next()
  } catch (error) {
    res.status(401).send("Invalid Token")
  }
}

module.exports = {
  hashPassword,
  comparePassword,
  createToken,
  stripToken,
  verifyToken,
}

// /// this is from unit 3 lesson  i did some  modify :
// u3_lesson_mongoose_auth
