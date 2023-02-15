import CloseIcon from '@mui/icons-material/Close';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton
} from '@mui/material';

import { StyledButton, StyledDialogTitle } from './ConfirmDialog.styles';

interface Props {
  opened: boolean;
  close: () => void;
  confirm: () => void;
  titleText: string;
  contentText: string;
}

const ConfirmDialog: React.FC<Props> = ({
  close,
  confirm,
  opened,
  titleText,
  contentText
}) => {
  return (
    <Dialog open={opened} onClose={close}>
      <StyledDialogTitle>
        {titleText}
        <IconButton onClick={close}>
          <CloseIcon />
        </IconButton>
      </StyledDialogTitle>
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <StyledButton variant="outlined" onClick={close}>
          Cancel
        </StyledButton>
        <StyledButton
          variant="contained"
          color="secondary"
          onClick={confirm}
          autoFocus
        >
          Confirm
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
