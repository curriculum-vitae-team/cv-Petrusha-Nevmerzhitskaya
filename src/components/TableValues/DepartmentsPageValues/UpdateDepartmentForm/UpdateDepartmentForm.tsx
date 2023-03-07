import { useMutation } from '@apollo/client';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogContent, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import Preloader from '@components/Preloader';
import { DEPARTMENTS, UPDATE_DEPARTMENT } from '@graphql/departments/query';
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

const UpdateDepartmentForm: React.FC<Props> = ({
  close,
  confirm,
  opened,
  id
}) => {
  const { control, handleSubmit, reset } = useForm<IFormInput>();

  const [UpdateDepartment, { loading }] = useMutation(UPDATE_DEPARTMENT, {
    refetchQueries: [{ query: DEPARTMENTS }]
  });

  const onSubmit = async (inputs: IFormInput) => {
    await UpdateDepartment({
      variables: {
        id,
        department: {
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
          Update Department
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

export default UpdateDepartmentForm;
