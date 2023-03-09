import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { Controller, ControllerRenderProps, useForm } from 'react-hook-form';

import { DEPARTMENTS } from '@graphql/departments/query';
import { POSITIONS } from '@graphql/positions/query';
import { IFormInput } from '@graphql/user/IFormInput';
import { IDepartment } from '@interfaces/IDepartment';
import { IPosition } from '@interfaces/IPosition';
import { IUser } from '@interfaces/IUser';
import CustomSelect from '../CustomSelect';
import CustomTextField from '../CustomTextField';
import Preloader from '../Preloader';
import { StyledBox, StyledButton } from './UserProfileForm.styles';

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
        <CustomTextField
          label="First name"
          props={{ ...field, disabled: !ableToEdit }}
        />
      )
    },
    {
      name: 'lastName',
      defaultValue: user?.profile.last_name,
      render: ({ field }: Render) => (
        <CustomTextField
          label="Last name"
          props={{ ...field, disabled: !ableToEdit }}
        />
      )
    },
    {
      name: 'department',
      defaultValue: user?.department?.id,
      render: ({ field }: Render) => (
        <CustomSelect
          label="Department"
          props={{
            ...field,
            defaultValue: user?.department?.id,
            disabled: !ableToEdit
          }}
          options={[
            { value: '', label: 'No department' },
            ...(departmentsData?.departments.map(({ id, name }) => ({
              value: id,
              label: name
            })) || [])
          ]}
        />
      )
    },
    {
      name: 'position',
      defaultValue: user?.position?.id,
      render: ({ field }: Render) => (
        <CustomSelect
          label="Department"
          props={{
            ...field,
            defaultValue: user?.position?.id,
            disabled: !ableToEdit
          }}
          options={[
            { value: '', label: 'No position' },
            ...(positionsData?.positions.map(({ id, name }) => ({
              value: id,
              label: name
            })) || [])
          ]}
        />
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
