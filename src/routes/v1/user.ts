import { Router } from 'express';

const userRoutes = Router();

userRoutes.get(
  '/',
  (req, res) => {
    res.send({
      id: 1,
      name: 'Test',
      createdAt: Date.now()
    });
  }
);


export { userRoutes };