const e = require('express');
const Router = e.Router();
const { check, validationResult, Result } = require('express-validator');
const { User } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const postUser = Router.post(
  '/login',

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()[0].msg });
      }

      const user = await User.findOne({
        where: { privateKey: req.body.privateKey },
      });

      if (!user) throw new Error("User with such private key doesn't exist");

      // if (!bcrypt.compareSync(req.body.password, user.password)) throw new Error('Wrong username/password');
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.SECRET, {
        expiresIn: 3000000000,
      });

      res.json({
        token,
        result: {
          id: user.id,
          role: user.role,
          name: user.firstName + ' ' + user.lastName,
        },
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
);
module.exports = postUser;
