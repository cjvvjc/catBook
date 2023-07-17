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
    const cats = await Cat.find() //goes into Cats collection and gets everything
    res.render('home', {cats: cats})
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
      image: req.file.filename //multer places the file info in req.file
  })

  await cat.save() //mongoose method to save object to db
  res.redirect('/') //reload the homepage

  } catch(err) {
    console.log(err)
  }
}

module.exports = {
  getAllCats,
  upload,
  uploadPage,
  createCat
}