const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use Gmail or configure SMTP host/port
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD, // App Password, not login password
    },
  });

  // Define email options
  const mailOptions = {
    from: `"GoodNotes Support" <${process.env.EMAIL_USERNAME}>`,
    to: options.email,
    subject: options.subject,
    html: options.message, // Use HTML for better looking emails
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
