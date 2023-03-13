import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { Control, Controller, ControllerRenderProps } from 'react-hook-form';
import { IFormInput } from './IFormInput';

interface Props {
  control: Control<IFormInput, any>;
}

type FieldNames =
  | 'name'
  | 'internal_name'
  | 'description'
  | 'domain'
  | 'team_size'
  | 'start_date'
  | 'end_date';

interface Render {
  field: ControllerRenderProps<IFormInput, FieldNames>;
}

interface FormField {
  name: FieldNames;
  defaultValue?: string | undefined | number;
  render: (renderParam: Render) => JSX.Element;
}

const FormFields: React.FC<Props> = ({ control }) => {
  const formFields: FormField[] = [
    {
      name: 'name',
      defaultValue: '',
      render: ({ field }: Render) => (
        <FormControl>
          <InputLabel htmlFor="name">Project name</InputLabel>
          <OutlinedInput id="name" label="Project name" {...field} />
        </FormControl>
      )
    },
    {
      name: 'internal_name',
      defaultValue: '',
      render: ({ field }: Render) => (
        <FormControl>
          <InputLabel htmlFor="internal_name">Internal name</InputLabel>
          <OutlinedInput id="internal_name" label="Internal name" {...field} />
        </FormControl>
      )
    },
    {
      name: 'description',
      defaultValue: '',
      render: ({ field }: Render) => (
        <FormControl>
          <InputLabel htmlFor="description">Description</InputLabel>
          <OutlinedInput id="description" label="Description" {...field} />
        </FormControl>
      )
    },
    {
      name: 'domain',
      defaultValue: '',
      render: ({ field }: Render) => (
        <FormControl>
          <InputLabel htmlFor="domain">Domain</InputLabel>
          <OutlinedInput id="domain" label="Domain" {...field} />
        </FormControl>
      )
    },
    {
      name: 'team_size',
      defaultValue: 1,
      render: ({ field }: Render) => (
        <FormControl>
          <InputLabel htmlFor="team_size">Team size</InputLabel>
          <OutlinedInput id="team_size" label="Team size" {...field} />
        </FormControl>
      )
    },
    {
      name: 'start_date',
      defaultValue: '2023-03-10',
      render: ({ field }: Render) => (
        <FormControl>
          <InputLabel htmlFor="start_date">Start date</InputLabel>
          <OutlinedInput id="start_date" label="Start date" {...field} />
        </FormControl>
      )
    },
    {
      name: 'end_date',
      defaultValue: '2023-03-15',
      render: ({ field }: Render) => (
        <FormControl>
          <InputLabel htmlFor="end_date">End date</InputLabel>
          <OutlinedInput id="end_date" label="End date" {...field} />
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
