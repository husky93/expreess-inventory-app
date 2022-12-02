const Item = require('../models/item');
const Category = require('../models/category');
const { body, validationResult } = require('express-validator');

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
  Item.findById(req.params.id).exec((err, item) => {
    if (err) {
      return next(err);
    }
    if (item == null) {
      res.redirect('/');
    }
    res.render('item_delete', { title: 'Delete item', item });
  });
};

exports.item_delete_post = (req, res, next) => {
  Item.findById(req.body.itemid).exec((err, item) => {
    if (err) {
      return next(err);
    }
    if (item == null) {
      res.redirect('/');
    }
    Item.findByIdAndRemove(req.body.itemid, (err) => {
      if (err) {
        return next(err);
      }
      // Success - go to author list
      res.redirect('/');
    });
  });
};

exports.item_create_get = (req, res, next) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return next(err);
    }
    if (categories == null) {
      res.redirect('/');
    }
    res.render('item_form', { title: 'Create New Item', categories });
  });
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
