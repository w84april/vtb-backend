const e = require('express');
const Router = e.Router();
const { Event, User_Event: UserEvent } = require('../../models');
const { validationResult } = require('express-validator');
const authorization = require('../../authorization');
const getEvents = Router.get('/events', authorization, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const events = await Event.findAll();
    const takenEventsByUser = await UserEvent.findAll({
      where: {
        UserId: res.locals.id
      }
    })

    const formattedEvents = events.map(event => event.dataValues);
    const extendedEvetns = formattedEvents.map(event => {
      return takenEventsByUser.find(u => u.EventId === event.id) ?
          {
            ...event,
            take: true,
            done: takenEventsByUser.find(u => u.EventId === event.id).done,
            approve: takenEventsByUser.find(u => u.EventId === event.id).approve,
          } :
          {
           ...event,
            take: false
          }
    })

    res.send(extendedEvetns);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});
module.exports = getEvents;
