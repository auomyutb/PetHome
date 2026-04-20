const Donation = require('../models/Donation')

const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 })
    res.json(donations)
  } catch (error) {
    console.log('GET donations error:', error)
    res.status(500).json({ message: 'Error fetching donations' })
  }
}

const createDonation = async (req, res) => {
  try {
    const newDonation = await Donation.create({
      fullName: req.body.fullName,
      email: req.body.email,
      amount: req.body.amount,
      note: req.body.note,
      transferImage: req.file ? req.file.filename : ''
    })

    res.status(201).json(newDonation)
  } catch (error) {
    console.log('POST donation error:', error)
    res.status(500).json({ message: 'Error creating donation' })
  }
}

const deleteDonation = async (req, res) => {
  try {
    await Donation.findByIdAndDelete(req.params.id)
    res.json({ message: 'Donation deleted successfully' })
  } catch (error) {
    console.log('DELETE donation error:', error)
    res.status(500).json({ message: 'Error deleting donation' })
  }
}

module.exports = {
  getDonations,
  createDonation,
  deleteDonation
}
