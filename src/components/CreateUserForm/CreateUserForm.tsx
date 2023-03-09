import { useMutation, useQuery } from '@apollo/client';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';

import { ICvsResult } from '../../graphql/cvs/ICvsResult';
import { CVS } from '../../graphql/cvs/query';
import { IDepartmentResult } from '../../graphql/departments/IDepartmentsResult';
import { DEPARTMENTS } from '../../graphql/departments/query';
import { IPositionResult } from '../../graphql/positions/IpositionResult';
import { POSITIONS } from '../../graphql/positions/query';
import { CREATE_USER } from '../../graphql/user/mutation';
import { USERS } from '../../graphql/users/query';
import Preloader from '../Preloader';
import {
  StyledBox,
  StyledButton,
  StyledDialogTitle
} from './CreateUserForm.styles';
import FormFields from './FormFields';
import { IFormInput } from './IFormInput';

interface Props {
  opened: boolean;
  close: () => void;
  confirm: () => void;
}

const UserProfileForm: React.FC<Props> = ({ close, confirm, opened }) => {
  const {
    loading: departmentsLoading,
    error: departmentsError,
    data: departmentsData
  } = useQuery<IDepartmentResult>(DEPARTMENTS);
  const {
    loading: positionsLoading,
    error: positionsError,
    data: positionsData
  } = useQuery<IPositionResult>(POSITIONS);
  const { loading: cvsLoading, error: cvsError, data: cvsData } = useQuery<
    ICvsResult
  >(CVS);

  const { control, handleSubmit, watch, reset } = useForm<IFormInput>();

  const watchEmail = watch('email');
  const watchPassword = watch('password') || '';
  const disabled =
    !watchEmail?.match(/^(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})$/) ||
    watchPassword?.length < 4;

  const [createUserMutation, { loading, error }] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: USERS }]
  });

  const onSubmit = async ({
    email,
    password,
    firstName,
    lastName,
    cvs,
    department,
    position,
    role
  }: IFormInput) => {
    await createUserMutation({
      variables: {
        user: {
          auth: { email, password },
          profile: {
            first_name: firstName,
            last_name: lastName
          },
          cvsIds: cvs,
          departmentId: department,
          positionId: position,
          role
        }
      }
    });

    reset();
  };

  return (
    <Preloader
      loading={positionsLoading || departmentsLoading || cvsLoading || loading}
      error={positionsError || departmentsError || cvsError || error}
    >
      <Dialog open={opened} onClose={close}>
        <StyledDialogTitle>
          Create new employee
          <IconButton onClick={close}>
            <CloseIcon />
          </IconButton>
        </StyledDialogTitle>
        <DialogContent>
          <StyledBox
            marginTop={3}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormFields
              control={control}
              cvsData={cvsData}
              departmentsData={departmentsData}
              positionsData={positionsData}
            />
            <StyledButton
              variant="contained"
              color="secondary"
              type="submit"
              onClick={confirm}
              disabled={disabled}
            >
              Save
            </StyledButton>
          </StyledBox>
        </DialogContent>
      </Dialog>
    </Preloader>
  );
};

export default UserProfileForm;
