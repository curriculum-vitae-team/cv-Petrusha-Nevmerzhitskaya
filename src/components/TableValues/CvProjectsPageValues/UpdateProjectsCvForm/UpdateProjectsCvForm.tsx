import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogContent, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Preloader from '@components/Preloader';
import { authService } from '@graphql/auth/authService';
import { UPDATE_CV } from '@graphql/cv/mutation';
import { CV, CVS } from '@graphql/cvs/query';
import { IProjectsResult } from '@graphql/projects/IProjectsResult';
import { PROJECTS } from '@graphql/projects/query';
import { USER } from '@graphql/user/query';
import { ICv } from '@interfaces/ICv';
import { IUser } from '@interfaces/IUser';
import {
  StyledBox,
  StyledDialogTitle
} from '../../CvsPageValues/CreateCvForm/CreateCvForm.styles';
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

interface ICvResult {
  cv: ICv;
}

const UpdateProjectsCvForm: React.FC<Props> = ({ close, confirm, opened }) => {
  const { id } = useParams();
  const { control, handleSubmit, reset } = useForm<IFormInput>();
  const user = useReactiveVar(authService.user$);

  const { data: userData } = useQuery<IUserAllResult>(USER, {
    variables: { id: user?.id }
  });

  const { data: cvData } = useQuery<ICvResult>(CV, {
    variables: { id }
  });

  const { loading: projectsLoading, data: projectsData } = useQuery<
    IProjectsResult
  >(PROJECTS);

  const [updateCV, { loading }] = useMutation(UPDATE_CV, {
    refetchQueries: [{ query: CVS }]
  });

  const onSubmit = async (inputs: IFormInput) => {
    await updateCV({
      variables: {
        id,
        cv: {
          name: cvData?.cv.name,
          description: cvData?.cv.description,
          userId: userData?.user.id,
          skills: [],
          projectsIds: inputs.projects,
          languages: [],
          is_template: cvData?.cv.is_template
        }
      }
    });

    reset();
  };

  return (
    <Preloader loading={loading || projectsLoading}>
      <Dialog open={opened} onClose={close}>
        <StyledDialogTitle>
          Update CV Projects
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
            <FormFields control={control} projectsData={projectsData} />
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

export default UpdateProjectsCvForm;
