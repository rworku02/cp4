/**
 * Name: Rahel Worku
 * Date: 11/03/2022
 * Section: AC, Allison Ho
 *
 * This index.js will get responses from the Song API. The user's response will be used to generate
 * a random song. Based on what option the user picks, the response they'll get back will
 * be different.
 */

'use strict';

(function() {

  window.addEventListener("load", init);

  /**
   * Generates a random song based on the user's preferences
   */
  function init() {
    getOptions();
    qs("button").addEventListener("click", getSongs);
  }

  /**
   * Retrieves all the songs from the song API, and will show their song on the page.
   * Will handle any errors that occur in this process
   */
  function getSongs() {
    fetch('/read/songs')
      .then(statusCheck)
      .then(res => res.json())
      .then(processData)
      .catch(handleError);
  }

  /**
   * Shows the song categories the user can pick from, and will handle errors that
   * occur in this process
   */
  function getOptions() {
    fetch('/write')
      .then(statusCheck)
      .then(res => res.text())
      .then(showOptions)
      .catch(handleError);
  }

  /**
   * Shows the song categories the user may choose from
   * @param {Response} res - the response of the request made
   */
  function showOptions(res) {
    id("available-options").innerHTML = "";
    let info = gen("p");
    info.textContent = res;
    id("available-options").appendChild(info);
  }

  /**
   * Shows the random song generated for the user on the page
   * @param {Response} res - the response of the request made
   */
  function processData(res) {
    let vibe = songCategory();
    let song = randNum(res, vibe);
    id("choice").textContent = "Listen to " + song.song + " by " + song.artist;
  }

  /**
   * Gets a random song from the specified song category
   * @param {Response} res - the response from the song API
   * @param {string} vibe - the chosen song category of the user
   * @returns {object} - returns the song at a random index
   */
  function randNum(res, vibe) {
    let num = 0;
    let type = res[vibe];
    num = type.length;
    return type[Math.floor(Math.random() * num)];
  }

  /**
   * Checks which option was clicked by the for the type of song
   * @returns {string} - returns the type of songs the user wants
   */
  function songCategory() {
    let type = qs('input[name="type"]:checked').value;
    if (type === "chill") {
      type = "chillOut";
    } else {
      type = "cheerUp";
    }
    return type;
  }

  /**
   * Handles errors that occur when handling the response of the request made
   */
  function handleError() {
    let message = gen("p");
    message.textContent = "Sorry, something went wrong";
  }

  /**
   * Checks the status of the response made to the API. Throws an error if the status
   * is not ok.
   * @param {Response} response - Takes in the response of the request made
   * @returns {Response} - Returns the status of the made request
   */
  async function statusCheck(response) {
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return response;
  }

  /**
   * Returns a new created element with the given name.
   * @param {string} tagName - element ID.
   * @returns {object} - DOM object associated with element.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID.
   * @returns {object} - DOM object associated with id.
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * Returns first element matching selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} - DOM object associated selector.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

})();