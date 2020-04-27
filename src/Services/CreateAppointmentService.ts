import { startOfDay } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from './../Models/Appointment';
import AppointmentsRepository from './../Repositories/AppointmentsRepository';

// DTO
interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfDay(date);

    const findAppointmentInDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInDate) {
      throw Error('Agendamento: O Horario já está agendado');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
