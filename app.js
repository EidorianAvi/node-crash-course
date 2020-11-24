const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');


// express app
const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://EidorianAvi:test1234@cluster0.4fnkg.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((results) => app.listen(3000))
  .catch((err) => console.log(err));


  // register view engine
app.set('view engine', 'ejs');


// middleware & static files

app.use(express.static('publlic'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));




// app.set('views', 'myviews');
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.use('/blogs', blogRoutes);

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

