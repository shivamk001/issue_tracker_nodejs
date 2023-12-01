const mongoose=require('mongoose');


//mongodb cluster
const mongodb=process.env.MONGOOSEDB
mongoose.connect(mongodb).
catch(error => console.error(error));

const db=mongoose.connection;

db.on('error', function(){console.error('Error connecting to db')});

db.once('open', function(){
    console.log('Successfully connected to db!');
})