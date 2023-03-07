import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogContent, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Preloader from '@components/Preloader';
import { authService } from '@graphql/auth/authService';
import { UPDATE_CV } from '@graphql/cv/mutation';
import { CVS } from '@graphql/cvs/query';
import { USER } from '@graphql/user/query';
import { IUser } from '@interfaces/IUser';
import {
  StyledBox,
  StyledDialogTitle
} from '../CreateCvForm/CreateCvForm.styles';
import FormFields from '../CreateCvForm/FormFields';
import { IFormInput } from '../CreateCvForm/IFormInput';

interface Props {
  opened: boolean;
  close: () => void;
  confirm: () => void;
}

interface IUserAllResult {
  user: IUser;
}

const UpdateCvForm: React.FC<Props> = ({ close, confirm, opened }) => {
  const { id } = useParams();
  const { control, handleSubmit, reset } = useForm<IFormInput>();
  const user = useReactiveVar(authService.user$);

  const { data: userData } = useQuery<IUserAllResult>(USER, {
    variables: { id: user?.id }
  });

  const [updateCV, { loading }] = useMutation(UPDATE_CV, {
    refetchQueries: [{ query: CVS }]
  });

  const onSubmit = async (inputs: IFormInput) => {
    await updateCV({
      variables: {
        id,
        cv: {
          name: inputs.name,
          description: inputs.description,
          userId: userData?.user.id,
          skills: [],
          projectsIds: [],
          languages: [],
          is_template: inputs.template
        }
      }
    });

    reset();
  };

  return (
    <Preloader loading={loading}>
      <Dialog open={opened} onClose={close}>
        <StyledDialogTitle>
          Update CV
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

export default UpdateCvForm;
