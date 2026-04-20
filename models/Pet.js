const mongoose = require("mongoose")

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    picture: {
      type: String,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Pet", petSchema)
