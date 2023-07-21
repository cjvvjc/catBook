const passport = require('passport')
const User = require('../models/userModel') //'..' up one folder; '.' in same folder

//render login and register pages
const loginPage = (req, res) => {
  res.render('login', {user: req.user})
}

const registerPage = (req, res) => {
  res.render('register', {user: req.user})
}

 //basic authentication function using local strategy. if login successful, go to home page. if unsuccessful, reload login page. 
const loginUser = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: false
})

//registration operation
const registerUser = async (req, res) => {
  try {
    const {username, password} = req.body; //taking info from form and putting into db. destructuring username and password variables

    const user = new User({username}); //create new instance of User model passing in user name
    await User.register(user, password); //using passport register the new user
    passport.authenticate('local')(req, res, function() { // automatically login user: authenticate user and redirect to home page
      res.redirect('/');
    })
  } catch (err) {
    console.log(err);
    res.redirect('/register');
  }
}

//logout user
const logoutUser = (req, res) => {
  req.logout(function(err) {
    if(err) {return next(err);}
    res.redirect('/');
  })
}

module.exports = {
  loginUser,
  loginPage,
  registerPage,
  registerUser, 
  logoutUser
}