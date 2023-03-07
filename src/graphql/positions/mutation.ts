import { gql } from '@apollo/client';

export const CREATE_POSITION = gql`
  mutation CreatePosition($position: PositionInput!) {
    createPosition(position: $position) {
      id
      created_at
      name
    }
  }
`;

export const UPDATE_POSITION = gql`
  mutation UpdatePosition($id: ID!, $position: PositionInput!) {
    updatePosition(id: $id, position: $position) {
      id
      created_at
      name
    }
  }
`;

export const DELETE_POSITION = gql`
  mutation DeletePosition($id: ID!) {
    deletePosition(id: $id) {
      affected
    }
  }
`;
