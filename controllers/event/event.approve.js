const e = require('express');
const Router = e.Router();
const { check, validationResult, Result } = require('express-validator');
const { Event } = require('../../models');
const { approve } = require('../../externalApi/index');
const { User_Event: UserEvent, User } = require('../../models');
const pinFileAndMetadata = require('../../pinata/index');

const approveEvent = Router.post('/event/approve', async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array()[0].msg });
    }

    const { userId, eventId, approve: approveType } = req.body;

    await UserEvent.update(
      { approve: approveType },
      {
        where: {
          UserId: userId,
          EventId: eventId,
        },
      },
    );

    if (approveType === 'accepted') {
      const currentUser = User.findOne({
        where: {
          id: userId,
        },
      });
      const metadata = await pinFileAndMetadata();
      const txHash = await approve(currentUser?.publicKey, metadata);

      return res.json({
        txHash,
        status: true,
      });
    }

    if (approveType === 'reject') {
      return res.json({
        status: true,
      });
    }

    return res.json({
      status: false,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = approveEvent;
