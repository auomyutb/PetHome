const Pet = require('../models/Pet')

///////////////////////////////

const getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find().sort({ createdAt: -1 })
    res.json(pets)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pets' })
  }
}

///////////////////////////////

const getDogs = async (req, res) => {
  try {
    const dogs = await Pet.find({ type: 'dog' }).sort({ createdAt: -1 })
    res.json(dogs)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dogs' })
  }
}

///////////////////////////////

const getCats = async (req, res) => {
  try {
    const cats = await Pet.find({ type: 'cat' }).sort({ createdAt: -1 })
    res.json(cats)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cats' })
  }
}

///////////////////////////////

const createPet = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Admins only' })
    }
    const newPet = await Pet.create(req.body)
    res.status(201).json(newPet)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error creating pet' })
  }
}

///////////////////////////////

const updatePet = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Admins only' })
    }
    const updatedPet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    res.json(updatedPet)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error updating pet' })
  }
}

///////////////////////////////

const deletePet = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Admins only' })
    }
    await Pet.findByIdAndDelete(req.params.id)
    res.json({ message: 'Pet deleted successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error deleting pet' })
  }
}

///////////////////////////////

module.exports = {
  getAllPets,
  getDogs,
  getCats,
  createPet,
  updatePet,
  deletePet
}
