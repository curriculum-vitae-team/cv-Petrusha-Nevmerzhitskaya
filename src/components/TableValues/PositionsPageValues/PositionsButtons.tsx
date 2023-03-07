import { Button } from '@mui/material';
import { useState } from 'react';
import SearchInput from '@components/Table/SearchInput';
import CreateDepartmentForm from './CreatePositionForm';

export const PositionsTableButtons = () => {
  const [formOpened, setFormOpened] = useState(false);
  const CreateClick = () => {
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
      <Button color="secondary" variant="contained" onClick={CreateClick}>
        Create Position
      </Button>
    </>
  );
};
