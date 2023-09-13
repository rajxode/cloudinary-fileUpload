
// for env variables
require('dotenv').config();

// express
const express = require('express');

// import cloudinary for uploading image
const cloudinary = require('cloudinary').v2;

// port value for localhost
const {PORT} = process.env;

// app 
const app = express();

// config of cloudinary to upload images
cloudinary.config({
    cloud_name:process.env.CLOUDNAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})

// for uploading files
const fileUpload = require('express-fileupload');

// setting up ejs 
app.set('view engine' ,'ejs');

// for json data
app.use(express.json());

// for data passed inside the url
app.use(express.urlencoded({extended:true}));

// to upload files
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
}))


// render homepage
app.get('/',(req,res) => {
    res.send('Welcome to file upload project');
})

// render getForm { for getting data }
app.get('/getForm',(req,res) => {
    res.render('getForm');
})


// render post form { for posting data }
app.get('/postForm',(req,res) => {
    res.render('postForm');
})


// render page for uploading multiple images
app.get('/postMultiForm',(req,res) => {
    res.render('postMultiImages');
})

 

//  getting data entered inside the getForm
app.get('/getFormData', (req,res) => {
    res.send(req.query);
})


// post data and a single image on cloudinary
app.post('/postFormData', async (req,res) => {

    // getting uploaded file from frontend
    let file = req.files.sampleFile;

    // uploading image on cloudinary
    const result = await cloudinary.uploader.upload(file.tempFilePath,{
        folder:process.env.FOLDER
    });

    // return res
    res.send(req.body);
})


// for uploading multiple images on cloudinary
app.post('/postMultiImage', async (req,res) => {
    
    // result for single uploaded image
    let result;
    // array of all the uploaded image
    let imageArray = [];

    // checking whether there is any image in req
    if(req.files){

        // map over each image in array and upload on cloudinary
        for(let i = 0; i < req.files.sampleFile.length; i++){

            // uploading 
            result = await cloudinary.uploader.upload(req.files.sampleFile[i].tempFilePath, {
                folder: process.env.FOLDER
            })

            // push result of uploaded image in array
            imageArray.push({
                public_id:(await result).public_id,
                secure_url: (await result).secure_url
            })
        }
    }

    // display the array of uploaded image result
    console.log(imageArray);
    res.send('file uploaded');
})


// fire up the server
app.listen(PORT,() => console.log(`server is running on port: ${PORT}`));

