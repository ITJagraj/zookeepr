const { animals } = require('./data'/animals); //creating the route that front-end can request from
const express = require('express'); //reqired package
const app = express(); //To instantiate the server
app.get('/api/animals', (req, res) => { //adding the route (get requires two arguments a) string that describes the route b) callback fn)
    res.send('Hello!'); //using send mthod from res parameter which is response to send the string to client
})
app.listen(3001, () => {
    console.log(`API server now on port 3001!`); //listen to request
});