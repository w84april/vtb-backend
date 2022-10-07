const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(403).json({ error: 'Unauthorized' });
  let payload;
  try {
    payload = jwt.verify(token, process.env.SECRET);
  } catch (e) {
    return res.status(403).json({ error: e.message });
  }
  res.locals.id = payload.id;
  res.locals.role = payload.role;
  next();
};
