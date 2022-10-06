const router = require('express').Router();
const bookmarksController = require('../controllers/bookmarks')

//Goes to the GitHub loginpage
router.get('/login',bookmarksController.login)

router.get('/',bookmarksController.getAll);

router.get('/:id', bookmarksController.getSingle);

router.post('/', bookmarksController.createBookmark);

router.put('/:id', bookmarksController.updateBookmark);

router.delete('/:id', bookmarksController.deleteBookmark);


module.exports = router;