const express = require('express');
const router = express.Router();
const {userId, read, update} = require('../controller/user');

router.get('/user/:userId',read);
router.put('/user/:userId',update);
router.param('userId',userId);

module.exports = router;
