const jwt = require('jsonwebtoken');

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

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const emailVerified = decoded.emailVerified;
    const admin = decoded.admin;
    const verified = decoded.verified;
    const name = decoded.name;
    const businessName = decoded.business_name;
    const id = decoded.id;
    const email = decoded.email;
    return {
      statusCode: 200,
      body: JSON.stringify({ authenticated : true, emailVerified, admin, verified, name, businessName, id, email})
    };
  } catch (err) {
    return {
      statusCode: 401,
      body: JSON.stringify({ authenticated: false })
    };
  }
} catch (err) {
    return {
        statusCode: 401,
        body: JSON.stringify({ authenticated: false })
    };
}
};
