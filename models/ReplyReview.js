const mongoose = require("mongoose")

const replySchema = new mongoose.Schema(
  {
    review: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("ReplyReview", replySchema)
