const express = require('express');
const router = express.Router();
const categories_controller = require('../controllers/categoriesController');

/* GET users listing. */
router.get('/', categories_controller.index);

router.get('/:id', categories_controller.category_detail);

router.get('/delete/:id', categories_controller.category_delete_get);

router.post('/delete/:id', categories_controller.category_delete_post);

router.get('/create', categories_controller.category_create_get);

router.post('/create', categories_controller.category_create_post);

router.get('/:id/update', categories_controller.category_update_get);

router.post('/:id/update', categories_controller.category_update_post);

module.exports = router;
