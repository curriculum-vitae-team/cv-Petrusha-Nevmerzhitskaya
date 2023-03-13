import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';
import { Control, Controller, ControllerRenderProps } from 'react-hook-form';
import { IProjectsResult } from '@graphql/projects/IProjectsResult';
import { IFormInput } from './IFormInput';

interface Props {
  control: Control<IFormInput, any>;
  projectsData?: IProjectsResult;
}

type FieldNames = 'projects';

interface Render {
  field: ControllerRenderProps<IFormInput, FieldNames>;
}

interface FormField {
  name: FieldNames;
  defaultValue?: string | boolean | undefined;
  render: (renderParam: Render) => JSX.Element;
}

const FormFields: React.FC<Props> = ({ control, projectsData }) => {
  const formFields: FormField[] = [
    {
      name: 'projects',
      render: ({ field }: Render) => (
        <FormControl>
          <InputLabel htmlFor="projects">Projects</InputLabel>
          <Select
            id="projects"
            label="Projects"
            defaultValue={[]}
            multiple
            {...field}
          >
            {projectsData?.projects.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                <FormControlLabel control={<Checkbox />} label={name} />
              </MenuItem>
            ))}
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
