const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const connectDB = require('./config/db')

const PORT = process.env.PORT || 5000
const app = express()

// Connect to database
connectDB()

app.use(cors())
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.get('/', (req, res) => {
  res.send('THE SERVER IS RUNNING...')
})

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.GRAPHIQL_MODE === 'development',
// 	pretty: true,
  })
)


app.listen(PORT, console.log('THE SERVER IS RUNNING...'))
