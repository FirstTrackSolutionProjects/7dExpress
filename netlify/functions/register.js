const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Database connection
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, 
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }
  
  const { reg_email, reg_password, name, mobile, business_name } = JSON.parse(event.body);
  const hashedPassword = await bcrypt.hash(reg_password, 10);

  const connection = await mysql.createConnection(dbConfig);

  try {
    const [users] = await connection.execute('SELECT * FROM USERS  WHERE email = ?', [reg_email]);
    if (users.length){
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "User is already registered. Please login", success: false}),
      };
    }
    const [user] = await connection.execute('INSERT INTO USERS (businessName, email, password, fullName, phone ) VALUES (?, ?, ?, ?,?)', [business_name, reg_email, hashedPassword, name, mobile]);
    const id = user.insertId;
    const accessToken = jwt.sign({ authenticated: true, email : reg_email , verified : 0, name, id, business_name : business_name, admin : 0, emailVerified: 0, photo : null }, ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
    // const refreshToken = jwt.sign({  email : reg_email , verified : 0, name, id, business_name : business_name, admin : 0, emailVerified : 0  }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: `${reg_email},${process.env.EMAIL_USER},${process.env.VERIFY_EMAIL}`, 
      subject: 'Registration Incomplete', 
      text: `Dear ${name}, \nYour registration on 7D Express is incomplete. Please verify your details to experience robust features of 7D Express. \n\n Regards, \n7D Express`
    };
    await transporter.sendMail(mailOptions)
      return {
        statusCode: 200,
        headers: {
          'Set-Cookie': `accessToken=${accessToken}; HttpOnly; Secure; Path=/; Max-Age=${60*60*24}` ,
        },
        body: JSON.stringify({ message: 'Registration Successfull', success : true, token : accessToken })
      };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message, success: false}),
    };
  } finally {
    await connection.end();
  }
};
