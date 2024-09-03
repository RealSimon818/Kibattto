require('dotenv').config();
const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require("ejs");
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const { google } = require('googleapis');


const app = express();


app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.json());

console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('CLIENT_ID:', process.env.CLIENT_ID);
console.log('CLIENT_SECRET:', process.env.CLIENT_SECRET);
console.log('REDIRECT_URI:', process.env.REDIRECT_URI);
console.log('REFRESH_TOKEN:', process.env.REFRESH_TOKEN);
console.log('RECEIVER_EMAIL:', process.env.RECEIVER_EMAIL);
console.log('SENT_EMAIL:',process.env.SENT_EMAIL);

// Directly include your configuration values here
const MONGO_URI = process.env.MONGO_URI
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN
const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL

// Connect to MongoDB using Mongoose
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Define a schema and model for contact submissions
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phoneNumber: String,
    subject: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendMail = async (name, email, phoneNumber, subject, message) => {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: RECEIVER_EMAIL,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        const mailOptions = {
            from: `kibatufoundation.com`,
            to: process.env.SENT_EMAIL,//where the email will be sent
            subject: ' Kibatu foundation New Form Submission',
            text: `Name: ${name}\nEmail: ${email}\nPhone Number: ${phoneNumber}\nSubject: ${subject}\nMessage: ${message}`,
        };

        const result = await transporter.sendMail(mailOptions);
        return result;
    } catch (error) {
        console.error('Failed to send email:', error); // Log detailed error information
        throw new Error('Failed to send email');
    }
};


app.get("/contact", function (req, res) {
    res.render('Contact');
  });

  app.get("/", function (req, res) {
    res.render('home');
  });

  app.get("/gallery", function (req, res) {
    res.render('Gallery');
  });

  app.get("/Donate", function (req, res) {
    res.render('Donate');
  });
  app.get("/Programs", function (req, res) {
    res.render('Programs');
  });
  app.get("/About", function (req, res) {
    res.render('About');
  });

  app.post('/contact', async (req, res) => {
    const { name, email,phoneNumber, subject, message } = req.body;

    try {
        const contact = new Contact({ name, email, phoneNumber, subject, message });
        await contact.save();
        await sendMail(name, email, phoneNumber, subject, message);
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error occurred:', error); // Log the error
        res.status(500).json({ message: 'Failed to send message', error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
  
