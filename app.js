const express = require('express');

//expres app

const app = express();

// listen for requests 

app.listen(3000);

app.get('/', (req, res) =>{
    // res.send('<p>home page</p>');
});

app.get('/about', (req, res) =>{
    // res.send('<p>about page</p>');
});