// Importing the express module and the file where the router logic is located
import express from 'express';
import { router } from './routes/index.routes';
import cors from 'cors';

// Defining the const server to hold the express instance
const server = express();

// Configuring the server (express) to use JSON and the router
server.use(
  cors({
    origin: 'http://localhost:4000',
  })
);
server.use(express.json());
server.use(router);

// Exporting the server variable
export { server };
