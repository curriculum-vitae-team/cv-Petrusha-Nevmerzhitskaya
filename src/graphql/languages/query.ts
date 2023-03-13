import { gql } from '@apollo/client';

export const LANGUAGES = gql`
  query Languages {
    languages {
      id
      created_at
      iso2
      name
      native_name
    }
  }
`;
