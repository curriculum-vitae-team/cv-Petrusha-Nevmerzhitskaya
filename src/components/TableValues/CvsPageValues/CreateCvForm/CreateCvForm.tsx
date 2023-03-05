import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogContent, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import Preloader from '@components/Preloader';
import { authService } from '@graphql/auth/authService';
import { CREATE_CV } from '@graphql/cv/mutation';
import { CVS } from '@graphql/cvs/query';
import { USER } from '@graphql/user/query';
import { IUser } from '@interfaces/IUser';
import { StyledBox, StyledDialogTitle } from './CreateCvForm.styles';
import FormFields from './FormFields';
import { IFormInput } from './IFormInput';

interface Props {
  opened: boolean;
  close: () => void;
  confirm: () => void;
}

interface IUserAllResult {
  user: IUser;
}

const CreateCvForm: React.FC<Props> = ({ close, confirm, opened }) => {
  const { control, handleSubmit, reset } = useForm<IFormInput>();
  const user = useReactiveVar(authService.user$);

  const { loading: userLoading, data: userData } = useQuery<IUserAllResult>(
    USER,
    {
      variables: { id: user?.id }
    }
  );

  const [createCV, { loading }] = useMutation(CREATE_CV, {
    refetchQueries: [{ query: CVS }]
  });

  const onSubmit = async (inputs: IFormInput) => {
    await createCV({
      variables: {
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
    <Preloader loading={loading || userLoading}>
      <Dialog open={opened} onClose={close}>
        <StyledDialogTitle>
          Create CV
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

export default CreateCvForm;
