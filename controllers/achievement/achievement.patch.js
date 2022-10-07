const e = require('express');
const Router = e.Router();
const { body, validationResult } = require('express-validator');
const { Achievement } = require('../../models');
const authorization = require('../../authorization');
const patch = Router.patch(
  '/achievement',
  authorization,
  body('id').isString(),
  body('approved').isNumeric(),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      if (res.locals.role !== 1) {
        throw new Error(`You don't have permission to do that`);
      }

      const achievement = await Achievement.findOne({
        where: { id: req.body.id },
      });
      if (!achievement) throw new Error(`Task doesn't exist`);

      const itemToBeEdited = await Achievement.update(
        { approved: req.body.approved },
        {
          where: { id: req.body.id },
          returning: true,
        },
      );
      res.send(itemToBeEdited);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
);

module.exports = patch;
