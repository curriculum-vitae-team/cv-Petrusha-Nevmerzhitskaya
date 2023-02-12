import { useMutation } from '@apollo/client';
import { Box, Chip, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import EmployeeTabs from '../../components/EmployeeTabs';
import Preloader from '../../components/Preloader';
import { UPDATE_USER } from '../../graphql/user/mutation';
import { USER } from '../../graphql/user/query';
import useUserData from '../../hooks/useUserData';
import isAbleToEdit from '../../utils/isAbleToEdit';
import {
  StyledBox,
  StyledButton,
  StyledForm,
  StyledFormControl,
  StyledInputLabel,
  StyledOutlinedInput
} from './EmployeeSkillsPage.styles';

interface IFormInput {
  skillName: string;
  mastery: string;
}

const EmployeeSkillsPage: React.FC = () => {
  const { user, loggedUser, loading, error } = useUserData();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<IFormInput>({
    defaultValues: {
      skillName: '',
      mastery: ''
    }
  });

  const [updateUserMutation, { loading: updateUserLoading }] = useMutation(
    UPDATE_USER,
    {
      refetchQueries: [{ query: USER, variables: { id: user?.id } }]
    }
  );

  const ableToEdit = isAbleToEdit(loggedUser, user);

  const onSubmit = async ({ skillName, mastery }: IFormInput) => {
    reset();

    // doesn't work because of the backend
    await updateUserMutation({
      variables: {
        id: user?.id,
        user: {
          profile: {
            skills: [{ skill_name: skillName, mastery }]
          }
        }
      }
    });
  };

  return (
    <Preloader loading={loading || updateUserLoading} error={error}>
      <>
        <EmployeeTabs />
        <Box width={750} margin="auto" marginY={6}>
          <Box>
            {user?.profile.skills.map((skill) => (
              <StyledBox key={skill.skill_name}>
                <Typography>{skill.skill_name}</Typography>
                <Chip label={skill.mastery} variant="outlined" />
              </StyledBox>
            ))}
          </Box>
          {ableToEdit && (
            <StyledForm
              component="form"
              marginTop={5}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Typography variant="h6">New skill</Typography>
              <StyledFormControl>
                <StyledInputLabel htmlFor="skill-name">
                  Skill name
                </StyledInputLabel>
                <StyledOutlinedInput
                  id="skill-name"
                  label="Skill name"
                  size="small"
                  {...register('skillName', { required: true })}
                />
              </StyledFormControl>
              <StyledFormControl>
                <StyledInputLabel htmlFor="mastery">Mastery</StyledInputLabel>
                <StyledOutlinedInput
                  id="mastery"
                  label="mastery"
                  size="small"
                  {...register('mastery', { required: true })}
                />
              </StyledFormControl>
              {(errors.skillName || errors.mastery) && (
                <Typography color="secondary">
                  Skill name and mastery can&apos;t be empty
                </Typography>
              )}
              <StyledButton variant="contained" color="secondary" type="submit">
                Save
              </StyledButton>
            </StyledForm>
          )}
        </Box>
      </>
    </Preloader>
  );
};

export default EmployeeSkillsPage;
