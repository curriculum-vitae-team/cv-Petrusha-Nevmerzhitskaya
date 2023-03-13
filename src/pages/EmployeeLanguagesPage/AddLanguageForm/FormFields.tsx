import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select
} from '@mui/material';
import { Control, Controller, ControllerRenderProps } from 'react-hook-form';
import { IFormInput } from './IFormInput';

interface Props {
  control: Control<IFormInput, any>;
}

type FieldNames = 'language_name' | 'proficiency';

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
      name: 'language_name',
      defaultValue: '',
      render: ({ field }: Render) => (
        <FormControl>
          <InputLabel htmlFor="language_name">Language</InputLabel>
          <OutlinedInput id="language_name" label="Language" {...field} />
        </FormControl>
      )
    },
    {
      name: 'proficiency',
      defaultValue: '',
      render: ({ field }: Render) => (
        <FormControl>
          <InputLabel htmlFor="proficiency">Proficiency</InputLabel>
          <Select id="proficiency" label="Proficiency" {...field}>
            <MenuItem value="a1">A1</MenuItem>
            <MenuItem value="a2">A2</MenuItem>
            <MenuItem value="b1">B1</MenuItem>
            <MenuItem value="b2">B2</MenuItem>
            <MenuItem value="c1">C1</MenuItem>
            <MenuItem value="c2">C2</MenuItem>
            <MenuItem value="native">Native</MenuItem>
          </Select>
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
