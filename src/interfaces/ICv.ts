import { ILanguageProficiency } from './ILanguageProficiency';
import { IProject } from './IProject';
import { ISkillMastery } from './ISkillMastery';
import { IUser } from './IUser';

export interface ICv {
  id: string;
  created_at: string;
  name: string;
  description: string;
  user?: Omit<IUser, 'cvs'>;
  projects?: IProject[];
  skills: ISkillMastery[];
  languages: ILanguageProficiency[];
  is_template: boolean;
}
