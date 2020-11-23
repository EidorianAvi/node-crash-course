const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog')


// express app
const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://EidorianAvi:test1234@cluster0.4fnkg.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((results) => app.listen(3000))
  .catch((err) => console.log(err));


  // register view engine
app.set('view engine', 'ejs');

// listen for requests
// app.listen(3000)


//middleware
// app.use((req, res, next) => {
  //   console.log('new request made:');
  //   console.log('host: ', req.hostname);
  //   console.log('path: ', req.path);
  //   console.log('method: ', req.method);
  //   next();
  // });
  
  // app.use((req, res, next) => {
    //   console.log('in the next middleware');
    //   next();
    // });

// middleware & static files

app.use(express.static('publlic'));
app.use(morgan('dev'));

//mongoose and mongo sandbox routes
//  app.get('/add-blog', (req, res) => {
//   const blog = new Blog({
//     title: 'new blog',
//     snippet: 'about my new blog',
//     body: 'more about my new blog',
//   });

//   blog.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => {
//       console.log(err)
//     })
//  })

//  app.get('/all-blogs', (req,res) => {
//    Blog.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//  })

//  app.get('/single-blog', (req, res) => {
//    Blog.findById("5fbc411321f8b81ff3154e02")
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//  })


// app.set('views', 'myviews');
app.get('/', (req, res) => {
  // const blogs = [
  //   {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  //   {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  //   {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  // ];
  // res.render('index', { title: 'Home', blogs });
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

//blog routes

app.get('/blogs', (req, res) => {
    Blog.find()
      .then((result) => {
        res.render('index', { title: 'All Blogs', blogs: result })
      })
      .catch((err) => {
        console.log(err);
      })
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});