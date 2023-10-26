const express=require('express')
const path=require('path')
const expressLayouts=require('express-ejs-layouts')
const port=8000

const app=express()

app.use(express.urlencoded())
//to get req.body in the req object
app.use(express.json());

//mongodb
require('./config/mongoose')

//template engine
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static('assets'))
app.set('layout extractScripts', true)
app.set('layout extractStyles', true)

app.use('/',  require('./routes'))

app.listen(port, function(err){
    if(err){
        console.log(err);
    }
    console.log(`Success running: ${port}`);
})