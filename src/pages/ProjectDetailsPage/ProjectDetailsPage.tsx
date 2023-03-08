import { useQuery, useReactiveVar } from '@apollo/client';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Preloader from '@components/Preloader';
import UpdateProjectForm from '@components/TableValues/ProjectPageValues/UpdateProjectForm';
import { authService } from '@graphql/auth/authService';
import { GET_PROJECT } from '@graphql/projects/query';
import { useBreadcrumbs } from '@hooks/useBreadcrumbs';
import { IProject } from '@interfaces/IProject';
import isAdmin from '@utils/isAdmin';
import * as Styled from './ProjectDetailsPage.styles';

interface IProjectResult {
  project: IProject;
}

const ProjectsDetailsPage = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery<IProjectResult>(GET_PROJECT, {
    variables: { id }
  });
  const user = useReactiveVar(authService.user$);
  const isUserAdmin = isAdmin(user);

  const [formOpened, setFormOpened] = useState(false);
  const UpdateClick = () => {
    setFormOpened(true);
  };

  const closeForm = () => {
    setFormOpened(false);
  };

  const create = async () => {
    closeForm();
  };

  useBreadcrumbs({
    [`projects/${id}`]: {
      text: data?.project.name,
      to: `projects/${id}`
    }
  });

  return (
    <Preloader loading={loading} error={error}>
      <UpdateProjectForm
        opened={formOpened}
        close={closeForm}
        confirm={create}
        id={id}
      />
      <Styled.PaperWrapper elevation={7}>
        <Styled.InfoWrapper>
          <Typography>Name: {data?.project.name || '-'}</Typography>
          <Typography>
            Internal name: {data?.project?.internal_name || '-'}
          </Typography>
          <Typography>
            Description: {data?.project?.description || '-'}
          </Typography>
          <Typography>Domain: {data?.project?.domain || '-'}</Typography>
          <Typography>Start date: {data?.project?.start_date}</Typography>
          <Typography>
            End date: {data?.project?.end_date || 'Till now'}
          </Typography>
        </Styled.InfoWrapper>

        <Button
          sx={Styled.ButtonStyles}
          color="secondary"
          variant="contained"
          disabled={!isUserAdmin}
          onClick={UpdateClick}
        >
          Edit
        </Button>
      </Styled.PaperWrapper>
    </Preloader>
  );
};

export default ProjectsDetailsPage;
