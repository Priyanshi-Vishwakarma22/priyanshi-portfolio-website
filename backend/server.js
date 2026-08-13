const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend
app.use(express.static(path.join(__dirname, "..")));

// Gmail transporter
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        family: 4
    }
});
// Check Gmail connection
transporter.verify((error, success) => {
    if (error) {
        console.error("❌ GMAIL CONNECTION ERROR:");
        console.error(error);
    } else {
        console.log("✅ GMAIL SERVER READY");
    }
});

// Contact form API
app.post("/api/contact", async (req, res) => {

    const {
        name,
        email,
        phone,
        subject,
        message
    } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "Please fill all required fields."
        });
    }

    try {

        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: process.env.EMAIL_USER,

            replyTo: email,

            subject: subject
                ? `Portfolio Contact: ${subject}`
                : `Portfolio Contact: Message from ${name}`,

            text: `
Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Subject: ${subject || "Not provided"}

Message:
${message}
            `
        });

        console.log("✅ EMAIL SENT SUCCESSFULLY");

        res.status(200).json({
            success: true,
            message: "Thank you for your message, Priyanshi will get back to you soon!"
        });

    } catch (error) {

        console.error("❌ EMAIL ERROR:");
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to send message. Please try again later."
        });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});