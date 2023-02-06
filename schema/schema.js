const Category = require('../models/Category')
const Item = require('../models/Item')

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require('graphql')

// Category Type
const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  }),
})

// Item Type
const ItemType = new GraphQLObjectType({
  name: 'Item',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    status: { type: GraphQLString },
    category: {
      type: CategoryType,
      resolve(parent, args) {
        return Category.findById(parent.categoryId)
      },
    },
  }),
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    category: {
      type: CategoryType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Category.findById(args.id)
      },
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve(parent, args) {
        return Category.find()
      },
    },
    item: {
      type: ItemType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Item.findById(args.id)
      },
    },
    items: {
      type: new GraphQLList(ItemType),
      resolve(parent, args) {
        return Item.find()
      },
    },
  },
})

// Mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Add a category
    addCategory: {
      type: CategoryType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const category = new Category({
          name: args.name,
        })

        return category.save()
      },
    },
    // Delete a category
    deleteCategory: {
      type: CategoryType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        Item.find({ categoryId: args.id }).then((items) => {
          items.forEach((item) => {
            item.remove()
          })
        })

        return Category.findByIdAndRemove(args.id)
      },
    },
    // Add a item
    addItem: {
      type: ItemType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: 'ItemStatus',
            values: {
              in: { value: 'In Stock' },
              out: { value: 'Out Stock' },
            },
          }),
          defaultValue: 'In Stock',
        },
        categoryId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const item = new Item({
          name: args.name,
          status: args.status,
          categoryId: args.categoryId,
        })

        return item.save()
      },
    },
    // Delete a item
    deleteItem: {
      type: ItemType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Item.findByIdAndRemove(args.id)
      },
    },
    // Update a item
    updateItem: {
      type: ItemType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: 'ItemStatusUpdate',
            values: {
              in: { value: 'In Stock' },
              out: { value: 'Out Stock' },
            },
          }),
        },
      },
      resolve(parent, args) {
        return Item.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              status: args.status,
            },
          },
          { new: true }
        )
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
})
