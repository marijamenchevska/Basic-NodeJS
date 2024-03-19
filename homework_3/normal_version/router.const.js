import { Router } from 'express';
import trainersRoutes from './routes/trainers.routes.js';

const router = Router();

router.use('/trainers', trainersRoutes);

export default router;