import { ILanguageProficiency } from '@interfaces/ILanguageProficiency';
import { ISkillMastery } from '@interfaces/ISkillMastery';

export interface IUpdateUserInput {
  profile: {
    first_name: string;
    last_name: string;
    skills: ISkillMastery[];
    languages: ILanguageProficiency[];
  };
  cvsIds: string[];
  departmentId: string;
  positionId: string;
}
