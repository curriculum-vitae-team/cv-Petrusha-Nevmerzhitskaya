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

type FieldNames = 'skill_name' | 'mastery';

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
      name: 'skill_name',
      defaultValue: '',
      render: ({ field }: Render) => (
        <FormControl>
          <InputLabel htmlFor="skill_name">Skill</InputLabel>
          <OutlinedInput id="skill_name" label="Skill" {...field} />
        </FormControl>
      )
    },
    {
      name: 'mastery',
      defaultValue: '',
      render: ({ field }: Render) => (
        <FormControl>
          <InputLabel htmlFor="mastery">Mastery</InputLabel>
          <Select id="proficiency" label="Proficiency" {...field}>
            <MenuItem value="novice">Novice</MenuItem>
            <MenuItem value="advanced">Advanced</MenuItem>
            <MenuItem value="competent">Competent</MenuItem>
            <MenuItem value="proficient">Proficient</MenuItem>
            <MenuItem value="expert">Expert</MenuItem>
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
