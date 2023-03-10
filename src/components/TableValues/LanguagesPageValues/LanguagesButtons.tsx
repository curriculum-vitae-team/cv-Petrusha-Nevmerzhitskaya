import { useReactiveVar } from '@apollo/client';
import { Button } from '@mui/material';
import { useState } from 'react';
import SearchInput from '@components/Table/SearchInput';
import { authService } from '@graphql/auth/authService';
import isAdmin from '@utils/isAdmin';
import CreateSkillForm from './CreateLanguageForm';

export const LanguagesTableButtons = () => {
  const user = useReactiveVar(authService.user$);
  const AbleToEdit = isAdmin(user);
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
      <CreateSkillForm opened={formOpened} close={closeForm} confirm={create} />
      <SearchInput />
      <Button
        disabled={!AbleToEdit}
        color="secondary"
        variant="contained"
        onClick={CreateClick}
      >
        Create Language
      </Button>
    </>
  );
};
