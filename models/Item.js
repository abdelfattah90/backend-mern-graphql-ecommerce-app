const mongoose = require('mongoose')

const ItemsSchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  name: {
    type: String,
  },
  status: {
    type: String,
    enum: ['In Stock', 'Out Stock'],
  },
})

module.exports = mongoose.model('Items', ItemsSchema)
