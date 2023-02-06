const mongoose = require('mongoose')
const colors = require('colors')
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI)
  mongoose.set('strictQuery', true)
  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold)
}
mongoose.set('strictQuery', false)
module.exports = connectDB

// When strict option is set to true, Mongoose will ensure that only the fields that are specified in your Schema will be saved in the database, and all other fields will not be saved (if some other fields are sent).
