const e = require('express');
const Router = e.Router();
const { check, validationResult, Result } = require('express-validator');
const { Event } = require('../../models');

const createEvent = Router.post(
    '/event/create',
    check('name').isString(),
    check('description').isString(),
    check('type').isString(),
    check('middleAwardPower').isInt(),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array()[0].msg });
            }

            const {name, description, type, middleAwardPower} = req.body;

            const newEvent = await Event.create({
                name,
                description,
                type,
                middleAwardPower
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