import express from 'express';
import LinksController from '../contollers/LinksController.js'

const router = express.Router();

router.get('/', LinksController.getLinks);

router.get("/:id", LinksController.getById);

router.get('/:id/clicks', LinksController.getLinkClicksBySource);

router.post('/', LinksController.addLink);

router.put('/:id', LinksController.updateLink);

router.delete('/:id', LinksController.deleteLink);

export default router;
