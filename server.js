require('dotenv').config();

const express = require('express');
const cors = require('cors'); 
const nodemailer = require('nodemailer'); 
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 4575; // Use Vercel's port in production

app.use(cors());
app.use(bodyParser.json());

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
    console.log(`Server is running on port ${PORT}`);
});
