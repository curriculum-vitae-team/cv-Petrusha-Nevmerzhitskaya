import { FormControl, InputLabel, MenuItem } from '@mui/material';
import { v4 } from 'uuid';

import { StyledSelect } from './CustomSelect.styles';

interface Option {
  label: string;
  value: string;
}

interface Props {
  label: string;
  props?: object;
  options: Option[];
}

const CustomSelect: React.FC<Props> = ({ label, props, options }) => {
  const id = v4();

  return (
    <FormControl>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <StyledSelect id={id} label={label} {...props}>
        {options.map(({ label, value }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </StyledSelect>
    </FormControl>
  );
};

export default CustomSelect;
