const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route to handle contact form submissions
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Create a nodemailer transporter using your email provider's SMTP settings
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '*********@gmail.in',
            pass: '********',
        },
    });

    // Define the email content
    const mailOptions = {
        from: '*********@gmail.in',
        to: '*********@gmail.in',
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
