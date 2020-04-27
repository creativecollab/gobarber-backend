import { Router } from 'express';

// Instancia: Rota Agendamentos
import AppointmentsRouter from './Appointments.routes';
import UsersRouter from './Users.routes';
import SessionRouter from './Session.routes';

const Routes = Router();

Routes.use('/session', SessionRouter);
Routes.use('/users', UsersRouter);
Routes.use('/agendamentos', AppointmentsRouter);

export default Routes;
