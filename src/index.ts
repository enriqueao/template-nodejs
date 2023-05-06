import { startExpressServer } from "./infraestructure/app/infrastructure";
import { v1Routes } from "./routes/v1";

export const app = startExpressServer([v1Routes], {
  port: 3000,
  basePath: ''
});