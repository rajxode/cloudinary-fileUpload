
require('dotenv').config();
const express = require('express');

const cloudinary = require('cloudinary').v2;

const {PORT} = process.env;

const app = express();

cloudinary.config({
    cloud_name:process.env.CLOUDNAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})

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

app.get('/postMultiForm',(req,res) => {
    res.render('postMultiImages');
})

app.get('/getFormData', (req,res) => {
    res.send(req.query);
})

app.post('/postFormData', async (req,res) => {
    let file = req.files.sampleFile;
    const result = await cloudinary.uploader.upload(file.tempFilePath,{
        folder:process.env.FOLDER
    });
    res.send(req.body);
})


app.post('/postMultiImage', async (req,res) => {
    let result;
    let imageArray = [];

    if(req.files){
        for(let i = 0; i < req.files.sampleFile.length; i++){
            result = await cloudinary.uploader.upload(req.files.sampleFile[i].tempFilePath, {
                folder: process.env.FOLDER
            })

            imageArray.push({
                public_id:(await result).public_id,
                secure_url: (await result).secure_url
            })
        }
    }

    console.log(imageArray);
    res.send('file uploaded');
})

app.listen(PORT,() => console.log(`server is running on port: ${PORT}`));

