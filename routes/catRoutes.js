const express = require('express')
const catController = require('../controllers/catController') //where to send these items; up a level == ".."
const router = express.Router() //built in express ability to route requests

//when someone visits the homepage, controller is activated, and all cats are displayed
router
  .route('/')
  .get(catController.getAllCats)

// upload router to load upload page
router
  .route('/upload')
  .get(catController.uploadPage)
  .post(catController.upload.single('image'), catController.createCat) //multer method to handle the image

//edit router to load edit page
router
  .route('/edit/:id') //':id' is basically a variable that'll change depending on which cat is selected
  .get(catController.editPage)
  .post(catController.updateCat)

//delete router
router
  .route('/delete/:id')
  .post(catController.deleteCat)

  module.exports = router