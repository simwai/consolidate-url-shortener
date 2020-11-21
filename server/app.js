require('dotenv').config()

const express = require('express')
const cors = require('cors')
const validateUrl = require('url-validator')
const jwt = require('jsonwebtoken')

const { DbService } = require('./db-service')

const dbService = new DbService()
const app = express()
const port = 1000

app.use(cors()).use(express.json())

// TODO find out how to use authenticationToken() here, username and password at setURLAlias() will be necessary
app.get('/:shortUrl', async (req, res) => {
    // authenticated user -> console.log(req.user.name)

    const shortUrlCode = req.params.shortUrl

    let url

    try {
      [url] = await dbService.findUrlForAlias(shortUrlCode)
    } catch (error) {
      return sendInternalErrorResponse(res, error)
    }

    if (url.length !== 0) res.redirect(301, url[0].url)
    else res.status(400).json('The short url doesn\'t exists in our system.')
})

app.post(['/url/*/alias/:alias', '/url/*'], async (req, res) => {
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

app.post('/login', async (req, res) => {
  // authenticates user
  const username = { name: req.body.username }
  const password = req.body.password

  let passwordFromDb

  try {
    [[passwordFromDb]] = await dbService.findPasswordForUsername(username.name)
    passwordFromDb = passwordFromDb?.password
  } catch (error) {
    return sendInternalErrorResponse(res, error)
  }

  if (passwordFromDb != null) {
    if (password === passwordFromDb) {
        // creates accessToken for each user
      const accessToken = jwt.sign(username, process.env.ACCESS_TOKEN_SECRET)
      res.json({ accessToken: accessToken })
    } else {
      res.sendStatus(403)
    } 
  } else sendInternalErrorResponse(res, 'Wrong password')
})

app.post('/validateToken', authenticateToken, (_req, res) => {
  res.status(200).json('Access token is correct') 
})

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader?.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) return res.sendStatus(403)
    req.user = user
    next() 
  })
}

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

function sendInternalErrorResponse(res, error) {
  // TODO rework error handling, false password is not internal error
  if (error !== undefined) console.error('Internal error: ' + error)
  else console.error('Internal error')

  return res.status(500).json('There is some internal error.')
}