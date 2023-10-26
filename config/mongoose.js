const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/IssueTracker').
catch(error => console.error(error));

const db=mongoose.connection;

db.on('error', function(){console.error('Error connecting to db')});

db.once('open', function(){
    console.log('Successfully connected to db!');
})