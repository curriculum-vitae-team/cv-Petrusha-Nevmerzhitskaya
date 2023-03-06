import { useReactiveVar } from '@apollo/client';
import { Button } from '@mui/material';
import { useState } from 'react';
import SearchInput from '@components/Table/SearchInput';
import { authService } from '@graphql/auth/authService';
import isAdmin from '@utils/isAdmin';
import UpdateProjectsCvForm from './UpdateProjectsCvForm';

export const CvProjectsTableButtons = () => {
  const user = useReactiveVar(authService.user$);
  const AbleToEdit = isAdmin(user);
  const [formOpened, setFormOpened] = useState(false);
  const UpdateProjectsCvClick = () => {
    setFormOpened(true);
  };

  const closeForm = () => {
    setFormOpened(false);
  };

  const createUser = async () => {
    closeForm();
  };
  return (
    <>
      <UpdateProjectsCvForm
        opened={formOpened}
        close={closeForm}
        confirm={createUser}
      />
      <SearchInput />
      <Button
        disabled={!AbleToEdit}
        color="secondary"
        variant="contained"
        onClick={UpdateProjectsCvClick}
      >
        Update
      </Button>
    </>
  );
};
