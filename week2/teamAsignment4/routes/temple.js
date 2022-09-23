const routes = require('express').Router();
const temples = require('../controllers/temple.js');

/**
 * @swagger
 * components:
 *   schemas:
 *     temple:
 *       type: object
 *       required:
 *         - name
 *         - location
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         name:
 *           type: string
 *           description: The temple title
 *         location:
 *           type: string
 *           description: The location of the temple
 *       example:
 *         id: d5fE_asz
 *         name: Campinas Brazil Temple
 *         location: Campinas Brazil
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Returns the list of all the temples
 *     tags: [temples]
 *     responses:
 *       200:
 *         description: The list of the temples
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/'
 */
routes.get('/', temples.findAll);
routes.get('/:temple_id', temples.findOne);
routes.post('/', temples.create);
routes.put('/:id', temples.update);
routes.delete('/:id', temples.delete);
routes.delete('/', temples.deleteAll);
routes.get('/:all_published', temples.findAllPublished);

module.exports = routes;