import { FormControl, InputLabel } from '@mui/material';
import { v4 } from 'uuid';

import { StyledOutlinedInput } from './CustomTextField.styles';

interface Props {
  label: string;
  props?: object;
}

const CustomTextField: React.FC<Props> = ({ label, props }) => {
  const id = v4();

  return (
    <FormControl>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <StyledOutlinedInput id={id} label={label} {...props} />
    </FormControl>
  );
};

export default CustomTextField;
