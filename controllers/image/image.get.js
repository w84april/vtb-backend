const e = require('express');
const Router = e.Router();
const { Image } = require('../../models');
const path = require('path');

const getImage = Router.get('/image/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const image = await Image.findOne({
      where: {
        filename: filename,
      },
    });
    if (image) {
      const dirname = path.resolve();
      const fullFilePath = path.join(dirname, image.filepath);
      return res.type(image.mimetype).sendFile(fullFilePath);
    }
    return res.status(404).send('Not found');
  } catch (err) {
    return res.status(400).send(err.message);
  }
});
module.exports = getImage;
