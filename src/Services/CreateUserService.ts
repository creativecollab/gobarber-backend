import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from './../Models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const emailExists = await userRepository.findOne({
      where: { email },
    });

    if (emailExists) {
      throw new Error('Email existente no sistema');
    }

    const hashPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
