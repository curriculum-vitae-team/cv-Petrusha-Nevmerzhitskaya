import { useQuery, useReactiveVar } from '@apollo/client';
import { Button, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import CvTabs from '@components/CvTabs';
import Preloader from '@components/Preloader';
import { authService } from '@graphql/auth/authService';
import { CV } from '@graphql/cvs/query';
import { ICv } from '@interfaces/ICv';
import isAdmin from '@utils/isAdmin';
import { InfoWrapper, PaperWrapper } from './CvDetailsPage.styles';

interface ICvResult {
  cv: ICv;
}

const CvDetailsPage = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery<ICvResult>(CV, {
    variables: { id }
  });

  const user = useReactiveVar(authService.user$);

  const isUserAdmin = isAdmin(user);

  return (
    <Preloader loading={loading} error={error}>
      <CvTabs />
      <PaperWrapper elevation={7}>
        <InfoWrapper>
          <Typography>Name: {data?.cv?.name}</Typography>
          <Typography>Description: {data?.cv?.description}</Typography>
          <Typography>
            User: {data?.cv?.user?.profile?.full_name || data?.cv?.user?.email}
          </Typography>
          <Typography>
            User position: {data?.cv?.user?.position_name || '-'}
          </Typography>
          <Typography>
            Skills:{' '}
            {data?.cv?.skills.map((skill) => skill.skill_name).join(', ') ||
              '-'}
          </Typography>

          <Typography>
            Languages:{' '}
            {data?.cv?.languages
              .map((language) => language.language_name)
              .join(', ') || '-'}
          </Typography>
        </InfoWrapper>
        <Button disabled={!isUserAdmin}>Edit</Button>
      </PaperWrapper>
    </Preloader>
  );
};

export default CvDetailsPage;
