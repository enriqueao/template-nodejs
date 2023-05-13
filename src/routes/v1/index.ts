import { Router } from 'express';
import { userRouter } from './user';

const v1Routes = Router();

v1Routes.use("/v1/user", userRouter);

export { v1Routes };
