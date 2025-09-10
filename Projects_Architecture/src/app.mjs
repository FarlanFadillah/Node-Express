import express from 'express'
import morgan from 'morgan'
import * as routes from '../routes/index.mjs'

const port = 8080;

const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/static', express.static('public'))

app.use('/', routes.homeRouter);
app.use('/api/products', routes.productsRouter);

 

console.log(process.env.NODE_ENV);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}...`);
});