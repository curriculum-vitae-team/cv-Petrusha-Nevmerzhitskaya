import { gql } from '@apollo/client';

export const PROJECTS = gql`
  query Projects {
    projects {
      id
      name
      internal_name
      domain
      start_date
      end_date
      team_size
    }
  }
`;

export const GET_PROJECT = gql`
  query GetProjectInfo($id: ID!) {
    project(id: $id) {
      id
      name
      created_at
      internal_name
      description
      domain
      start_date
      end_date
      tech_stack {
        id
        name
      }
      team_size
    }
  }
`;
