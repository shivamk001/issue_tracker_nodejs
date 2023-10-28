const mongoose=require('mongoose');

//localhost
// mongoose.connect('mongodb://127.0.0.1:27017/IssueTracker').
// catch(error => console.error(error));


//mongodb cluster
mongoose.connect('mongodb+srv://shivamk001:4gtBAfKze5K1D2wJ@cluster0.r6rocwl.mongodb.net/issueTracker?retryWrites=true&w=majority').
catch(error => console.error(error));

const db=mongoose.connection;

db.on('error', function(){console.error('Error connecting to db')});

db.once('open', function(){
    console.log('Successfully connected to db!');
})