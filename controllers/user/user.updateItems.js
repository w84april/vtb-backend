const e = require('express');
const Router = e.Router();
const { check, validationResult, Result } = require('express-validator');
const { User } = require('../../models');

const createEvent = Router.post(
    '/update',
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array()[0].msg });
            }

            const updateUser = await User.update({
                ...req.body
            }, {
                where: {
                    id: req.body.id
                }
            });

            res.json({
                updateUser,
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },
);

module.exports = createEvent;