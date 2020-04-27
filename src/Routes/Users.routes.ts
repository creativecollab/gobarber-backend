import { Router } from 'express';
import Multer from 'multer';
import CreateUserService from './../Services/CreateUserService';
import CreateAvatarUserService from './../Services/CreateAvatarUserService';
import Auth from './../MIddlewares/Auth';
import configMulter from './../Config/Multer';

const UsersRouter = Router();

const upload = Multer(configMulter);

UsersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const userCreate = new CreateUserService();

    const user = await userCreate.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  } catch (error) {
    return response.status(400).json({ erro: error.message });
  }
});

UsersRouter.patch(
  '/avatar',
  Auth,
  upload.single('avatar'),
  async (request, response) => {
    const avatarUpload = new CreateAvatarUserService();

    const userAvatar = await avatarUpload.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.json(userAvatar);
  },
);

export default UsersRouter;
