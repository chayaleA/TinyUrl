import express from 'express';
import UsersController from '../contollers/UsersController.js';

const router = express.Router();

router.get('/', UsersController.getUsers);

router.get("/:id", UsersController.getById);

router.post('/', UsersController.addUser);

router.put('/:id', UsersController.updateUser);

router.delete('/:id', UsersController.deleteUser);

export default router;
