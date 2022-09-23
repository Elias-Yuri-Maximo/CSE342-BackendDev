const router = require('express').Router();
const contactsController = require('../controllers/contacts')

/**
 * @swagger
 * /contacts:
 *  get:
 *    description: Use to request all contacts
 *    responses:
 *      '200':
 *        description: Successful response
 */

router.get('/',contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', contactsController.createContact);

router.put('/:id', contactsController.updateContact);

router.delete('/:id', contactsController.deleteContact);

module.exports = router;