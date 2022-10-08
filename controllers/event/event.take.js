const e = require('express');
const Router = e.Router();
const { check, validationResult, Result } = require('express-validator');
const { User_Event: UserEvent } = require('../../models');

const takeEvent = Router.post(
    '/event/take',
    check('UserId').isUUID(),
    check('EventId').isUUID(),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array()[0].msg });
            }

            const {UserId, EventId} = req.body;

            await UserEvent.create({
                UserId,
                EventId
            });

            res.json({ take: true });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },
);

module.exports = takeEvent;