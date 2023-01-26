import { ISkill } from './ISkill';

export interface IProject {
  id: string;
  created_at: string;
  name: string;
  internal_name?: string;
  description: string;
  domain: string;
  start_date: string;
  end_date?: string;
  team_size: number;
  tech_stack?: ISkill[];
}
