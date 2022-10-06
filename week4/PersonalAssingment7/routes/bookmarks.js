const router = require('express').Router();
const bookmarksController = require('../controllers/bookmarks')

//Goes to the GitHub loginpage
router.get('/login',bookmarksController.login);
//Comes back from the login screes
router.get('/loginCallback',bookmarksController.loginCallback);

router.get('/',bookmarksController.getAll);

//⭕️ CHECK IF USER LOGED IN AND SEND TO /login 

router.get('/:id', bookmarksController.getSingle);

router.post('/', bookmarksController.createBookmark);

router.put('/:id', bookmarksController.updateBookmark);

router.delete('/:id', bookmarksController.deleteBookmark);


module.exports = router;