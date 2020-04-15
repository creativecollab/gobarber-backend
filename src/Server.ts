import express from 'express';
import Routes from './Routes';

const app = express();

app.use(express.json());
app.use(Routes);

app.listen(7000, () => {
  console.log('Server: ON port:7000');
});
