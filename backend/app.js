const express = require('express')
const app = express()
const cors = require('cors')
const { db } = require('./db/db')

require('dotenv').config()

const PORT = process.env.PORT

// middlwares
app.use(express.json())
app.use(cors())

const server = () => {
    db()
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`)
    })    
}

server()