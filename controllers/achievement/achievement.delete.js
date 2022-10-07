const e = require('express');
const Router = e.Router();
const { Achievement } = require('../../models');
const authorization = require('../../authorization');
const { query, validationResult } = require('express-validator');
const remove = Router.delete('/achievement', query('role').isNumeric(), query('id').isString(), authorization, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const role = Number(req.query.role);
    const itemToBeDeleted = await Achievement.findOne({
      where: { id: req.query.id },
    });

    if (role !== 1 && itemToBeDeleted.owner !== res.locals.id) {
      throw new Error(`You don't have permission to do that`);
    }
    itemToBeDeleted.destroy();
    res.send(itemToBeDeleted);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

module.exports = remove;
