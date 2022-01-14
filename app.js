const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const notesRoutes =  require('./routes/notesRoutes');
const cookieParser = require('cookie-parser');

const app = express();

dotenv.config({path:'./config.env'});
// app.listen(3000);

// middlewares 
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

const dbURI = process.env.DATABASE;
const Port = process.env.PORT || 5000;

mongoose.connect(dbURI)
    .then((result) => {app.listen(Port); console.log("connected to db and listening at port 5000")})
    .catch((err) => {console.log(err);});

// app.get('/', (req, res) => {
//     res.send("App listenenig at port 5000");
// })

app.use(authRoutes);
app.use(notesRoutes);

if (process.env.NODE_ENV == 'production') {
    app.use(express.static("client/build"));
}