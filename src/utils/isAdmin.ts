import { IUser } from '@interfaces/IUser';

const isAdmin = (user: IUser | null) => user?.role === 'admin';

export default isAdmin;
