//setting up function to allow connection to MongoDB
const mongoose = require('mongoose')
const connectDB = async () => { //async sends request to db and waits for reply to come back
    //try/catch allows errors to be caught and displayed - try something and handle any errors that arise - used anywhere something can fail
    try {
        await mongoose.connect(process.env.DATABASE_URI)//DATABASE_URI in all caps bc it is a constant and will not change
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB //allows you to call this function from another file as long as it is imported in that file