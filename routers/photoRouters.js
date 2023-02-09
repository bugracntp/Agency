const express = require('express');

const pageController = require('../controllers/photoController');

const router = express.Router();

router.route('/').get(pageController.getIndexPage);
router.route('/portfolios').post(pageController.createPost);

router.route('/:id').delete(pageController.deletePhoto);



module.exports = router;