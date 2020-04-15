import { startOfDay } from 'date-fns';
import Appoitment from './../Models/Appoitment';
import AppoitmentsRepository from './../Repositories/AppoitmentsRepository';

// DTO
interface Request {
  provider: string;
  date: Date;
}

class CreateAppoitmentService {
  private appoitmentsRepository: AppoitmentsRepository;

  constructor(appoitmentsRepository: AppoitmentsRepository) {
    this.appoitmentsRepository = appoitmentsRepository;
  }

  public execute({ provider, date }: Request): Appoitment {
    const appoitmentDate = startOfDay(date);

    const findAppointmentInDate = this.appoitmentsRepository.findByDate(
      appoitmentDate,
    );

    if (findAppointmentInDate) {
      throw Error('Agendamento: O Horario já está agendado');
    }

    const appoitment = this.appoitmentsRepository.create({
      provider,
      date: appoitmentDate,
    });

    return appoitment;
  }
}

export default CreateAppoitmentService;
