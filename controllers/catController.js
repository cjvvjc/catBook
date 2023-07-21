//brain of app
const Cat = require('../models/catModel')
const multer = require('multer')

// multer config for image upload
const storage = multer.diskStorage({ //setting storage method to disk
  destination: function(req, file, cb) { //setting destination for uploaded images => public/images
    cb(null, './public/images');
  },
  filename: function(req, file, cb) { //setting image filename
    cb(null, Date.now() + '-' + file.originalname);
  }
});

//upload mechanic to handle uploads
const upload = multer({ storage: storage }); 

//goes in to db, gets all cats, render the homepate, and pass the cats into homepage
const getAllCats = async (req, res) => {
  try {
    const cats = await Cat.find().populate('owner') //goes into Cats collection and gets everything and gets info about owner from other Schema
    res.render('home', {cats: cats, user: req.user})
  } catch(err) {
    console.log(err)
  }
}

//controller to handle upload page and put cat in database
const uploadPage = (req, res) => {
  res.render('upload')
}

//function to create a new cat, write to the database
const createCat = async (req, res) => {
  try {
    const cat = new Cat({ //write form data into a db object; needs to meet structure specified for data
      name: req.body.name,
      age: req.body.age,
      favoriteFood: req.body.favoriteFood,
      funFact: req.body.funFact,
      image: req.file.filename, //multer places the file info in req.file
      owner: req.user._id //grab whatever user is logged in and attach them to owner field
  })

  await cat.save() //mongoose method to save object to db
  res.redirect('/') //reload the homepage

  } catch(err) {
    console.log(err)
  }
}

//function to display the page to update/edit an uploaded cat
const editPage = async (req, res) => {
  try {
    const cat = await Cat.findById(req.params.id)
    res.render('edit', {cat:cat})
  } catch (err) {
    console.log(err)
  }
}

//function to update/edit cat in database
const updateCat = async (req, res) => {
  try {
    //validate that id of person editing is equal to id of person associated with cat
    let cat = await Cat.findById(req.params.id)
    if(cat.owner.equals(req.user._id)){
      await Cat.findByIdAndUpdate(req.params.id, req.body) //req.params.id is what we're looking for and req.body is the stuff used to update the db entry
    }
    res.redirect('/')
  } catch (err) {
    console.log(err)
  }
}

//function to delete a cat from the db
const deleteCat = async (req, res) => {
  try {
    let cat = await Cat.findById(req.params.id)
    if(cat.owner.equals(req.user._id)){ 
      await Cat.findByIdAndRemove(req.params.id)
    }
    res.redirect('/')
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  getAllCats,
  upload,
  uploadPage,
  createCat,
  editPage,
  updateCat,
  deleteCat
}