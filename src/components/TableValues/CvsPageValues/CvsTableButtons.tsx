import { Button } from '@mui/material';
import { useState } from 'react';
import SearchInput from '@components/Table/SearchInput';
import CreateCvForm from './CreateCvForm';

export const CVsTableButtons = () => {
  const [formOpened, setFormOpened] = useState(false);
  const CreateCvClick = () => {
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
      <Button color="secondary" variant="contained" onClick={CreateCvClick}>
        Create CV
      </Button>
    </>
  );
};
