import { useMutation } from '@apollo/client';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogContent, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import Preloader from '@components/Preloader';
import { UPDATE_POSITION } from '@graphql/positions/mutation';
import { POSITIONS } from '@graphql/positions/query';
import {
  StyledBox,
  StyledDialogTitle
} from '../../CvsPageValues/CreateCvForm/CreateCvForm.styles';
import { IFormInput } from '../../CvsPageValues/CreateCvForm/IFormInput';
import FormFields from './FormFields';

interface Props {
  opened: boolean;
  close: () => void;
  confirm: () => void;
  id: string;
}

const UpdatePositionForm: React.FC<Props> = ({
  close,
  confirm,
  opened,
  id
}) => {
  const { control, handleSubmit, reset } = useForm<IFormInput>();

  const [UpdatePosition, { loading }] = useMutation(UPDATE_POSITION, {
    refetchQueries: [{ query: POSITIONS }]
  });

  const onSubmit = async (inputs: IFormInput) => {
    await UpdatePosition({
      variables: {
        id,
        position: {
          name: inputs.name
        }
      }
    });

    reset();
  };

  return (
    <Preloader loading={loading}>
      <Dialog open={opened} onClose={close}>
        <StyledDialogTitle>
          Update Position
          <IconButton onClick={close}>
            <CloseIcon />
          </IconButton>
        </StyledDialogTitle>
        <DialogContent>
          <StyledBox
            marginTop={3}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormFields control={control} />
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              onClick={confirm}
            >
              Save
            </Button>
          </StyledBox>
        </DialogContent>
      </Dialog>
    </Preloader>
  );
};

export default UpdatePositionForm;
