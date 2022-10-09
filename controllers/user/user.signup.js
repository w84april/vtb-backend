const e = require('express');
const Router = e.Router();
const { check, validationResult } = require('express-validator');
const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const { register } = require('../../externalApi');

const postUser = Router.post(
  '/signup',
  check('firstName').isString(),
  check('lastName').isString(),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()[0].msg });
      }

      const { firstName, lastName } = req.body;

      const keys = await register();
      const userCreate = await User.create({
        firstName,
        lastName,
        privateKey: keys.privateKey,
        publicKey: keys.publicKey,
      });

      const token = jwt.sign({ id: userCreate.id, role: userCreate.role }, process.env.SECRET, {
        expiresIn: 3000000000,
      });

      res.send({
        token,
        result: {
          id: userCreate.id,
          role: userCreate.role,
          privateKey: keys.privateKey,
          publicKey: keys.publicKey,
        },
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
);
module.exports = postUser;
