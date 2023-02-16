import { IUser } from '@interfaces/IUser';
import isAdmin from './isAdmin';

const isAbleToEdit = (loggedUser: IUser | null, user?: IUser) =>
  user?.id === loggedUser?.id || isAdmin(loggedUser);

export default isAbleToEdit;
