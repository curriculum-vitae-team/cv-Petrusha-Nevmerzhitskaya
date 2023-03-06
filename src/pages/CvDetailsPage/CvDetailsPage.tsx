import { useQuery, useReactiveVar } from '@apollo/client';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import CvTabs from '@components/CvTabs';
import Preloader from '@components/Preloader';
import UpdateCvForm from '@components/TableValues/CvsPageValues/UpdateCvForm';
import { authService } from '@graphql/auth/authService';
import { CV } from '@graphql/cvs/query';
import { useBreadcrumbs } from '@hooks/useBreadcrumbs';
import { ICv } from '@interfaces/ICv';
import isAdmin from '@utils/isAdmin';
import * as Styled from './CvDetailsPage.styles';

interface ICvResult {
  cv: ICv;
}

const CvDetailsPage = () => {
  const user = useReactiveVar(authService.user$);
  const AbleToEdit = isAdmin(user);
  const { id } = useParams();
  const { data, loading, error } = useQuery<ICvResult>(CV, {
    variables: { id }
  });

  useBreadcrumbs({
    [`cvs/${id}`]: {
      text: data?.cv.name,
      to: `cvs/${id}`
    }
  });

  const [formOpened, setFormOpened] = useState(false);
  const UpdateCvClick = () => {
    setFormOpened(true);
  };

  const closeForm = () => {
    setFormOpened(false);
  };

  const createUser = async () => {
    closeForm();
  };

  return (
    <Preloader loading={loading} error={error}>
      <UpdateCvForm
        opened={formOpened}
        close={closeForm}
        confirm={createUser}
      />
      <CvTabs />
      <Styled.PaperWrapper elevation={7}>
        <Styled.InfoWrapper>
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
        </Styled.InfoWrapper>
        <Button
          sx={Styled.ButtonStyles}
          color="secondary"
          variant="contained"
          disabled={!AbleToEdit}
          onClick={UpdateCvClick}
        >
          Edit
        </Button>
      </Styled.PaperWrapper>
    </Preloader>
  );
};

export default CvDetailsPage;
