import { useMutation, useQuery } from '@apollo/client';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import DoubleTextField from '../../components/DoubleTextField';
import FormModal from '../../components/FormModal';
import Preloader from '../../components/Preloader';
import ProfileLayout from '../../components/ProfileLayout';
import { UNBIND_CV, UPDATE_CV } from '../../graphql/cv/mutation';
import { IProjectsResult } from '../../graphql/projects/IProjectsResult';
import { PROJECTS } from '../../graphql/projects/query';
import { USER } from '../../graphql/user/query';
import { IUsersResult } from '../../graphql/users/IUsersResult';
import { USERS } from '../../graphql/users/query';
import useUserData from '../../hooks/useUserData';
import { ICv } from '../../interfaces/ICv';
import isAbleToEdit from '../../utils/isAbleToEdit';
import FormFields from './FormFields';
import { IFormInput } from './IFormInput';

type ValuesType = Array<{ [key: string]: string }>;

const languagesSelectOptions = [
  { value: 'a1', label: 'A1' },
  { value: 'a2', label: 'A2' },
  { value: 'b1', label: 'B1' },
  { value: 'b2', label: 'B2' },
  { value: 'c1', label: 'C1' },
  { value: 'c2', label: 'C2' },
  { value: 'native', label: 'Native' }
];

const skillsSelectOptions = [
  { value: 'novice', label: 'Novice' },
  { value: 'competent', label: 'Competent' },
  { value: 'proficient', label: 'Proficient' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'expert', label: 'Expert' }
];

const stringifyValues = (
  values: ValuesType,
  textFieldName: string,
  selectName: string
): string =>
  values
    .reduce(
      (res, cur) =>
        `${res}${res ? ', ' : ''}${cur[textFieldName]}:${cur[selectName]}`,
      ''
    )
    .toString();

const EmployeeCvsPage: React.FC = () => {
  const {
    user,
    loggedUser,
    loading: userLoading,
    error: userError
  } = useUserData();

  const {
    loading: usersLoading,
    error: usersError,
    data: usersData
  } = useQuery<IUsersResult>(USERS);
  const {
    loading: projectsLoading,
    error: projectsError,
    data: projectsData
  } = useQuery<IProjectsResult>(PROJECTS);

  const [
    unbindCvMutation,
    { loading: unbindCvLoading, error: unbindCvError }
  ] = useMutation(UNBIND_CV, {
    refetchQueries: [{ query: USER, variables: { id: user?.id } }]
  });
  const [
    updateCvMutation,
    { loading: updateCvLoading, error: updateCvError }
  ] = useMutation(UPDATE_CV, {
    refetchQueries: [{ query: USER, variables: { id: user?.id } }]
  });

  const { control, handleSubmit } = useForm<IFormInput>();

  const cvVisible = isAbleToEdit(loggedUser, user);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [modalOpened, setModalOpened] = useState(false);

  const [selectedCv, setSelectedCv] = useState<ICv | null>(null);

  const [skillsValues, setSkillsValues] = useState<ValuesType>([]);
  const [languagesValues, setLanguagesValues] = useState<ValuesType>([]);

  const addSkill = (textValue: string, select: string) => {
    setSkillsValues((prevState) => [
      ...prevState,
      { skill_name: textValue, mastery: select }
    ]);
  };

  const addLanguage = (textValue: string, select: string) => {
    setLanguagesValues((prevState) => [
      ...prevState,
      { language_name: textValue, proficiency: select }
    ]);
  };

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    cv: ICv
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedCv(cv);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const openModal = () => {
    setModalOpened(true);
    handleMenuClose();
  };

  const closeModal = () => {
    setModalOpened(false);
  };

  const unbindCv = async () => {
    await unbindCvMutation({
      variables: { id: selectedCv?.id }
    });

    handleMenuClose();
  };

  const updateCv = async (data: IFormInput) => {
    await updateCvMutation({
      variables: {
        id: selectedCv?.id,
        cv: {
          name: data.name,
          description: data.description,
          userId: data.userId,
          projectsIds: data.projectsId,
          skills: skillsValues,
          languages: languagesValues,
          is_template: data.isTemplate
        }
      }
    });

    closeModal();
  };

  const loading =
    userLoading ||
    unbindCvLoading ||
    updateCvLoading ||
    usersLoading ||
    projectsLoading;

  const error =
    userError || unbindCvError || updateCvError || usersError || projectsError;

  return (
    <Preloader loading={loading} error={error}>
      <ProfileLayout>
        <div>
          {cvVisible && (
            <>
              <Menu
                anchorEl={anchorEl}
                open={!!anchorEl}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={openModal}>Update</MenuItem>
                <MenuItem onClick={unbindCv}>Unassign</MenuItem>
              </Menu>
              <FormModal
                close={closeModal}
                opened={modalOpened}
                title="Update CV"
                submit={handleSubmit(updateCv)}
              >
                <FormFields
                  key={Math.random()}
                  cv={selectedCv}
                  user={user}
                  usersData={usersData}
                  projectsData={projectsData}
                  control={control}
                />
                <DoubleTextField
                  textFieldLabel="Skill name"
                  selectLabel="Mastery"
                  selectOptions={skillsSelectOptions}
                  changeValues={addSkill}
                  values={stringifyValues(
                    skillsValues,
                    'skill_name',
                    'mastery'
                  )}
                />
                <DoubleTextField
                  textFieldLabel="Language name"
                  selectLabel="Proficiency"
                  selectOptions={languagesSelectOptions}
                  changeValues={addLanguage}
                  values={stringifyValues(
                    languagesValues,
                    'language_name',
                    'proficiency'
                  )}
                />
              </FormModal>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Employee cvs</TableCell>
                      <TableCell padding="checkbox" />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {user?.cvs?.map((cv) => (
                      <TableRow key={cv.id}>
                        <TableCell>{cv.name}</TableCell>
                        <TableCell>
                          <IconButton
                            onClick={(event) => handleMenuOpen(event, cv)}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </div>
      </ProfileLayout>
    </Preloader>
  );
};

export default EmployeeCvsPage;
