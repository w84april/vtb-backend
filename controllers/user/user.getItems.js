const e = require('express');
const Router = e.Router();
const { User } = require('../../models');
const { validationResult } = require('express-validator');

const authorization = require('../../authorization');
const { getUserItems, getNftInfo } = require('../../externalApi');
const getGatewayUrl = require('../../utils');
const getItems = Router.get('/items', async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const address = req.query.address;
    console.log(address);
    const userItems = await getUserItems(address);
    console.log(userItems);
    const tokenIds = userItems.balance.map(item => [...item.tokens]).flat();
    const rawNfts = await Promise.all(
      tokenIds.map(tokenId => {
        console.log(tokenId);
        return getNftInfo(tokenId);
      }),
    );

    res.send(rawNfts);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});
module.exports = getItems;
