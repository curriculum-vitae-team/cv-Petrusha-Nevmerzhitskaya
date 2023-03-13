import { useMutation } from '@apollo/client';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import EmployeeTabs from '@components/EmployeeTabs';
import Preloader from '@components/Preloader';
import { UPDATE_USER } from '@graphql/user/mutation';
import { USER } from '@graphql/user/query';
import useUserData from '@hooks/useUserData';
import isAbleToEdit from '@utils/isAbleToEdit';
import AddLanguageForm from './AddLanguageForm';
import { createArrayForLanguages } from './AddLanguageForm/AddLanguageForm';
import { IFormInput } from './AddLanguageForm/IFormInput';
import * as Styled from './EmployeeLanguagePage.styles';

const EmployeeLanguagesPage: React.FC = () => {
  const { user, loggedUser, loading, error } = useUserData();
  const AbleToEdit = isAbleToEdit(loggedUser, user);

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

  const [updateUserMutation] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: USER, variables: { id: user?.id } }]
  });

  const handleDelete = async (language: IFormInput) => {
    await updateUserMutation({
      variables: {
        id: user?.id,
        user: {
          profile: {
            first_name: user?.profile.first_name || '',
            last_name: user?.profile.last_name || '',
            languages: createArrayForLanguages(user?.profile.languages).filter(
              (elem) => JSON.stringify(elem) !== JSON.stringify(language)
            )
          },
          departmentId: user?.department?.id || '',
          positionId: user?.position?.id || ''
        }
      }
    });
  };
  const onDeleteSkill = (language_name: string, proficiency: string) => {
    return () => handleDelete({ language_name, proficiency });
  };

  return (
    <Preloader loading={loading} error={error}>
      <EmployeeTabs />
      <AddLanguageForm opened={formOpened} close={closeForm} confirm={create} />
      <Styled.PaperWrapper elevation={7}>
        <Styled.StyledBox>
          {user?.profile.languages.length !== 0 ? (
            user?.profile.languages.map((language) => (
              <Styled.ItemBox key={language.language_name}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    {language.language_name}
                  </Typography>
                  <IconButton
                    disabled={!AbleToEdit}
                    aria-label="delete"
                    onClick={onDeleteSkill(
                      language.language_name,
                      language.proficiency
                    )}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>

                <Typography>Language level: {language.proficiency}</Typography>
              </Styled.ItemBox>
            ))
          ) : (
            <Typography>No languages were found</Typography>
          )}
        </Styled.StyledBox>
        <Button
          disabled={!AbleToEdit}
          color="secondary"
          variant="contained"
          onClick={CreateClick}
          sx={Styled.ButtonStyles}
        >
          Add language
        </Button>
      </Styled.PaperWrapper>
    </Preloader>
  );
};

export default EmployeeLanguagesPage;
