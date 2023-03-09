import express, {Express, Request, Response} from 'express';
import {PrismaClient} from '@prisma/client';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import {Error} from './types';
import * as dotenv from 'dotenv';

dotenv.config();

const port: Number = Number(process.env.PORT) || 3000;
const prisma: PrismaClient = new PrismaClient();
const app: Express = express();
const swaggerDocument: Object = YAML.load('./swagger.yaml');

app.use(express.json());
app.use(express.static('public'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((err: Error, req: Request, res: Response) => {
    console.error(err.stack);
    return res.status(err.statusCode || 500).send(err.message || 'Internal Server Error');
});

app.listen(port, () => console.log(`Running at http://localhost:${port} and docs at http://localhost:${port}/docs`));
