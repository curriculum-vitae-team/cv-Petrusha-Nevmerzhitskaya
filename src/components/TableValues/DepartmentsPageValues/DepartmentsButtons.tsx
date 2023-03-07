import { Button } from '@mui/material';
import { useState } from 'react';
import SearchInput from '@components/Table/SearchInput';
import CreateDepartmentForm from './CreateDepartmentForm';

export const DepartmentsTableButtons = () => {
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
        color="secondary"
        variant="contained"
        onClick={CreateDepartmentClick}
      >
        Create
      </Button>
    </>
  );
};
