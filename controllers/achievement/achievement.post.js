const e = require('express');
const Router = e.Router();
const { body, validationResult } = require('express-validator');
const { Achievement, Image, User } = require('../../models');
const authorization = require('../../authorization');
const multer = require('multer');
const upload = multer({ dest: './public/data/uploads/' });

const post = Router.post(
  '/achievement',
  authorization,
  upload.single('uploaded_file'),
  body('owner').isString(),
  body('projectName').isString(),
  body('team').optional().isString(),
  body('result').isString(),
  body('event').isString(),
  async (req, res) => {
    try {
      const { filename, mimetype, size } = req.file;
      const filepath = req.file.path;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()[0].msg });
      }

      const image = await Image.create({
        filename,
        filepath,
        mimetype,
        size,
      });
      const user = await User.findOne({
        where: {
          id: res.locals.id,
        },
      });
      const item = await Achievement.create({
        owner: res.locals.id,
        projectName: req.body.projectName,
        file: image.filename,
        team: req.body.team || null,
        result: req.body.result,
        event: req.body.event,
        ownerFirstName: user.firstName,
        ownerLastName: user.lastName,
        ownerFatherName: user.fatherName,
      });
      res.send(item);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
);
module.exports = post;
