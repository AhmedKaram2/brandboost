const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Configure your email transport (using Gmail as example)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '1ahmedkaram1@gmail.com', // Replace with your Gmail address
    pass: 'dpnusznpqebkfyax' // Set to your Gmail App Password
  }
});

app.post('/api/send-email', async (req, res) => {
  console.log('Received body:', req.body);
  const { name, email, phone, plan } = req.body;
  console.log('name:', name, 'email:', email, 'phone:', phone, 'plan:', plan);
  if (!name || !email || !phone || !plan) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await transporter.sendMail({
      from: email,
      to: '1ahmedkaram1@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nSelected Plan: ${plan}`
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
}); 