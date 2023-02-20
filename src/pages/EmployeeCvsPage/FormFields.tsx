import { Checkbox, FormControlLabel } from '@mui/material';
import { Control, Controller, ControllerRenderProps } from 'react-hook-form';

import CustomSelect from '@components/CustomSelect';
import CustomTextField from '@components/CustomTextField';
import { IProjectsResult } from '@graphql/projects/IProjectsResult';
import { IUsersResult } from '@graphql/users/IUsersResult';
import { ICv } from '@interfaces/ICv';
import { IUser } from '@interfaces/IUser';
import { IFormInput } from './IFormInput';

interface Props {
  cv: ICv | null;
  user?: IUser;
  usersData?: IUsersResult;
  projectsData?: IProjectsResult;
  control: Control<IFormInput, any>;
}

type FieldNames =
  | 'name'
  | 'description'
  | 'userId'
  | 'projectsId'
  | 'isTemplate';

interface Render {
  field: ControllerRenderProps<IFormInput, FieldNames>;
}

interface FormField {
  name: FieldNames;
  defaultValue?: string | string[] | boolean;
  render: (renderParam: Render) => JSX.Element;
}

const FormFields: React.FC<Props> = ({
  cv,
  user,
  usersData,
  projectsData,
  control
}) => {
  const projectsIds = cv?.projects?.map((project) => project.id) || [];

  const formFields: FormField[] = [
    {
      name: 'name',
      defaultValue: cv?.name || '',
      render: ({ field }: Render) => (
        <CustomTextField label="Name" props={field} />
      )
    },
    {
      name: 'description',
      defaultValue: cv?.description || '',
      render: ({ field }: Render) => (
        <CustomTextField label="Description" props={field} />
      )
    },
    {
      name: 'userId',
      defaultValue: user?.id || '',
      render: ({ field }: Render) => (
        <CustomSelect
          label="User ID"
          props={{
            ...field,
            defaultValue: user?.id || ''
          }}
          options={
            usersData?.users.map(({ id, email }) => ({
              value: id,
              label: email
            })) || []
          }
        />
      )
    },
    {
      name: 'projectsId',
      defaultValue: projectsIds,
      render: ({ field }: Render) => (
        <CustomSelect
          label="Projects"
          props={{
            ...field,
            multiple: true
          }}
          options={[
            { value: '', label: '' },
            ...(projectsData?.projects.map(({ id, name }) => ({
              value: id,
              label: name
            })) || [])
          ]}
        />
      )
    },
    {
      name: 'isTemplate',
      defaultValue: cv?.is_template,
      render: ({ field }: Render) => (
        <FormControlLabel
          control={<Checkbox defaultChecked={cv?.is_template} {...field} />}
          label="Is template"
        />
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
