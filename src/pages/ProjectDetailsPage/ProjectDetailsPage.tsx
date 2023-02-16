import { useQuery, useReactiveVar } from '@apollo/client';
import { Button, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import Preloader from '@components/Preloader';
import { authService } from '@graphql/auth/authService';
import { GET_PROJECT } from '@graphql/project/query';
import { IProject } from '@interfaces/IProject';
import isAdmin from '@utils/isAdmin';
import { InfoWrapper, PaperWrapper } from './ProjectDetailsPage.styles';

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

  return (
    <Preloader loading={loading} error={error}>
      <PaperWrapper elevation={7}>
        <InfoWrapper>
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
        </InfoWrapper>

        <Button disabled={!isUserAdmin}>Edit</Button>
      </PaperWrapper>
    </Preloader>
  );
};

export default ProjectsDetailsPage;
