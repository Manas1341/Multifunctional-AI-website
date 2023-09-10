const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()
const MONGO_URL = process.env.MONGO_URL

const connect_DB = async()=>{
    try {
        await mongoose.connect(MONGO_URL)
        console.log("Connected to Mongodb")
    } catch (error) {
        console.log("Error connecting to  MongoDB",error)
    }
}

module.exports = connect_DB