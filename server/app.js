const express = require("express");

const app = express.Router();

app.get('/:shortUrl', async (req, res) => {
    const shortUrlCode = req.params.shortUrl;
    const url = findUrlForShortcode()

    try {
        if (url) {
            return res.redirect(url.longUrl);
        } else {
            return res.status(400).json("The short url doesn't exists in our system.");
        }
    }
    catch (err) {
        console.error("Error while retrieving long url for shorturlcode " + shortUrlCode);
        return res.status(500).json("There is some internal error.");
    }
})

module.exports = app;