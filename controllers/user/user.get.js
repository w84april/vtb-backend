const e = require('express');
const Router = e.Router();
const { User } = require('../../models');
const { validationResult } = require('express-validator');

const authorization = require('../../authorization');
const getUser = Router.get('/user', authorization, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findOne({
      where: { id: res.locals.id },
    });
    const { id, firstName, lastName, fatherName, publicKey, role, armor, firstWeapon, secondWeapon, helmet } = user;

    res.send({ id, firstName, lastName, fatherName, publicKey, role, armor, firstWeapon, secondWeapon, helmet });
  } catch (err) {
    return res.status(400).send(err.message);
  }
});
module.exports = getUser;
