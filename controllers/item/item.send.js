const e = require('express');
const Router = e.Router();
const { check, validationResult, Result } = require('express-validator');
const authorization = require('../../authorization');
const { User } = require('../../models');
const { sendNft } = require('../../externalApi/index');
const sendItem = Router.post('/item/send', authorization, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array()[0].msg });
    }

    const { address, tokenId, tokenType } = req.body;

    const user = await User.findOne({
      where: { id: res.locals.id },
    });

    const { privateKey } = user;
    const data = await sendNft(privateKey, address, tokenId);

    await User.update(
      {
        [tokenType]: null,
      },
      {
        where: {
          id: res.locals.id,
        },
      },
    );

    res.json({
      data,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = sendItem;
