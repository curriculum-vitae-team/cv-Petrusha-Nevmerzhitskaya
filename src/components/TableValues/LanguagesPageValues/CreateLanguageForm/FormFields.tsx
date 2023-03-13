import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { Control, Controller, ControllerRenderProps } from 'react-hook-form';
import { IFormInput } from './IFormInput';

interface Props {
  control: Control<IFormInput, any>;
}

type FieldNames = 'name' | 'iso2' | 'native_name';

interface Render {
  field: ControllerRenderProps<IFormInput, FieldNames>;
}

interface FormField {
  name: FieldNames;
  defaultValue?: string | undefined;
  render: (renderParam: Render) => JSX.Element;
}

const FormFields: React.FC<Props> = ({ control }) => {
  const formFields: FormField[] = [
    {
      name: 'name',
      defaultValue: '',
      render: ({ field }: Render) => (
        <FormControl>
          <InputLabel htmlFor="name">Name</InputLabel>
          <OutlinedInput id="name" label="Name" {...field} />
        </FormControl>
      )
    },
    {
      name: 'iso2',
      defaultValue: '',
      render: ({ field }: Render) => (
        <FormControl>
          <InputLabel htmlFor="iso2">ISO2</InputLabel>
          <OutlinedInput id="iso2" label="ISO2" {...field} />
        </FormControl>
      )
    },
    {
      name: 'native_name',
      defaultValue: '',
      render: ({ field }: Render) => (
        <FormControl>
          <InputLabel htmlFor="native_name">Native name</InputLabel>
          <OutlinedInput id="native_name" label="Native name" {...field} />
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
