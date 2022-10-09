const e = require('express');
const Router = e.Router();
const { validationResult } = require('express-validator');
const { User_Event: UserEvent, User, Event } = require('../../models');
const authorization = require('../../authorization');

const getDoneUserEvents = Router.get('/user-events', authorization, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const users = await User.findAll({});
    const ev = await Event.findAll({});

    const events = await UserEvent.findAll({
      where: {
        done: true,
        approve: 'pending'
      },
    });
    const formattedEvents = events.map(event => event.dataValues);

    const respEvents = formattedEvents.map(event => ({
      ...event,
      user: users.find(u => u?.id === event.UserId),
      event: ev.find(e => e?.id === event.EventId)
    }))

    res.send(respEvents);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});
module.exports = getDoneUserEvents;
