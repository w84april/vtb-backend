const e = require('express');
const Router = e.Router();
const { Product } = require('../../models');
const { query, validationResult } = require('express-validator');
const amountOfTasks = 10;
const authorization = require('../../authorization');

const get = Router.get('/product', authorization, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const items = await Product.findAndCountAll({
      limit: amountOfTasks,
      offset: 0,
    });

    res.send(items);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});
module.exports = get;
