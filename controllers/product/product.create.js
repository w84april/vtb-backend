const e = require('express');
const Router = e.Router();
const { body, validationResult } = require('express-validator');
const { Image, Product } = require('../../models');
const authorization = require('../../authorization');
const multer = require('multer');
const upload = multer({ dest: './public/data/uploads/' });

const postProduct = Router.post(
  '/product',
  authorization,
  upload.single('uploaded_file'),
  body('productName').isString(),
  body('quantity').isString(),
  body('price').isNumeric(),
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

      const item = await Product.create({
        productName: req.body.productName,
        quantity: req.body.quantity,
        file: image.filename,
        price: req.body.price,
      });
      res.send(item);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
);
module.exports = postProduct;
