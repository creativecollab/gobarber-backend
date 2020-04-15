import { isEqual } from 'date-fns';
import Appoitment from './../Models/Appoitment';

//DTO
interface IAppoitment {
  provider: string;
  date: Date;
}

class AppoitmentsRepository {
  
  private appoitments: Appoitment[];

  constructor() {
    this.appoitments = [];
  }

  public all(): Appoitment[] {
    return this.appoitments;
  }

  public create({ provider, date }: IAppoitment): Appoitment {
    const appoitment = new Appoitment({ provider, date });
    this.appoitments.push(appoitment);
    return appoitment;
  }

  public findByDate(date: Date): Appoitment | null {
    /*
     * Verifica se há agendamentos nesta data e neste horario
     */
    const findAppointment = this.appoitments.find(agendamento =>
      isEqual(date, agendamento.date),
    );

    return findAppointment || null;
  }
}

export default AppoitmentsRepository;
