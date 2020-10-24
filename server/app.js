const express = require('express')
const cors = require('cors')
const validateUrl = require('url-validator')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const { DbService } = require('./db-service')
const dbService = new DbService()

const middleware = require('./middleware')

const app = express()
const port = 3000

app.use(cors())

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  console.log(user)
  if(user) done(null, user);
});

passport.deserializeUser(function(id, done) {
  console.log(id)
  done(null, id);
});

// TODO fix logic
passport.use(new LocalStrategy((username, password, done) => {
  if (username === 'admin' && password === 'admin') {
    return done(null, username)
  } else {
    return done('Unauthorized access', false)
  }
}))

// app.post('/authenticate/user/:user/password/:password', (req, res) => { 
//   console.log(req)
//   middleware.auth(passport, req.user, req.password)
//   // res.status(200).json('Auth worked.')
// })

app.post('/authenticate', (req, res) => { 
  console.log(req)
  middleware.auth(passport, 'admin', 'admin')
  // res.status(200).json('Auth worked.')
})

app.get('/:shortUrl', middleware.isLoggedIn, async (req, res) => {
    const shortUrlCode = req.params.shortUrl
    const [url] = await dbService.findUrlForAlias(shortUrlCode)

    try {
        if (url.length !== 0) {
            return res.redirect(url.longUrl)
        } else {
            
          return res.status(400).json('The short url doesn\'t exists in our system.')
        }
    }
    catch (err) {
        console.error('Error while retrieving long url for shorturlcode ' + shortUrlCode)
        return res.status(500).json('There is some internal error.')
    }
})

app.post(['/url/*/alias/:alias', '/url/*'], middleware.isLoggedIn, async (req, res) => {
  const url = req.params[0]
  const alias = req.params.alias
  const isUrlValid = validateUrl(url)

  if (alias !== undefined && alias.length > 10) {
    res.status(400).json('Alias is longer than 10 characters.')
    return null
  }

  if (isUrlValid) {
    await dbService.createAliasForUrl(url, alias)
    res.status(200).json('Worked fine.')
  } else {
    res.status(500).json('/url/*/alias/:alias failed.')
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app
