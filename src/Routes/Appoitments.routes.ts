import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppoitmentsRepository from '../Repositories/AppoitmentsRepository';
import CreateAppoitmentService from '../Services/CreateAppoitmentService';

const AppoitmentsRouter = Router();

const appoitmentsRepository = new AppoitmentsRepository();

AppoitmentsRouter.get('/', (request, response) => {
  const appoitments = appoitmentsRepository.all();

  return response.json(appoitments);
});

AppoitmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;
    // Transforma de String para Date
    const parseDate = parseISO(date);

    const createAppoitment = new CreateAppoitmentService(appoitmentsRepository);

    const appoitment = createAppoitment.execute({
      provider,
      date: parseDate,
    });

    return response.json(appoitment);
  } catch (error) {
    return response.status(400).json({ erro: error.message });
  }
});

export default AppoitmentsRouter;
