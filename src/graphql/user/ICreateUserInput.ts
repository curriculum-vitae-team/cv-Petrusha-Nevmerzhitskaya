interface SkillMastery {
  skill_name: string;
  mastery: string;
}

interface LanguageProficiency {
  language_name: string;
  proficiency: string;
}

export interface ICreateUserInput {
  auth: {
    email: string;
    password: string;
  };
  profile: {
    first_name: string;
    last_name: string;
    skills: SkillMastery[];
    languages: LanguageProficiency[];
  };
  cvsIds: string[];
  departmentId: string;
  positionId: string;
  role: string;
}
