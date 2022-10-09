const e = require('express');
const Router = e.Router();
const { validationResult } = require('express-validator');
const { User_Event: UserEvent } = require('../../models');

const getDoneUserEvents = Router.get('/user-events', async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const events = await UserEvent.findAll({
      where: {
        done: true,
      },
    });
    const formattedEvents = events.map(event => event.dataValues);

    res.send(formattedEvents);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});
module.exports = getDoneUserEvents;
