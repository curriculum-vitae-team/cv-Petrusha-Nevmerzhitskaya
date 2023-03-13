import { useMutation } from '@apollo/client';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogContent, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import Preloader from '@components/Preloader';
import { CREATE_DEPARTMENT, DEPARTMENTS } from '@graphql/departments/query';
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
}

const CreateDepartmentForm: React.FC<Props> = ({ close, confirm, opened }) => {
  const { control, handleSubmit, reset } = useForm<IFormInput>();

  const [CreateDepartment, { loading }] = useMutation(CREATE_DEPARTMENT, {
    refetchQueries: [{ query: DEPARTMENTS }]
  });

  const onSubmit = async (inputs: IFormInput) => {
    await CreateDepartment({
      variables: {
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
          Create Department
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

export default CreateDepartmentForm;
