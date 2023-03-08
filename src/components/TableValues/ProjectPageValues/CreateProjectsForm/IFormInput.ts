export interface IFormInput {
  [key: string]: string | number;
  name: string;
  internal_name: string;
  description: string;
  domain: string;
  start_date: string;
  end_date: string;
  team_size: number;
}
