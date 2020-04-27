import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from './../Models/User';
import TokenConfig from './../Config/Token';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('Email não confere');
    }

    const comparePassword = await compare(password, user.password);

    if (!comparePassword) {
      throw new Error('Senha não confere');
    }

    const { secret, expireIn } = TokenConfig.JWT;

    const token = sign({}, secret, { subject: user.id, expiresIn: expireIn });

    return { user, token };
  }
}
export default CreateSessionService;
