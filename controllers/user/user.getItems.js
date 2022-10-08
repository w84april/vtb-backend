const e = require('express');
const Router = e.Router();
const { User } = require('../../models');
const { validationResult } = require('express-validator');
const fetch = require('node-fetch');

const authorization = require('../../authorization');
const { getUserItems, getNftInfo } = require('../../externalApi');
const getGatewayUrl = require('../../utils');
const getItems = Router.get('/items', authorization, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findOne({
      where: { id: res.locals.id },
    });
    const address = user.dataValues.publicKey;
    const userItems = await getUserItems(address);
    const tokenIds = userItems.balance.map(item => [...item.tokens]).flat();
    const rawNfts = await Promise.all(
      tokenIds.map(tokenId => {
        return getNftInfo(tokenId);
      }),
    );
    console.log(rawNfts);
    const newNfts = await Promise.all(
      rawNfts.map(async nft => {
        const res = await fetch(getGatewayUrl(nft.uri));
        const metadata = await res.json();
        console.log(metadata);
        return { ...nft, metadataUrl: getGatewayUrl(nft.uri), imageUrl: getGatewayUrl(metadata.imageUrl), power: metadata.power, type: metadata.type };
      }),
    );
    res.send(newNfts);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});
module.exports = getItems;
