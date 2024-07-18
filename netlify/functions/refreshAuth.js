const jwt = require('jsonwebtoken');

exports.handler = async (event) => {
  const cookies = event.headers.cookie;
  if (!cookies) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized', success: false })
    };
  }
  try{
  const refreshToken = cookies.split('; ').find(row => row.startsWith('refreshToken')).split('=')[1];

  if (!refreshToken) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized', success: false })
    };
  }

  try {
    const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const newAccessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

    return {
      statusCode: 200,
      headers: {
        'Set-Cookie': `accessToken=${newAccessToken}; HttpOnly; Secure; Path=/; Max-Age=900`
      },
      body: JSON.stringify({ message: 'Access token refreshed', success : true })
    };
  } catch (err) {
    return {
      statusCode: 403,
      body: JSON.stringify({ message: 'Forbidden', success : false })
    };
  }
} catch (e){
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid Token', success : false }),
    };
  
}
};
