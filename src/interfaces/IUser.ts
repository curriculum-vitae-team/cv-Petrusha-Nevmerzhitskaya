import { ICv } from './ICv';
import { IDepartment } from './IDepartment';
import { IPosition } from './IPosition';
import { IProfile } from './IProfile';

export interface IUser {
  id: string;
  created_at: string;
  email: string;
  is_verified?: boolean;
  profile: IProfile;
  cvs?: ICv[];
  department?: IDepartment;
  department_name?: string;
  position?: IPosition;
  position_name?: string;
  role: string;
}
