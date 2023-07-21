const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

//login route
router
  .route('/login')
  .get(userController.loginPage) //display login page
  .post(userController.loginUser) //submit login form

//registration route
router
  .route('/register')
  .get(userController.registerPage) //display register page
  .post(userController.registerUser) //submit register page

//logout route
router
  .route('/logout')
  .get(userController.logoutUser)

module.exports = router