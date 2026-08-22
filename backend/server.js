const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const PORT = process.env.PORT || 3000;

const resend = new Resend(process.env.RESEND_API_KEY);

// Allow requests from both the Netlify frontend and the Render-served frontend
const allowedOrigins = [
    "https://priyanshi-vishwakarma-portfolio.netlify.app",
    "https://priyanshi-portfolio-website-1.onrender.com"
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like Postman, curl, or same-origin requests)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend
app.use(express.static(path.join(__dirname, "..")));

// Contact Form API
app.post("/api/contact", async (req, res) => {

    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "Please fill all required fields."
        });
    }

    try {

        const { data, error } = await resend.emails.send({
            from: "Portfolio <onboarding@resend.dev>",
            to: [process.env.EMAIL_USER],
            replyTo: email,
            subject: subject
                ? `Portfolio Contact: ${subject}`
                : `Portfolio Contact: Message from ${name}`,

            html: `
                <h2>New Portfolio Contact</h2>

                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
                <p><strong>Subject:</strong> ${subject || "Not provided"}</p>

                <h3>Message</h3>
                <p>${message}</p>
            `
        });

        if (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Failed to send message."
            });
        }

        console.log("Email Sent:", data);

        res.status(200).json({
            success: true,
            message: "Thank you for your message, Priyanshi will get back to you soon!"
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: "Failed to send message."
        });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
