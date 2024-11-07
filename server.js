// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors'); // Import the cors package
const nodemailer = require('nodemailer'); // Assuming you're using nodemailer for sending emails
const bodyParser = require('body-parser');

const app = express();
const PORT = 4575;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // To parse JSON bodies

// POST endpoint for sending emails
app.post('/send', async (req, res) => {
    const { name, email, message } = req.body;

    // Set up the transporter using your email service
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Your email address
            pass: process.env.EMAIL_PASS, // Your app password or email password
        },
    });

    // Define email options
    const mailOptions = {
        from: email,
        to: process.env.RECEIVER_EMAIL, // The receiver's email address
        subject: `Contact from ${name}`,
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to send email');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
