"use strict";

const express = require("express");
const app = express();
const fs = require('fs').promises;

// Returns the object containing all songs
app.get('/read/:file', async (req, res) => {
  try {
    let fileName = req.params.file + '.json';
    let contents = await readFile(fileName);
    res.json(contents);
  } catch (err) {
    res.type('text');
    if (err.code === 'ENOENT') {
      res.status(400).send('Not a valid file');
    } else {
      res.status(500).send('Oh no! Something went wrong with the server');
    }
  }
});

// Returns text of the categories in the song object
app.get('/write', async (req, res) => {
  res.type("text");
  try {
    let categories = await songTypes();
    res.send("Your choices are to either " + categories[0] + " or " + categories[1]);
  } catch (err) {
    res.status(500).send('Oh no! Something went wrong with the server');
  }
});

/**
 * reads in the contents of the specified file
 * @param {string} fileName - the name the file containing the data
 * @returns {object} the object's contents
 */
async function readFile(fileName) {
  let obj = await fs.readFile(fileName, 'utf8');
  obj = JSON.parse(obj);
  return obj;
}

/**
 * gets the categories of songs available
 * @returns {Array} returns an array of all song categories
 */
async function songTypes() {
  let fileName = 'songs.json';
  let contents = await readFile(fileName);
  let category = Object.keys(contents);
  return category;
}

app.use(express.static("public"));
const PORT = process.env.PORT || 8000;
app.listen(PORT);