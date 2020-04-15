import { Router } from 'express';

// Instancia: Rota Agendamentos
import AppoitmentsRouter from './Appoitments.routes';

const Routes = Router();

Routes.use('/agendamentos', AppoitmentsRouter);

export default Routes;
