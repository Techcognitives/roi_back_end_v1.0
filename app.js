const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./api/routes/users');


//console.log("env....."+process.env.MONGO_ATLAS_PW)
//console.log("secreate....."+process.env.SECRETE);

//mongodb+srv://node-rest:'+process.env.MONGO_ATLAS_PW+'@cluster0-gkc2s.mongodb.net/test?retryWrites=true
//mongoose.connect('mongodb+srv://node-rest:'+process.env.MONGO_ATLAS_PW+'@cluster0-gkc2s.mongodb.net/ROI?retryWrites=true',

mongoose.connect('mongodb+srv://techcognitives:cognitives@cluster0.temzg.mongodb.net/ROI?retryWrites=true&w=majority',
{
    useNewUrlParser: true
});
mongoose.Promise =global.Promise;

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    next();
    // if(req.method === 'OPTIONS') {
    //     res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    //     return res.status(200).json({});
    // }
});


app.use('/users', userRoutes)

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status(404);
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });

});
module.exports = app;