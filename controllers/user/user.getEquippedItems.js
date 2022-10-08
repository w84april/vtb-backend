const e = require('express');
const Router = e.Router();
const { User } = require('../../models');
const { validationResult } = require('express-validator');
const fetch = require('node-fetch');

const authorization = require('../../authorization');
const { getUserItems, getNftInfo } = require('../../externalApi');
const getGatewayUrl = require('../../utils');
const getEquippedItems = Router.get('/items/equipped', authorization, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findOne({
      where: { id: res.locals.id },
    });

    const { helmet, armor, firstWeapon, secondWeapon } = user.dataValues;
    console.log(helmet, armor, firstWeapon, secondWeapon);
    const equippedItems = await Promise.all(
      [helmet, armor, firstWeapon, secondWeapon].map(item => {
        return getNftInfo(item);
      }),
    );
    const filteredItems = equippedItems.filter(item => item);
    const newNfts = await Promise.all(
      filteredItems.map(async nft => {
        const res = await fetch(getGatewayUrl(nft.uri));
        const metadata = await res.json();
        return { ...nft, metadataUrl: getGatewayUrl(nft.uri), imageUrl: getGatewayUrl(metadata.imageUrl), power: metadata.power, type: metadata.type };
      }),
    );

    res.send(newNfts);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});
module.exports = getEquippedItems;
