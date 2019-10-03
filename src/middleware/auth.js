const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    const device_token = req.body['deviceToken'];
    const authorization = req.body['authorization'];
    const fingerPrint = req.body['fingerPrint'];
    //const decoded = jwt.verify(device_token, process.env.JWT_SECRET);
    const user = await User.findOne({
      Authorizationtoken: authorization,
      fingerPrint: fingerPrint,
      'tokens.token': device_token
    });
    if (!user) {
      throw new Error();
    }
    req.authToken = authorization;
    req.fingerPrint = fingerPrint;
    req.deviceToken = device_token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'please authenticate' });
  }
};
module.exports = auth;
