
require('dotenv').config();
const express = require('express');

const {PORT} = process.env;

const app = express();

const fileUpload = require('express-fileupload');

app.set('view engine' ,'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
}))

app.get('/',(req,res) => {
    res.send('Welcome to file upload project');
})

app.get('/getForm',(req,res) => {
    res.render('getForm');
})

app.get('/postForm',(req,res) => {
    res.render('postForm');
})

app.get('/getFormData', (req,res) => {
    res.send(req.query);
})

app.post('/postFormData', (req,res) => {
    console.log(req.files);
    res.send(req.body);
})

app.listen(PORT,() => console.log(`server is running on port: ${PORT}`));

