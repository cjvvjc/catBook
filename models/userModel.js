const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose') //helping hand where passport talks to mongoose

const UserSchema = new Schema({})

UserSchema.plugin(passportLocalMongoose) //passport local mongoose creates the Schema for us

module.exports = mongoose.model('Users', UserSchema)