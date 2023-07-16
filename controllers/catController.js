//brain of app
const Cat = require('../models/catModel')

//goes in to db, gets all cats, render the homepate, and pass the cats into homepage
const getAllCats = async (req, res) => {
  try {
    const cats = await Cat.find() //goes into Cats collection and gets everything
    res.render('home', {cats: cats})
  } catch(err) {
    console.log(err)
  }
}