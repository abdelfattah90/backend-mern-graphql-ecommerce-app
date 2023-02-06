// Categories
const categories = [
  {
    id: '1',
    name: 'Laptops',
  },
  {
    id: '2',
    name: 'Mobiles',
  },
]

// Items
const items = [
  {
    id: '1',
    categoryId: '1',
    name: 'HP Notebook 15 ',
    status: 'In Stock',
  },
  {
    id: '2',
    categoryId: '1',
    name: 'Dell S3',
    status: 'Out Stock',
  },
  {
    id: '3',
    categoryId: '2',
    name: 'Samsung A73',
    status: 'In Stock',
  },
  {
    id: '4',
    categoryId: '2',
    name: 'OPPO A7',
    status: 'Out Stock',
  },
]

module.exports = { categories, items }
