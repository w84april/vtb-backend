const e = require('express');
const Router = e.Router();
const { check, validationResult, Result } = require('express-validator');
const { Event } = require('../../models');

const equipItem = Router.post(
  '/item/equip',

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()[0].msg });
      }

      const { id, address } = req.body;

      const userItems = await getUserItems(address);
      const isOwning = userItems.find(item => item.token === id);
      if (!isOwning) {
        throw new Error('You dont own this NFT');
      }

      res.json({
        newEvent,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
);

module.exports = equipItem;
