import express from 'express';
import { routes } from './routes';
import cors from 'cors';

const app = express()
const port = 3000

app.use(cors({
    origin: 'https://localhost:3000'
})); // segurança para permitir e definir quais os endereços de front-end podem acessar o back.
app.use(express.json());
app.use(routes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
