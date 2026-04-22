const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const userInDatabase = await User.findOne({ email })
    if (userInDatabase) {
      return res.status(400).json({ message: "Email already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    res.status(201).json(newUser)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Sign up error" })
  }
}

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body

    const userInDatabase = await User.findOne({ email })
    if (!userInDatabase) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const validPassword = await bcrypt.compare(
      password,
      userInDatabase.password
    )
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const payload = {
      id: userInDatabase._id,
      name: userInDatabase.name,
      email: userInDatabase.email,
      isAdmin: userInDatabase.isAdmin,
    }

    const token = jwt.sign(payload, process.env.APP_SECRET)

    res.json({ token, user: payload })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Sign in error" })
  }
}

module.exports = {
  signUp,
  signIn,
}
