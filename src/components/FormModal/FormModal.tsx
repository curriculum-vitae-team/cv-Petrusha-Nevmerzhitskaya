import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, IconButton } from '@mui/material';

import {
  StyledButton,
  StyledDialogTitle,
  StyledForm
} from './FormModal.styles';

interface Props {
  close: () => void;
  opened: boolean;
  title: string;
  children: any;
  submit: React.FormEventHandler<HTMLFormElement>;
  disabled?: boolean;
}

const FormModal: React.FC<Props> = ({
  close,
  opened,
  title,
  children,
  submit,
  disabled = false
}) => {
  return (
    <Dialog open={opened} onClose={close} maxWidth="sm" fullWidth>
      <StyledDialogTitle>
        {title}
        <IconButton onClick={close}>
          <CloseIcon />
        </IconButton>
      </StyledDialogTitle>
      <DialogContent>
        <StyledForm onSubmit={submit}>
          {children}
          <StyledButton
            variant="contained"
            color="secondary"
            type="submit"
            disabled={disabled}
          >
            Save
          </StyledButton>
        </StyledForm>
      </DialogContent>
    </Dialog>
  );
};

export default FormModal;
