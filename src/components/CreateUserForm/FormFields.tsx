import { FormControl, InputLabel, MenuItem } from '@mui/material';
import { Control, Controller, ControllerRenderProps } from 'react-hook-form';

import { ICvsResult } from '../../graphql/cvs/ICvsResult';
import { IDepartmentResult } from '../../graphql/departments/IDepartmentsResult';
import { IPositionResult } from '../../graphql/positions/IpositionResult';
import { StyledOutlinedInput, StyledSelect } from './CreateUserForm.styles';
import { IFormInput } from './IFormInput';

interface Props {
  control: Control<IFormInput, any>;
  cvsData?: ICvsResult;
  departmentsData?: IDepartmentResult;
  positionsData?: IPositionResult;
}

type FieldNames =
  | 'email'
  | 'password'
  | 'department'
  | 'position'
  | 'firstName'
  | 'lastName'
  | 'cvs'
  | 'role';

interface Render {
  field: ControllerRenderProps<IFormInput, FieldNames>;
}

interface FormField {
  name: FieldNames;
  defaultValue?: string | string[];
  render: (renderParam: Render) => JSX.Element;
}

const FormFields: React.FC<Props> = ({
  control,
  cvsData,
  departmentsData,
  positionsData
}) => {
  const formFields: FormField[] = [
    {
      name: 'email',
      defaultValue: '',
      render: ({ field }: Render) => (
        <FormControl>
          <InputLabel htmlFor="email">Email</InputLabel>
          <StyledOutlinedInput id="email" label="Email" {...field} />
        </FormControl>
      )
    },
    {
      name: 'password',
      defaultValue: '',
      render: ({ field }: Render) => (
        <FormControl>
          <InputLabel htmlFor="password">Password</InputLabel>
          <StyledOutlinedInput id="password" label="Password" {...field} />
        </FormControl>
      )
    },
    {
      name: 'firstName',
      defaultValue: '',
      render: ({ field }: Render) => (
        <FormControl>
          <InputLabel htmlFor="first-name">First name</InputLabel>
          <StyledOutlinedInput id="first-name" label="First name" {...field} />
        </FormControl>
      )
    },
    {
      name: 'lastName',
      defaultValue: '',
      render: ({ field }: Render) => (
        <FormControl>
          <InputLabel htmlFor="last-name">Last name</InputLabel>
          <StyledOutlinedInput id="last-name" label="Last name" {...field} />
        </FormControl>
      )
    },
    {
      name: 'cvs',
      defaultValue: [],
      render: ({ field }: Render) => (
        <FormControl>
          <InputLabel htmlFor="cvs">Cvs</InputLabel>
          <StyledSelect
            id="cvs"
            label="Cvs"
            fullWidth={false}
            defaultValue={[]}
            multiple
            {...field}
          >
            {cvsData?.cvs.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </StyledSelect>
        </FormControl>
      )
    },
    {
      name: 'department',
      defaultValue: '',
      render: ({ field }: Render) => (
        <FormControl>
          <InputLabel htmlFor="department">Department</InputLabel>
          <StyledSelect
            id="department"
            label="Department"
            defaultValue=""
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
      defaultValue: '',
      render: ({ field }: Render) => (
        <FormControl>
          <InputLabel htmlFor="position">Position</InputLabel>
          <StyledSelect
            id="position"
            label="Position"
            defaultValue=""
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
    },
    {
      name: 'role',
      defaultValue: 'employee',
      render: ({ field }: Render) => (
        <FormControl>
          <InputLabel htmlFor="role">Role</InputLabel>
          <StyledSelect
            id="role"
            label="Role"
            defaultValue="employee"
            {...field}
          >
            <MenuItem value="employee">Employee</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </StyledSelect>
        </FormControl>
      )
    }
  ];

  return (
    <>
      {formFields.map((field) => (
        <Controller key={field.name} control={control} {...field} />
      ))}
    </>
  );
};

export default FormFields;
