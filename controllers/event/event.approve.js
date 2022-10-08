const e = require('express');
const Router = e.Router();
const { check, validationResult, Result } = require('express-validator');
const { Event } = require('../../models');
const { approve } = require('../../externalApi/index');

const approveEvent = Router.post('/event/approve', async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array()[0].msg });
    }

    const { address } = req.body;
    console.log(address);
    const txHash = await approve(address);

    res.json({
      txHash,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = approveEvent;
