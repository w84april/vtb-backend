const e = require('express');
const Router = e.Router();
const { check, validationResult, Result } = require('express-validator');
const { Event } = require('../../models');

const createEvent = Router.post(
    '/event/update',
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array()[0].msg });
            }

            const newEvent = await Event.update({
                ...req.body
            }, {
                where: {
                    id: req.body.id
                }
            });

            res.json({
                newEvent,
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },
);

module.exports = createEvent;