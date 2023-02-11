import { gql } from '@apollo/client';

export const DEPARTMENTS = gql`
  query Departments {
    departments {
      id
      created_at
      name
    }
  }
`;
