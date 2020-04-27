import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../Repositories/AppointmentsRepository';
import CreateAppointmentService from '../Services/CreateAppointmentService';

import Auth from './../MIddlewares/Auth';

const AppointmentsRouter = Router();

AppointmentsRouter.use(Auth);

AppointmentsRouter.get('/', (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = appointmentsRepository.find();
  return response.json(appointments);
});

AppointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;
    // Transforma de String para Date
    const parseDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      provider_id,
      date: parseDate,
    });

    return response.json(appointment);
  } catch (error) {
    return response.status(400).json({ erro: error.message });
  }
});

export default AppointmentsRouter;
