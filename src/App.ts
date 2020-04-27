import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import Routes from './Routes';

import './Database';

const app = express();

app.use(cors());
app.use(express.json());
app.use(Routes);

export default app;
