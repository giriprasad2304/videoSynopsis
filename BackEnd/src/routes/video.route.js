const express = require('express');
const middleware = require('../middleware/auth.middleware')
const videoController = require('../controllers/video.controller')

const router = express.Router();

router.get('/history/:id', middleware.authVaildUSer, videoController.video)

module.exports = router;