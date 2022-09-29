const router = require('express').Router();
const bookmarksController = require('../controllers/bookmarks')

/**
 * @swagger
 * /contacts:
 *  get:
 *    description: Use to request all contacts
 *    responses:
 *      '200':
 *        description: Successful response
 */

router.get('/',bookmarksController.getAll);

router.get('/:id', bookmarksController.getSingle);

router.post('/', bookmarksController.createBookmark);

//router.put('/:id', contactsController.updateContact);

//router.delete('/:id', contactsController.deleteContact);

module.exports = router;