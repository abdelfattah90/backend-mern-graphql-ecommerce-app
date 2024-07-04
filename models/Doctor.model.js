import mongoose from 'mongoose'

const doctorSchema = new mongoose.Schema({
  clinicName: { type: String, required: true },
  doctorName: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
})

const Doctor = mongoose.model('Doctor', doctorSchema)

export default Doctor
