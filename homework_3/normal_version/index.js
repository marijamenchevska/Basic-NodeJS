import express from 'express';
import cors from 'cors';
import path from 'path';
import router from './router.const.js';

const PORT = 3000;
const HOSTNAME = 'localhost';

const homePagePath = path.join(import.meta.dirname, 'public');

const app = express();

app.use(express.json());

app.use(cors());

app.use('/home', express.static(homePagePath));

app.use('/api', router);

app.listen(PORT, HOSTNAME, () => console.log(`Server is listening at http://${HOSTNAME}:${PORT}`));