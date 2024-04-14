import express from "express";
import { Resend } from "resend";
import cors from "cors";
import dotenv from "dotenv"; // Import dotenv

//env vars//
dotenv.config();
const PORT = process.env.PORT;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

//vars//
const app = express();
const port = 3000;
const resend = new Resend(RESEND_API_KEY);

// Middleware
//CORS
app.use(cors());
//json
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  const details = {
    METHOD: req.method,
    STATUS: res.statusCode,
    BODY: req.body,
  };

  console.log(details);
  next();
});

// Routes

app.post("/sendMail", async (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  // Email HTML template for contact form submission
  const emailHTML = `
    <html>
      <body style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      </body>
    </html>
  `;
  ///send mail with resend api
  const { data, error } = await resend.emails.send({
    from: "CONTACT<onboarding@resend.dev>",
    to: ["dosomethingwild012712@gmail.com"],
    subject: "New Contact",
    html: emailHTML,
  });

  if (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
  res.status(200).json({ data });
});

// Run server
app.listen(PORT, () => {
  console.log("Server is running on port " + port);
});
