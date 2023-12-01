const mongoose=require('mongoose');


//mongodb cluster
mongoose.connect('mongodb+srv://shivamk001:4gtBAfKze5K1D2wJ@cluster0.r6rocwl.mongodb.net/issueTracker?retryWrites=true&w=majority').
catch(error => console.error(error));

const db=mongoose.connection;

db.on('error', function(){console.error('Error connecting to db')});

db.once('open', function(){
    console.log('Successfully connected to db!');
})