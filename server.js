const { animals } = require('./data/animal.json'); //creating the route that front-end can request from
const express = require('express'); //reqired package
const PORT = process.env.PORT || 3001;
const app = express(); //To instantiate the server
function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    // Note that we save the animalsArray as filteredResults here:
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
      // Save personalityTraits as a dedicated array.
      // If personalityTraits is a string, place it into a new array and save.
      if (typeof query.personalityTraits === 'string') { //why do we use typeof ?
        personalityTraitsArray = [query.personalityTraits];
      } else {
        personalityTraitsArray = query.personalityTraits;
      }
      // Loop through each trait in the personalityTraits array:
      personalityTraitsArray.forEach(trait => { //purpose of forEach ?
        // Check the trait against each animal in the filteredResults array.
        // Remember, it is initially a copy of the animalsArray,
        // but here we're updating it for each trait in the .forEach() loop.
        // For each trait being targeted by the filter, the filteredResults
        // array will then contain only the entries that contain the trait,
        // so at the end we'll have an array of animals that have every one 
        // of the traits when the .forEach() loop is finished.
        filteredResults = filteredResults.filter(
          animal => animal.personalityTraits.indexOf(trait) !== -1 // ? Could not understand it 
        );
      });
    }
    if (query.diet) {
      filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
      filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
      filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    // return the filtered results:
    return filteredResults;
  }
    app.get('/api/animals', (req, res) => { //adding the route (get requires two arguments a) string that describes the route b) callback fn)
        let results = animals;
        if (req.query) { //request has a property for the request query string, parameter, body
            results = filterByQuery(req.query, results);
        }
        res.json(results); //using send mthod from res parameter which is response to send the string to client
    });
    app.listen(PORT, () => {
        console.log(`API server now on port ${PORT}!`); //listen to request
    });