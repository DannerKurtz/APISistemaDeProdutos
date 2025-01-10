// Importing the express router and the customerController responsible for the method controllers
import { userController } from '../controllers/UserController';
import { Router } from 'express';

// Defining and exporting the users route, receiving the router parameter of type Router from Express
export const userRouter = (router: Router) => {
  router.post('/api/user', userController.create); // POST route responsible for creating users
  router.get('/api/user', userController.get); // GET route responsible for fetching users
  router.put('/api/user/:id', userController.update); // PUT route responsible for updating users
  router.delete('/api/user/:id', userController.deleteUser); // DELETE route responsible for deleting a user
};
