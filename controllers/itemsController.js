const async = require('async');
const { body, validationResult } = require('express-validator');
const Item = require('../models/item');
const Category = require('../models/category');

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

exports.item_delete_get = (req, res, next) => {
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

exports.item_create_post = [
  body('name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Item name must be specified.')
    .isLength({ max: 100 })
    .withMessage('Item name must be maximum 100 characters.'),
  body('description')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Description must be specified.'),
  body('price')
    .isNumeric()
    .notEmpty()
    .escape()
    .withMessage('Enter a valid price.'),
  body('number_in_stock')
    .isNumeric()
    .notEmpty()
    .escape()
    .withMessage('Enter a valid number.'),
  body('category').escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      number_in_stock: req.body.number_in_stock,
      category: req.body.category,
    });

    if (!errors.isEmpty()) {
      Category.find().exec((err, categories) => {
        if (err) {
          return next(err);
        }
        if (categories == null) {
          res.redirect('/');
        }
        res.render('item_form', {
          title: 'Create New Item',
          categories,
          item,
          errors: errors.array(),
        });
      });
      return;
    }

    item.save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect(item.url);
    });
  },
];

exports.item_update_get = (req, res, next) => {
  async.parallel(
    {
      categories(callback) {
        Category.find(callback);
      },
      item(callback) {
        Item.findById(req.params.id).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.item == null) {
        const error = new Error('Item not found');
        error.status = 404;
        return next(error);
      }
      res.render('item_form', {
        title: `Update Item: ${results.item.name}`,
        item: results.item,
        categories: results.categories,
        update: true,
      });
    }
  );
};

exports.item_update_post = [
  body('name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Item name must be specified.')
    .isLength({ max: 100 })
    .withMessage('Item name must be maximum 100 characters.'),
  body('description')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Description must be specified.'),
  body('price')
    .isNumeric()
    .notEmpty()
    .escape()
    .withMessage('Enter a valid price.'),
  body('number_in_stock')
    .isNumeric()
    .notEmpty()
    .escape()
    .withMessage('Enter a valid number.'),
  body('category').escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      number_in_stock: req.body.number_in_stock,
      category: req.body.category,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      Category.find().exec((err, categories) => {
        if (err) {
          return next(err);
        }
        if (categories == null) {
          res.redirect('/');
        }
        res.render('item_form', {
          title: `Update Item: ${item.name}`,
          categories,
          item,
          errors: errors.array(),
        });
      });
      return;
    }

    Item.findByIdAndUpdate(req.params.id, item, {}, (err, theitem) => {
      if (err) {
        return next(err);
      }
      res.redirect(theitem.url);
    });
  },
];
