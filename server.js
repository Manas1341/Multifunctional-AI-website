const express = require ('express')
const morgan = require ('morgan')
const cors = require('cors')
const bodyparser = require('body-parser')
const colors = require('colors')
const dotenv = require('dotenv')
const connect_DB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const errorHandler = require('./middlewares/errorMiddleware')

// dotenv
dotenv.config()

// Mongo connection

connect_DB()

const PORT = process.env.PORT

const app = express()

// middlewares

app.use(cors())
app.use(express.json())
app.use(bodyparser.urlencoded({extended:false}))
app.use(morgan('dev'))
app.use(errorHandler)

// API Routes
app.use('/api/v1/auth',authRoutes)

app.listen(PORT,()=>{
    console.log(`Server Running on the port ${PORT}`)
})