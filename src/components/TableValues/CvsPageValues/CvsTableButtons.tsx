import { useReactiveVar } from '@apollo/client';
import { Button } from '@mui/material';
import { useState } from 'react';
import SearchInput from '@components/Table/SearchInput';
import { authService } from '@graphql/auth/authService';
import isAbleToEdit from '@utils/isAbleToEdit';
import CreateCvForm from './CreateCvForm';

export const CVsTableButtons = () => {
  const user = useReactiveVar(authService.user$);
  const AbleToEdit = isAbleToEdit(user);
  const [formOpened, setFormOpened] = useState(false);
  const createUserClick = () => {
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
      <CreateCvForm
        opened={formOpened}
        close={closeForm}
        confirm={createUser}
      />
      <SearchInput />
      <Button
        disabled={!AbleToEdit}
        color="error"
        variant="contained"
        onClick={createUserClick}
      >
        Create CV
      </Button>
    </>
  );
};
