const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: "457453379813-1ei0s3u553o1elucdfbmhj6c8v6cknt7.apps.googleusercontent.com",
        clientSecret: "pIXQof2OcQjSr5q2mL48Wc4G",
        callbackURL: '/auth/google/redirect'
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile.id);
        console.log(profile.username);
        //console.log(profile.displayName);
        console.log(profile.emails[0].value);
        //console.log(profile.photos[0].value);
        console.log(accessToken);
        /*console.log(refreshToken);
        console.log(gender);
        console.log(birthday);
        console.log(organization);
        console.log(phonenumbers); */

        const newUser = {
          Id: profile.id,
          username: profile.emails[0].value,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
          token: accessToken,
          LastLogin: Date(),
        }


        try {
          let user = await User.findOne({ 'Id': profile.id })
          if (user) {
            console.log(profile.id);
            console.log(profile.emails[0].value);
            //console.log(profile.displayName);
            //console.log(profile.photos[0].value);
            console.log(accessToken);
            console.log(profile.emails[0].value);
            //console.log(refreshToken);

            const UpdateUser = {
              token: accessToken,
              LastLogin: Date(),
            }
            let user = await User.findOneAndUpdate({ 'Id': profile.id }, UpdateUser)


            done(null, user)
          } else {
            user = await User.create(newUser)
            done(null, user)
          }
        } catch (err) {
          console.error(err)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}
