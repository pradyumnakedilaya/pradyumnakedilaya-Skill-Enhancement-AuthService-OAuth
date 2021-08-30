const express = require('express')
const passport = require('passport')
const router = express.Router()

// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email']}))

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  '/google/redirect',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard')
  }
)

// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router
/* 
google api
'https://www.googleapis.com/auth/user.gender.read'
'https://www.googleapis.com/auth/user.organization.read'
'https://www.googleapis.com/auth/user.phonenumbers.read'
'https://www.googleapis.com/auth/user.birthday.read	'
'https://www.googleapis.com/auth/user.addresses.read'	
'https://www.googleapis.com/auth/profile.agerange.read'	
 */