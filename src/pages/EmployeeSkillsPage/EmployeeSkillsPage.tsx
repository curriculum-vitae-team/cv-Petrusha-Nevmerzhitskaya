import { useMutation } from '@apollo/client';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Chip, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import EmployeeTabs from '@components/EmployeeTabs';
import Preloader from '@components/Preloader';
import { UPDATE_USER } from '@graphql/user/mutation';
import { USER } from '@graphql/user/query';
import useUserData from '@hooks/useUserData';
import isAbleToEdit from '@utils/isAbleToEdit';
import AddLanguageForm from './AddSkillForm';
import { createArrayForSkills } from './AddSkillForm/AddSkillForm';
import { IFormInput } from './AddSkillForm/IFormInput';
import * as Styled from './EmployeeSkillsPage.styles';

const EmployeeSkillsPage: React.FC = () => {
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

  const handleDelete = async (skill: IFormInput) => {
    await updateUserMutation({
      variables: {
        id: user?.id,
        user: {
          profile: {
            first_name: user?.profile.first_name || '',
            last_name: user?.profile.last_name || '',
            skills: createArrayForSkills(user?.profile.skills).filter(
              (elem) => JSON.stringify(elem) !== JSON.stringify(skill)
            )
          },
          departmentId: user?.department?.id || '',
          positionId: user?.position?.id || ''
        }
      }
    });
  };
  const onDeleteSkill = (skill_name: string, mastery: string) => {
    return () => handleDelete({ skill_name, mastery });
  };

  return (
    <Preloader loading={loading} error={error}>
      <EmployeeTabs />
      <AddLanguageForm opened={formOpened} close={closeForm} confirm={create} />
      <Styled.PaperWrapper elevation={7}>
        <Box>
          {user?.profile.skills.length !== 0 ? (
            user?.profile.skills.map((skill) => (
              <Styled.StyledBox key={skill.skill_name}>
                <Typography>{skill.skill_name}</Typography>
                <Chip label={skill.mastery} variant="outlined" />
                <IconButton
                  disabled={!AbleToEdit}
                  aria-label="delete"
                  onClick={onDeleteSkill(skill.skill_name, skill.mastery)}
                >
                  <CloseIcon />
                </IconButton>
              </Styled.StyledBox>
            ))
          ) : (
            <Typography>No skills were found</Typography>
          )}
        </Box>
        <Button
          disabled={!AbleToEdit}
          color="secondary"
          variant="contained"
          onClick={CreateClick}
          sx={Styled.ButtonStyles}
        >
          Add skill
        </Button>
      </Styled.PaperWrapper>
    </Preloader>
  );
};

export default EmployeeSkillsPage;
