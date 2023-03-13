import { gql } from '@apollo/client';

export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id) {
      affected
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation CreateProject($project: ProjectInput!) {
    createProject(project: $project) {
      id
      created_at
      name
      internal_name
      description
      domain
      start_date
      end_date
      team_size
      tech_stack {
        id
        name
      }
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($id: ID!, $project: ProjectInput!) {
    updateProject(id: $id, project: $project) {
      id
      name
      internal_name
      description
      domain
      start_date
      end_date
      team_size
      tech_stack {
        id
        name
      }
    }
  }
`;
