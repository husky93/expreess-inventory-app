const express = require('express');
const router = express.Router();
const items_controller = require('../controllers/itemsController');

router.get('/:id', items_controller.item_detail);

router.get('/:id/delete', items_controller.item_delete_get);

router.post('/:id/delete', items_controller.item_delete_post);

router.get('/create', items_controller.item_create_get);

router.post('/create', items_controller.item_create_post);

router.get('/:id/update', items_controller.item_update_get);

router.post('/:id/update', items_controller.item_update_post);

module.exports = router;
