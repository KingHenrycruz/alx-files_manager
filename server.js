import express from 'express';
import controllerRouting from './routes/index';
import injectRoutes from './routes';
import injectMiddlewares from './libs/middlewares';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
controllerRouting(app);
injectMiddlewares(app);
injectRoutes(app);
startServer(app);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
