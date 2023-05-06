import { Router } from 'express';
import { userRoutes } from './user';


const v1Routes = Router();

v1Routes.use('v1/user/', userRoutes);

export { v1Routes };