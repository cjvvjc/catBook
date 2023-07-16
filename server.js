//"require" is used in the server while "import" is used in the browser

require('dotenv').config() //helps read things from env file
const express = require('express') //makes it easier for requests to pass into and out of our app
const app = express() //also required for express
const mongoose = require('mongoose') //server talk to database - MongoDB
const connectDB = require('./config/connectDB') //import connectDB
const catRoutes = require('./routes/catRoutes') //import catRoutes so server can use it
const PORT = process.env.PORT || 3500 //specify which port my app runs on locally. {from node} either a port stored in .env or the alternate 3500

connectDB() //calling my connectDB function from connectDB.js - establish connection with database MongoDB

//Middleware
//helps process requests that go into and out of the server
app.use(express.json())//helps process objects submitted in our forms
app.use(express.urlencoded({extended: true}))//helps form data come through correctly. without this only an empty object is sent to controllers.
app.use(express.static('public')) //tells server which files we want to serve to browser, e.g. image files, css, stored in folder called 'public'
app.set('view engine', 'ejs') //setting up our view engine - EJS

app.use('/', catRoutes) //tell server what to do when someone visits homepage; "use" is a middleware method

//don't want app to start unless connection established to MongoDB
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB') //once connection is open, console.log('')
//get local server set up and running
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)) //then listen on port 3500 and console.log()
})

