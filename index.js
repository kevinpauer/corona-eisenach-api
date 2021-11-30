const PORT = 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();

const arcticles = [];

app.get('/', (req,res) => {
  res.json("Welcome to my News API");
});

app.get('/news', (req,res) => {
  axios.get("https://www.thueringer-allgemeine.de/regionen/eisenach/").then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);

    $('a:contains("Corona")', html).each(function () {
      const title = $(this).text().replace(/(\r\n|\n|\r|\t)/gm, "").replace(/\s+/g, ' ').trim();
      const url = $(this).attr('href');
      arcticles.push({
        title,
        url
      })
    });
    res.json(arcticles);
  }).catch((err) => console.log(err));
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));