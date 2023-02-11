export interface IUpdateUserInput {
  profile: {
    first_name: string;
    last_name: string;
    skills: {
      skill_name: string;
      mastery: string;
    };
    languages: {
      language_name: string;
      proficiency: string;
    };
  };
  cvsIds: string[];
  departmentId: string;
  positionId: string;
}
