const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

const allowedOrigin = 'http://127.0.0.1:5500';

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin: allowedOrigin,
  credentials: true 
}));

const secretKey = 'YourSecretKey';
app.post('/login', (req, res) => {
  // In a real application, you would validate the user's credentials here.
  // If the credentials are valid, you can generate a JWT and set it as a cookie.
  const user = { id: 1, username: 'exampleuser' };
  const token = jwt.sign({ user }, secretKey);

  res.cookie('token', token, { httpOnly: true, maxAge: 60 * 1000,  secure: true }); // 1 minute

  res.json({ success: true, token });
});

app.get('/profile', (req, res) => {

  console.log(req.headers['authorization']);
  // const token = req.headers[cookie].token;

  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ success: false, message: 'no token' });
  }
  const token2 = token.split(' ')[1];
  jwt.verify(token2, secretKey, (err, user) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'not able to verify' });
    }

    res.json({ success: true, user: user.user });
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
