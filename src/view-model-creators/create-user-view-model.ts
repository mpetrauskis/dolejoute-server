import { User, UserDocument } from '../models/user-model';
import config from '../config';

export type UserViewModel = Omit<User, 'password' | 'createdAt' | 'updatedAt'> & {
  id: string,
};

const createUserViewModel = (userDoc: UserDocument): UserViewModel => ({
  id: userDoc._id.toString(),
  email: userDoc.email,
  role: userDoc.role,
  name: userDoc.name,
  surname: userDoc.surname,
  img: userDoc.img && `${config.server.domain}/${userDoc.img}`.replaceAll('\\', '/'),
});

export default createUserViewModel;
