const middleware = require("../middleware")
const User = require("../models/User")

////////////////////////////////////////////

/////////////  👌DONE CHECK THIS IN INSOMNIA //////

const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).send("Email Already Exists")
    }

    const hashedPassword = await middleware.hashPassword(password)

    const user = await User.create({ name, email, password: hashedPassword })
    res.status(201).send(user)
  } catch (error) {
    console.log(error)
    res.status(500).send(error.message)
  }
}

/////////////////👌DONE CHECK THIS IN INSOMNIA ///////////////////////////

const Login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: " User Not Found ",
      })
    }
    const matched = await middleware.comparePassword(password, user.password)
    if (!matched) {
      return res.status(401).json({
        status: "error",
        message: " Invalid Password ",
      })
    }
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
    }
    const token = middleware.createToken(payload)
    res.status(200).send({ user: payload, token })
  } catch (error) {
    console.log(error)
    res
      .status(401)
      .send({ status: "Error", message: " An error has occurred logging in " })
  }
}

////////////////////👌DONE CHECK THIS IN INSOMNIA ////////////////////////

const UpdatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body
    const user = await User.findById(req.params.id)
if ( !user ){
  return res.status(404).send( " User Not Found ")
}
    const matched = await middleware.comparePassword(oldPassword, user.password)

    if (!matched) {

      return res.status (401).send ( " Old Password Incorrect ")

      const hashed = await middleware.hashPassword(newPassword)

      await User.findByIdAndUpdate(req.params.id, { password: hashed })
      res.status(200).send ( " Password Update Successfully ")
    }
    } catch (error) {
    console.log(error)
    res.status(401).send({status: "Error", message: " An error has occurred updating password ",
    })

}}

////////////////////////////////////////////

module.exports = { Register, Login, UpdatePassword }
