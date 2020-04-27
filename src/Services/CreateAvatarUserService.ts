import path from 'path';
import fs from 'fs';
import { getRepository } from 'typeorm';
import User from '../Models/User';

import multerConfig from './../Config/Multer';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class CreateAvatarUserService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new Error('Voce nao esta autenticado: alterar o Avatar ');
    }

    if (user.avatar) {
      const avatarPath = path.join(multerConfig.directory, user.avatar);
      const avatarFileExists = await fs.promises.stat(avatarPath);

      if (avatarFileExists) {
        await fs.promises.unlink(avatarPath);
      }
    }

    user.avatar = avatarFilename;

    await userRepository.save(user);

    return user;
  }
}

export default CreateAvatarUserService;
