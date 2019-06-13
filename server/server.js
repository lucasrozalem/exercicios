import "@babel/polyfill";
import express from "express";
import next from "next";
import bodyParser from 'body-parser';

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

import mongoConnector from './database/connector';
import logger from './logger';

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.urlencoded({ extended: true}));
  server.use(bodyParser.json())

  server.get('/', (req, res) => app.render(req, res, '/index'));
  server.get('/index', (req, res) => app.render(req, res, '/index'));
  server.get('/about', (req, res) => app.render(req, res, '/about'));

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, async (err) => {
    if (err) throw err;
    console.log(`> Custom Express Server ready on http://localhost:${port}`);

    const { connection } = await mongoConnector;
    connection.readyState
      ? logger.info('MongoDB was successfully connected')
      : logger.error('Error connecting to MongoDB');
  });
});