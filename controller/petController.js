const Pet = require("../models/Pet.js")

////////////////////👌DONE CHECK THIS IN INSOMNIA ////////////////////////

const createPet = async (req, res) => {
  try {
    const newPet = await Pet.create(req.body)
    res.json(newPet)
  } catch (error) {
    res.status(500).json(error)
  }
}

////////////////////👌DONE CHECK THIS IN INSOMNIA ////////////////////////

const getPetById = async (req, res) => {
  try {
    const { id } = req.params
    const pet = await Pet.findById(id)

    if (!pet) {
      return res.status(404).json({ message: "Pet Not Found" })
    }

    res.json(pet)
  } catch (error) {
    res.status(500).json(error)
  }
}

////////////////////👌DONE CHECK THIS IN INSOMNIA ////////////////////////

const getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find()
    res.json(pets)
  } catch (error) {
    res.status(500).json(error)
  }
}


////////////////////👌DONE CHECK THIS IN INSOMNIA ////////////////////////

const updatePet = async (req, res) => {
  try {
    const { id } = req.params
    const pet = await Pet.findByIdAndUpdate(id, req.body, { new: true })
    res.json(pet)
  } catch (error) {
    res.status(500).json(error)
  }
}

////////////////////👌DONE CHECK THIS IN INSOMNIA ////////////////////////

const deletePet = async (req, res) => {
  try {
    const { id } = req.params
    await Pet.findByIdAndDelete(id)
    res.json({ message: "Pet Deleted" })
  } catch (error) {
    res.status(500).json(error)
  }
}

////////////////////////////////////////////

module.exports = { getAllPets, getPetById, createPet, updatePet, deletePet }
