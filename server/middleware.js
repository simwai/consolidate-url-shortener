// https://blog.jscrambler.com/setting-up-authentication-using-angular-node-and-passport/
function auth(passport) {
  return (req, res, next) => {
    console.log(passport)
    console.log(req)
    console.log(res)
    passport.authenticate('local', (error, user) => {
      if (error) res.status(403).json('Auth failed.')

      req.login(user, (error) => {
        if (error) return next(error)
        next()
      })
    })(req, res, next)
  }
}

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()) {
    return next()
  }

  return res.status(403).json('Not logged in.')
}

module.exports = {
  auth,
  isLoggedIn
}
