const express = require('express')
const cors = require('cors')
const app = express()
const AnimeWord = require('./models/words.js');
const mongoose = require("mongoose");
require('dotenv').config()


// middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(express.static("public"));


// connect to the database
mongoose .connect(process.env.DBCONNECTION)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
  console.log("Connected to MongoDB");
}) 


// homepage
app.get('/', (req, res) => {
    res.render('home')
})

// show all words
app.get('/words', (req, res) => {

// AnimeWord
//   .find() 
//   .then(results => { 
//     // console.log(results)
//      res.render('words',  {words:results})
//     }).catch(error => {
//       res.send(error)
//       console.error(error)})   
})

// add words 
app.get('/add', (req, res) => {
    res.render('add')
})


// add a word
app.post('/word', (req, res) => {
    const word = new AnimeWord ({
        animeWord: req.body.animeWord, 
        meaning: req.body.meaning
        });
        word.save()
        .then(() => {
            console.log('Item succedfully added to the database');
            res.redirect('/words')
            })
        .catch((err) => {
            console.log(err);
        });  
    })


    // show the dashboard
// app.get('/dashboard', (req, res) => {
// res.render('dashboard')
// })

// delete a wpord
app.get('/delete', (req, res) => { 
    res.render('delete')
})
app.post('/delete', (req, res) => { 
  console.log(req.body)
  let word = req.body.animeWord
  AnimeWord.deleteOne(
        {animeWord: word}, 
      ) .then(() => {
        console.log("Successfully deleted word")
         res.redirect("/words")
       }).catch(error => {
         res.send(error)
         console.error(error)}) 
    })
    



// app.delete((req, res) => { 
//   Article.deleteOne(
//     {title: req.params.articleName},
//   ) .then(() => {
//      res.send("Successfully deleted article")
//    }).catch(error => {
//      res.send(error)
//      console.error(error)}) 
// })

app.listen(4000, () => {
    console.log('Connected to port 4000');
})



