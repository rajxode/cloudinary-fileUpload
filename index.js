
require('dotenv').config();
const express = require('express');

const {PORT} = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res) => {
    res.send('welcome');
})

app.listen(PORT,() => console.log(`server is running on port: ${PORT}`));

