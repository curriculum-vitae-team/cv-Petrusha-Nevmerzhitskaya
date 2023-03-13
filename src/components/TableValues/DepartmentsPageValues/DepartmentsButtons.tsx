import { useReactiveVar } from '@apollo/client';
import { Button } from '@mui/material';
import { useState } from 'react';
import SearchInput from '@components/Table/SearchInput';
import { authService } from '@graphql/auth/authService';
import isAdmin from '@utils/isAdmin';
import CreateDepartmentForm from './CreateDepartmentForm';

export const DepartmentsTableButtons = () => {
  const user = useReactiveVar(authService.user$);
  const AbleToEdit = isAdmin(user);
  const [formOpened, setFormOpened] = useState(false);
  const CreateDepartmentClick = () => {
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
      <CreateDepartmentForm
        opened={formOpened}
        close={closeForm}
        confirm={createUser}
      />
      <SearchInput />
      <Button
        disabled={!AbleToEdit}
        color="secondary"
        variant="contained"
        onClick={CreateDepartmentClick}
      >
        Create
      </Button>
    </>
  );
};
