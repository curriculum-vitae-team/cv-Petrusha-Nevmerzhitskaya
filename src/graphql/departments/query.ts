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

export const CREATE_DEPARTMENT = gql`
  mutation CreateDepartment($department: DepartmentInput!) {
    createDepartment(department: $department) {
      id
      created_at
      name
    }
  }
`;

export const DELETE_DEPARMENT = gql`
  mutation DeleteDepartment($id: ID!) {
    deleteDepartment(id: $id) {
      affected
    }
  }
`;
