import express from 'express';
import router from './waterJug/waterJugRoutes';
import swaggerUi from 'swagger-ui-express';
import  { swaggerSpec } from './swagger';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', router);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});