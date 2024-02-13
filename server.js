const express = require('express')
const cors = require('cors')
const app = express()
// const AnimeWord = require('./models/words.js');
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
});


const contactSchema = new mongoose.Schema({
    name: String,
    people: Number,
    date: Date,
    message: String
})

const Contact  = mongoose.model("COntact", contactSchema)

// homepage
app.get('/', (req, res) => {
    res.render('index.html')
})

// Handle form submission request
app.post('/submit', async (req, res) => {
    const formData = {
        name: req.body.name, 
        people: req.body.People,
        date: new Date(req.body.date),
        message: req.body.Message
        } 
        try {
            const newContact = new Contact(formData)
            await newContact.save()
            res.redirect('/?success')
        } catch  (error) {
            res.redirect('/?error')
        }
    }) 

 
// delete a wpord
// app.get('/delete', (req, res) => { 
//     res.render('delete')
// })
// app.post('/delete', (req, res) => { 
//   console.log(req.body)
//   let word = req.body.animeWord
//   AnimeWord.deleteOne(
//         {animeWord: word}, 
//       ) .then(() => {
//         console.log("Successfully deleted word")
//          res.redirect("/words")
//        }).catch(error => {
//          res.send(error)
//          console.error(error)}) 
//     }) 
    





app.listen(4000, () => {
    console.log('Connected to port 4000');
})



