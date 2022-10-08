const checkAuth = require('../middleware/auth')
const router = require('express').Router();
const bookmarksController = require('../controllers/bookmarks')

//Goes to the GitHub loginpage
router.get('/login',bookmarksController.login);
//Comes back from the login screes
router.get('/loginCallback',bookmarksController.loginCallback);

router.get('/', checkAuth.auth, bookmarksController.getAll);

router.get('/content/:id', checkAuth.auth, bookmarksController.findContent);

router.get('/:id', checkAuth.auth, bookmarksController.getSingle);

router.post('/',checkAuth.auth, bookmarksController.createBookmark);

router.put('/:id',checkAuth.auth, bookmarksController.updateBookmark);

router.delete('/:id',checkAuth.auth, bookmarksController.deleteBookmark);


module.exports = router;