exports.handler = async () => {
    return {
      statusCode: 200,
      headers: {
        'Set-Cookie': 'accessToken=; HttpOnly; Secure; Path=/; Max-Age=0'
      },
      body: JSON.stringify({ message: 'Logged out', success: true })
    };
  };
  