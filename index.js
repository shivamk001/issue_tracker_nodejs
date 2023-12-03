const express=require('express')
const path=require('path')
const passport=require('passport');
const session=require('express-session')
const MongoStore=require('connect-mongo')
const expressLayouts=require('express-ejs-layouts')
const flash = require('connect-flash');
require('dotenv').config()


const app=express()

//json and read form data
app.use(express.urlencoded())
//to get req.body in the req object
app.use(express.json());


//template engine
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static('assets'))
app.set('layout extractScripts', true)
app.set('layout extractStyles', true)

//mongodb
require('./config/mongoose')

//passport
//session
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl:'mongodb+srv://shivamk001:4gtBAfKze5K1D2wJ@cluster0.r6rocwl.mongodb.net/issueTracker?retryWrites=true&w=majority'
    })
}))
app.use(passport.authenticate('session'));
app.use(flash());

app.use('/',  require('./routes'))


app.use((err, req, res, next)=>{
    console.log('Error in err handler:', err, req.user)
    return res.render('errorsPage', {message: err.message, statusCode: 500, page:'error', author: req.user})
})

const port=process.env.PORT||8000
app.listen(port, function(err){
    if(err){
        console.log(err);
    }
    console.log(`Success running: ${port}`);
})