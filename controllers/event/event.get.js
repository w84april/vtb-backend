const e = require('express');
const Router = e.Router();
const { Event } = require('../../models');
const { validationResult } = require('express-validator');
const authorization = require('../../authorization');
const getEvents = Router.get('/events', authorization, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const events = await Event.findAll();
    const formattedEvents = events.map(event => event.dataValues);

    res.send(formattedEvents);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});
module.exports = getEvents;
