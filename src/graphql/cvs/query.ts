import { gql } from '@apollo/client';

export const CVS = gql`
  query Cvs {
    cvs {
      id
      created_at
      name
      description
      user {
        id
        email
      }
      projects {
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
          created_at
          name
        }
      }
      skills {
        skill_name
        mastery
      }
      languages {
        language_name
        proficiency
      }
      is_template
    }
  }
`;

export const CV = gql`
  query Cv($id: ID!) {
    cv(id: $id) {
      id
      created_at
      name
      description
      user {
        id
        email
        position_name
        profile {
          full_name
        }
      }
      skills {
        skill_name
        mastery
      }
      languages {
        language_name
        proficiency
      }
      projects {
        id
        name
        internal_name
        domain
        start_date
        end_date
      }
      is_template
    }
  }
`;
