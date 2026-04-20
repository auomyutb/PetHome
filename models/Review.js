const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
    },
    rating: {
      type: Number,
      require: true,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Review", reviewSchema)
