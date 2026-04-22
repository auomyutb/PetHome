const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const morgan = require("morgan")
const path = require("path")
const dns = require("dns")
require("dotenv").config()

dns.setServers(["8.8.8.8", "1.1.1.1"])

const app = express()

const authRouter = require("./routes/authRouter")
const petsRouter = require("./routes/petsRouter")
const donationsRouter = require("./routes/donationsRouter")
const productRouter = require("./routes/productRouter")
const cartRouter = require("./routes/cartRouter")

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use("/auth", authRouter)
app.use("/pets", petsRouter)
app.use("/donations", donationsRouter)
app.use("/products", productRouter)
app.use("/cart", cartRouter)

app.get("/", (req, res) => {
  res.send("petHome backend running")
})

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Connected to MongoDB")
  } catch (error) {
    console.log("MongoDB connection error:")
    console.log(error.message)
  }
}

connectDB()

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
