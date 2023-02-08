import { useQuery } from '@apollo/client';
import { FormControl, InputLabel, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';

import { DEPARTMENTS } from '../../graphql/departments/query';
import { POSITIONS } from '../../graphql/positions/query';
import { IFormInput } from '../../graphql/user/IFormInput';
import { IDepartment } from '../../interfaces/IDepartment';
import { IPosition } from '../../interfaces/IPosition';
import { IUser } from '../../interfaces/IUser';
import Loader from '../Loader';
import {
  StyledBox,
  StyledButton,
  StyledOutlinedInput,
  StyledSelect
} from './UserProfileForm.styles';

interface Props {
  user?: IUser;
  ableToEdit: boolean;
  updateUser: (data: IFormInput) => void;
}

const UserProfileForm: React.FC<Props> = ({ user, ableToEdit, updateUser }) => {
  const {
    loading: departmentsLoading,
    error: departmentsError,
    data: departmentsData
  } = useQuery<{ departments: IDepartment[] }>(DEPARTMENTS);
  const {
    loading: positionsLoading,
    error: positionsError,
    data: positionsData
  } = useQuery<{ positions: IPosition[] }>(POSITIONS);

  const { register, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      firstName: user?.profile.first_name,
      lastName: user?.profile.last_name,
      department: user?.department?.id,
      position: user?.position?.id
    }
  });

  const onSubmit = async (data: IFormInput) => {
    updateUser(data);
  };

  if (positionsLoading || departmentsLoading) {
    return <Loader />;
  }

  if (positionsError) {
    return <div>{positionsError.message}</div>;
  }

  if (departmentsError) {
    return <div>{departmentsError.message}</div>;
  }

  return (
    <StyledBox marginY={6} component="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <InputLabel htmlFor="first-name">First name</InputLabel>
        <StyledOutlinedInput
          id="first-name"
          label="First name"
          disabled={!ableToEdit}
          {...register('firstName')}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="last-name">Last name</InputLabel>
        <StyledOutlinedInput
          id="last-name"
          label="Last name"
          disabled={!ableToEdit}
          {...register('lastName')}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="department">Department</InputLabel>
        <StyledSelect
          id="department"
          label="Department"
          defaultValue={user?.department?.id}
          disabled={!ableToEdit}
          {...register('department')}
        >
          <MenuItem value="">No department</MenuItem>
          {departmentsData?.departments.map(({ id, name }) => (
            <MenuItem key={name} value={id}>
              {name}
            </MenuItem>
          ))}
        </StyledSelect>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="position">Position</InputLabel>
        <StyledSelect
          id="position"
          label="Position"
          defaultValue={user?.position?.id}
          disabled={!ableToEdit}
          {...register('position')}
        >
          <MenuItem value="">No position</MenuItem>
          {positionsData?.positions.map(({ id, name }) => (
            <MenuItem key={name} value={id}>
              {name}
            </MenuItem>
          ))}
        </StyledSelect>
      </FormControl>
      <StyledButton
        variant="contained"
        color="secondary"
        type="submit"
        disabled={!ableToEdit}
      >
        Save
      </StyledButton>
    </StyledBox>
  );
};

export default UserProfileForm;
