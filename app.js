const express = require('express')
const path = require('path')
const bodyparser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const mongoose = require('mongoose')
const session = require('express-session')
const config = require('./config/database')


// Connect to database
mongoose.connect(config.database, { useNewUrlParser: true , useUnifiedTopology: true })
// on connect
mongoose.connection.on('connected', ()=>{
    console.log('Connected to database: '+config.database)
})
//on error
mongoose.connection.on('error', (err)=>{
    console.log('Database error: '+err)
}) 

const app = express()

const users = require('./routes/users')


const port = 3000

// cors middleware
app.use(cors())


// Static folder

app.use(express.static(path.join(__dirname, 'public')))

//Bodyparser middleware
app.use(bodyparser.json())

app.use("/users",users)


app.get("/",(req,res)=>{
    res.send("Invalid endpoint")
    console.log("test")
})


app.listen(port, ()=>{
    console.log("Server runing on port: "+port)
})

