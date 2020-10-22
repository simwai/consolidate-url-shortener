const express = require('express')
const cors = require('cors')
const validateUrl = require('url-validator')

const { DbService } = require('./db-service')
const dbService = new DbService()

const app = express()
const port = 3000

app.use(cors())
// app.use(cors({ origin: true }))
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT")
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization")

//   next()
// })

app.get('/:shortUrl', async (req, res) => {
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
    res.status(400).json('Worked fine.')
  } else {
    res.status(500).json('/url/*/alias/:alias failed.')
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// function parseUrlAlias(url, res, alias = null) {
//   if (alias !== null && alias.length > 10) {
//     res.status(400).json('Alias is longer than 10 characters.')
//     return null
//   }

//   const urlSplit = url.split('/')

//   if (urlSplit.find(el => el.includes('http'))) {
//     urlSplit.splice(0, 2)

//     url = ''
 
//     let counter = 0
//     for (const urlPart of urlSplit) {
//       if (urlPart === 'alias') break

//       if (counter === 0) url = urlPart + '//'
//       else if (urlPart != '') url +=  urlPart + '/'

//       counter++
//     }

//     url = url.substring(0, url.length - 1)
//   }

//   if (validateUrl(url)) {        
//     res.status(200).json('Worked fine.')
//     return url
//   } else {
//     res.status(400).json('Invalid url')
//     return null
//   }
// }

module.exports = app
