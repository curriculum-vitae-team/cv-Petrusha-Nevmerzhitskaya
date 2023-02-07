export type LabelsType =
  | 'department_name'
  | 'first_name'
  | 'last_name'
  | 'email'
  | 'position_name';

export interface SortingType {
  name: LabelsType;
  asc: boolean;
}
