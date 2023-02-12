export type LabelsType =
  | 'name'
  | 'internal_name'
  | 'domain'
  | 'start_date'
  | 'end_date'
  | 'team_size';

export interface SortingType {
  name: LabelsType;
  asc: boolean;
}
