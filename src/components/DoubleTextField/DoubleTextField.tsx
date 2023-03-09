import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useState } from 'react';

import CustomSelect from '../CustomSelect';
import CustomTextField from '../CustomTextField';
import {
  StyledBox,
  StyledIconButton,
  StyledTypography
} from './DoubleTextField.styles';

interface Option {
  value: string;
  label: string;
}

interface Props {
  textFieldLabel: string;
  selectLabel: string;
  selectOptions: Option[];
  changeValues: (textValue: string, select: string) => void;
  values: string;
}

const DoubleTextField: React.FC<Props> = ({
  textFieldLabel,
  selectLabel,
  selectOptions,
  changeValues,
  values
}) => {
  const [textFieldValue, setTextFieldValue] = useState('');
  const [selectValue, setSelectValue] = useState('');

  const changeTextFieldValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextFieldValue(event.target.value);
  };

  const changeSelectValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(event.target.value);
  };

  const addValuesHandler = () => {
    if (!textFieldValue || !selectValue) {
      return;
    }

    setTextFieldValue('');
    setSelectValue('');
    changeValues(textFieldValue, selectValue);
  };

  return (
    <StyledBox>
      <StyledTypography>{values}</StyledTypography>
      <CustomTextField
        label={textFieldLabel}
        props={{ value: textFieldValue, onChange: changeTextFieldValue }}
      />
      <CustomSelect
        label={selectLabel}
        options={selectOptions}
        props={{ value: selectValue, onChange: changeSelectValue }}
      />
      <StyledIconButton onClick={addValuesHandler}>
        <AddCircleOutlineIcon />
      </StyledIconButton>
    </StyledBox>
  );
};

export default DoubleTextField;
