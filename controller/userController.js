const User = require("../models/User")

//////////////////👌DONE CHECK THIS IN INSOMNIA //////////////////////////

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).send(users)
  } catch (error) {
    res.status(500).send({ status: "error", message: "Error Users" })
  }
}

//////////////////👌DONE CHECK THIS IN INSOMNIA //////////////////////////

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res
        .status(404)
        .send({ status: "error", message: "user not found" })
    }
    res.status(200).send(user)
  } catch (error) {
    res.status(500).send({ status: "error", message: " error user" })
  }
}

//////////////////👌DONE CHECK THIS IN INSOMNIA //////////////////////////

const updateUser = async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!updateUser) {
      return res
        .status(404)
        .send({ status: "error", message: "user not found" })
    }
    res.status(200).send(updateUser)
  } catch (error) {
    console.log(error)
    res.status(500).send({ status: "error", message: " error updating user" })
  }
}

//////////////////👌DONE CHECK THIS IN INSOMNIA //////////////////////////

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id)
    if (!deletedUser) {
      return res
        .status(404)
        .send({ status: "error", message: " User Not Found" })
    }

    res
      .status(200)
      .send({ status: " Success", message: " User delete successfully" })
  } catch (error) {
    console.log(error)
    res.status(500).send({ status: "error", message: "error delete User" })
  }
}

////////////////////👌DONE CHECK THIS IN INSOMNIA ////////////////////////

module.exports = { getAllUsers, getUserById, updateUser, deleteUser }
