import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { Control, Controller, ControllerRenderProps } from 'react-hook-form';
import { IFormInput } from '../../CvsPageValues/CreateCvForm/IFormInput';

interface Props {
  control: Control<IFormInput, any>;
}

type FieldNames = 'name' | 'description' | 'template';

interface Render {
  field: ControllerRenderProps<IFormInput, FieldNames>;
}

interface FormField {
  name: FieldNames;
  defaultValue?: string | boolean | undefined;
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
