import express from 'express';
import cors from 'cors';
import { addMail } from './endpoint/addMail.js';
import { startCheck } from './rate/checker.js';

const app = express();

const PORT = 8239;

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.post('/mail', (req, res) => {
    addMail(req, res);
});

startCheck();

app.listen(PORT, () => {
    console.log('Server is running on ', PORT);
})