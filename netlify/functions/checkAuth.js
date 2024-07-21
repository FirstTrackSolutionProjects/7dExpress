const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

require('dotenv').config();
exports.handler = async (event) => {
try{
  const cookies = event.headers.cookie;
  const accessToken = cookies.split('; ').find(row => row.startsWith('accessToken')).split('=')[1];

  if (!accessToken) {
    return {
      statusCode: 401,
      body: JSON.stringify({ authenticated: false })
    };
  }

  const connection = await mysql.createConnection(dbConfig);

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const [user] = await connection.execute("SELECT * FROM USERS  WHERE email = ?",[decoded.email])
    const emailVerified = user[0].emailVerified;
    const admin = decoded.admin;
    const verified = user[0].isVerified;
    const name = decoded.name;
    const businessName = decoded.business_name;
    const id = user[0].uid;
    const email = decoded.email;
    const [userData] = await connection.execute("SELECT * FROM USER_DATA Where uid = ?",[id])
    const photo = userData.length?userData[0].selfie_doc:null
    return {
      statusCode: 200,
      body: JSON.stringify({ authenticated : true, emailVerified, admin, verified, name, businessName, id, email, photo})
    };
  } catch (err) {
    return {
      statusCode: 402,
      body: JSON.stringify({ authenticated: false })
    };
  } finally {
    await connection.end();
  }
} catch (err) {
    return {
        statusCode: 403,
        body: JSON.stringify({ authenticated: false })
    };
}
};
