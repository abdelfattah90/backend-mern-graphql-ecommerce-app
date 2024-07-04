import express from 'express'
import Doctor from '../models/Doctor.model.js'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('In the name of Allah the Merciful')
})

router.post('/doctor', async (req, res) => {
  const { clinicName, doctorName, phone, location } = req.body

  try {
    const newDoctor = new Doctor({
      clinicName,
      doctorName,
      phone,
      location,
    })

    await newDoctor.save()
    res.status(201).json({ message: 'Doctor registered successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message })
  }
})

export default router
