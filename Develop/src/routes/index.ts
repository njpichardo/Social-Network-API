import { Router } from 'express';
import apiRoutes from './api/index.js';

const router = Router();

router.use('/api', apiRoutes);

router.use((_, res) => {
  res.status(404).send('<h1>404 Error!</h1>');
});

export default router;