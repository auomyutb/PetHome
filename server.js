const dns = require("dns")
dns.setServers(["8.8.8.8", "1.1.1.1"])

////////////////////////////////////////////

const express = require("express")
const app = express()
const logger = require("morgan")
const cors = require("cors")

require("dotenv").config()
require("./db")

const PORT = process.env.PORT || 3229

////////////////////////////////////////////

const authRouter = require("./routes/authRouter")
const cartRouter = require("./routes/cartRouter")
const petRouter = require("./routes/petRouter")
const productRouter = require("./routes/productRouter")
const reviewRouter = require("./routes/reviewRouter")
const replyReviewRouter = require("./routes/replyReviewRouter")
const userRouter = require("./routes/userRouter")

////////////////////////////////////////////

app.use(cors())
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

////////////////////////////////////////////

app.use("/auth", authRouter)
app.use("/cart", cartRouter)
app.use("/pet", petRouter)
app.use("/product", productRouter)
app.use("/review", reviewRouter)
app.use("/reply", replyReviewRouter)
app.use("/user", userRouter)

////////////////////////////////////////////

app.get("/", (req, res) => {
  res.send("🐾My PetHome server is running")
})

////////////////////////////////////////////

app.listen(PORT, () => {
  console.log(`🚀My PetHome server running on port ${PORT}`)
})
