const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
const dns = require('dns')
require('dotenv').config()

dns.setServers(['8.8.8.8', '1.1.1.1'])

const app = express()

const authRoutes = require('./routes/auth')
const petRoutes = require('./routes/pets')
const donationRoutes = require('./routes/donations')
const productRoutes = require('./routes/product')
const cartRoutes = require('./routes/cart')

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/auth', authRoutes)
app.use('/', petRoutes)
app.use('/donations', donationRoutes)
app.use('/products', productRoutes)
app.use('/cart', cartRoutes)

app.get('/', (req, res) => {
  res.send('petHome backend running')
})

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.log('MongoDB connection error:')
    console.log(error.message)
  }
}

connectDB()

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
