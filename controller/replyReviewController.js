const ReplyReview = require("../models/ReplyReview")

////////////////////👌DONE CHECK THIS IN INSOMNIA ////////////////////////

const createReply = async (req, res) => {
  try {
    const { review, user, comment } = req.body
    const reply = await ReplyReview.create({ review, user, comment })
    res.json(reply)
  } catch (error) {
    res.status(500).json(error)
  }
}

////////////////////👌DONE CHECK THIS IN INSOMNIA ////////////////////////

const getReply = async (req, res) => {
  try {
    const { review } = req.params
    const reply = await ReplyReview.find({ review }).populate("user", "name")
    res.json(reply)
  } catch (error) {
    res.status(500).json(error)
  }
}

////////////////////👌DONE CHECK THIS IN INSOMNIA ////////////////////////

const deleteReply = async (req, res) => {
  try {
    const { id } = req.params

    const deleted = await ReplyReview.findByIdAndDelete(id)

    if (!deleted) {
      return res.status(404).json({ message: "Reply not found" })
    }

    res.json({ message: "Reply deleted successfully" })
  } catch (error) {
    res.status(500).json(error)
  }
}

////////////////////👌DONE CHECK THIS IN INSOMNIA ////////////////////////

module.exports = { getReply, createReply, deleteReply }
