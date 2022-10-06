const express = require('express');
const router = express.Router();
router.use('/',require('./swagger'))
router.use('/bookmarks',require('./bookmarks'))

module.exports = router;