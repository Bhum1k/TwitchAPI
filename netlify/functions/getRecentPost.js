const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = "https://www.instagram.com/fiathegemini/"

async function getHTML () {
    const { data: html } = await axios.get(url);
    console.log(html);
    return html;
}

getHTML().then((res) => {
    const $ = cheerio.load(res);
})