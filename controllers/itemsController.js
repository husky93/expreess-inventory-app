const Item = require('../models/item');

exports.item_detail = (req, res, next) => {
  Item.findById(req.params.id).exec((err, item) => {
    if (err) {
      return next(err);
    }
    if (item == null) {
      const error = new Error('Item not found');
      error.status = 404;
      return next(error);
    }
    res.render('item_details', {
      item,
    });
  });
};

exports.item_delete_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Item Delete GET');
};

exports.item_delete_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Item Detail POST');
};

exports.item_create_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Item Create GET');
};

exports.item_create_post = (req, res) => {
  res.send('NOT IMPLEMENTED: ItemCreate POST');
};

exports.item_update_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Item Update GET');
};

exports.item_update_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Item Update POST');
};
