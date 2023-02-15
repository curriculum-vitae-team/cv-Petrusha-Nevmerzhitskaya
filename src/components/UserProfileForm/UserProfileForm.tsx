import { useQuery } from '@apollo/client';
import { FormControl, InputLabel, MenuItem } from '@mui/material';
import { Controller, ControllerRenderProps, useForm } from 'react-hook-form';

import { IDepartmentResult } from '../../graphql/departments/IDepartmentsResult';
import { DEPARTMENTS } from '../../graphql/departments/query';
import { IPositionResult } from '../../graphql/positions/IpositionResult';
import { POSITIONS } from '../../graphql/positions/query';
import { IFormInput } from '../../graphql/user/IFormInput';
import { IUser } from '../../interfaces/IUser';
import Preloader from '../Preloader';
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

type FieldNames = 'department' | 'position' | 'firstName' | 'lastName';

interface Render {
  field: ControllerRenderProps<IFormInput, FieldNames>;
}

interface FormField {
  name: FieldNames;
  defaultValue?: string;
  render: (renderParam: Render) => JSX.Element;
}

const UserProfileForm: React.FC<Props> = ({ user, ableToEdit, updateUser }) => {
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

  const {
    control,
    handleSubmit,
    formState: { dirtyFields }
  } = useForm<IFormInput>();

  const onSubmit = async (data: IFormInput) => {
    updateUser(data);
  };

  const formFields: FormField[] = [
    {
      name: 'firstName',
      defaultValue: user?.profile.first_name,
      render: ({ field }: Render) => (
        <FormControl>
          <InputLabel htmlFor="first-name">First name</InputLabel>
          <StyledOutlinedInput
            id="first-name"
            label="First name"
            disabled={!ableToEdit}
            {...field}
          />
        </FormControl>
      )
    },
    {
      name: 'lastName',
      defaultValue: user?.profile.last_name,
      render: ({ field }: Render) => (
        <FormControl>
          <InputLabel htmlFor="last-name">Last name</InputLabel>
          <StyledOutlinedInput
            id="last-name"
            label="Last name"
            disabled={!ableToEdit}
            {...field}
          />
        </FormControl>
      )
    },
    {
      name: 'department',
      defaultValue: user?.department?.id,
      render: ({ field }: Render) => (
        <FormControl>
          <InputLabel htmlFor="department">Department</InputLabel>
          <StyledSelect
            id="department"
            label="Department"
            defaultValue={user?.department?.id}
            disabled={!ableToEdit}
            {...field}
          >
            <MenuItem value="">No department</MenuItem>
            {departmentsData?.departments.map(({ id, name }) => (
              <MenuItem key={name} value={id}>
                {name}
              </MenuItem>
            ))}
          </StyledSelect>
        </FormControl>
      )
    },
    {
      name: 'position',
      defaultValue: user?.position?.id,
      render: ({ field }: Render) => (
        <FormControl>
          <InputLabel htmlFor="position">Position</InputLabel>
          <StyledSelect
            id="position"
            label="Position"
            defaultValue={user?.position?.id}
            disabled={!ableToEdit}
            {...field}
          >
            <MenuItem value="">No position</MenuItem>
            {positionsData?.positions.map(({ id, name }) => (
              <MenuItem key={name} value={id}>
                {name}
              </MenuItem>
            ))}
          </StyledSelect>
        </FormControl>
      )
    }
  ];

  const isDirty =
    !!dirtyFields.department ||
    !!dirtyFields.firstName ||
    !!dirtyFields.lastName ||
    !!dirtyFields.position;

  return (
    <Preloader
      loading={positionsLoading || departmentsLoading}
      error={positionsError || departmentsError}
    >
      <StyledBox marginY={6} component="form" onSubmit={handleSubmit(onSubmit)}>
        {formFields.map((field) => (
          <Controller key={field.name} control={control} {...field} />
        ))}
        <StyledButton
          variant="contained"
          color="secondary"
          type="submit"
          disabled={!ableToEdit || !isDirty}
        >
          Save
        </StyledButton>
      </StyledBox>
    </Preloader>
  );
};

export default UserProfileForm;
