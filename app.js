const express = require("express")
const mongoose = require('mongoose');
const moment = require('moment');
const app = express();
const port = 3000;
let day = moment().format('D/M/Y');
let ocloke = moment().format('LT');
const dataS = require('./models/datashcema');
var methodOverride = require("method-override")

app.use(methodOverride("_method"))
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// get requst
app.get('/', (req, res) => {

    dataS.find()
        .then((result) => {
            res.render("index", { arr: result });

        })
        .catch((error) => {
            console.error(error);
        });
});



app.get('/adduser', (req, res) => {
    res.render("AllPage/adduser.ejs", {})
})

app.get('/view/:id', (req, res) => {
    dataS.findById(req.params.id)
    .then((result) =>{

        res.render("AllPage/view.ejs", { arr: result, })
    })
    .catch((err) =>{
        console.log(err)
    })
    
});

app.put('/edit/:id', (req, res) => {
    dataS.findByIdAndUpdate(req.params.id, req.body)
    .then(() =>{
        res.redirect("/");
    })
    .catch((err) =>{
        console.log(err)
    })
    console.log(req.body)
});


app.get('/addinvoice', (req, res) => {
    res.render("AllPage/addinvoice.ejs")
})

// post requst
app.post("/adduser", (req,res) =>{

    dataS.create(req.body)
    .then((newuser) =>{
        res.redirect(`/view/${newuser._id}`)
    })
    .catch((err) =>{
    })

})

app.post('/search', (req, res) => {

    
    const searchtext = req.body.textsearch
    dataS.find({$or: [{ name:searchtext }, { addres:searchtext }]})
        .then((result) => {
            res.render("AllPage/search.ejs",{user: result, textsearch:searchtext});
            console.log(result)
        })
        .catch((error) => {
            console.error(error);
        });
});


mongoose.connect("mongodb+srv://zaindiv:SK7A2fOZbLeJ08Ix@cluster0.32r5dqe.mongodb.net/all-data?retryWrites=true&w=majority")
    .then(() => {
        app.listen(port, () => {
            console.log(`http://localhost:${port}/`)
        })
    })
    .catch(() => {

    })