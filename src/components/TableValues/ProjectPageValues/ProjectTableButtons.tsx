import { Button } from '@mui/material';
import { useState } from 'react';
import SearchInput from '@components/Table/SearchInput';
import CreateProjectForm from './CreateProjectsForm';

export const ProjectsTableButtons = () => {
  const [formOpened, setFormOpened] = useState(false);
  const CreateClick = () => {
    setFormOpened(true);
  };

  const closeForm = () => {
    setFormOpened(false);
  };

  const create = async () => {
    closeForm();
  };
  return (
    <>
      <CreateProjectForm
        opened={formOpened}
        close={closeForm}
        confirm={create}
      />
      <SearchInput />
      <Button color="secondary" variant="contained" onClick={CreateClick}>
        Create Project
      </Button>
    </>
  );
};
