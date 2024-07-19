const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
const nodemailer = require('nodemailer');
require('dotenv').config();


const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};
let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, 
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});



// Secret key for JWT
const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET;

exports.handler = async (event) => {

    try{
      const {name, email, mobile, message, subject} = JSON.parse(event.body);

        const connection = await mysql.createConnection(dbConfig);

        try {
          await connection.execute('INSERT INTO CONTACT_SUBMISSIONS (name, email ,phone, message, subject, status) VALUES (?, ?, ? , ?, ?, ?)',[name, email, mobile,message,subject, "open"]);
          let mailOptions = {
            from: process.env.EMAIL_USER,
            to: `${process.env.CONTACT_EMAIL},${process.env.EMAIL_USER}`, 
            subject: `Contact Submission : ${subject}`, 
            text: `Name :  ${name}\nEmail : ${email}\nMobile : ${mobile} \n\n${message} ` 
          };
            await transporter.sendMail(mailOptions);
          return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email Sent' }),
          };
        } catch (error) {
          return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message, error: error.message }),
          };
        } finally {
          await connection.end();
        }

    } catch(err){
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Something went wrong' }),
      };
    }
};
