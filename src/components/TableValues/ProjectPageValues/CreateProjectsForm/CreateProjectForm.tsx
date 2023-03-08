import { useMutation } from '@apollo/client';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogContent, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import Preloader from '@components/Preloader';
import { CREATE_PROJECT } from '@graphql/projects/mutation';
import { PROJECTS } from '@graphql/projects/query';
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

const CreateProjectForm: React.FC<Props> = ({ close, confirm, opened }) => {
  const { control, handleSubmit, reset } = useForm<IFormInput>();

  const [CreateProject, { loading }] = useMutation(CREATE_PROJECT, {
    refetchQueries: [{ query: PROJECTS }]
  });

  const onSubmit = async (inputs: IFormInput) => {
    await CreateProject({
      variables: {
        project: {
          name: inputs.name,
          internal_name: inputs.internal_name,
          description: inputs.description,
          domain: inputs.domain,
          team_size: Number(inputs.team_size),
          start_date: inputs.start_date,
          end_date: inputs.end_date,
          skillsIds: []
        }
      }
    });

    reset();
  };

  return (
    <Preloader loading={loading}>
      <Dialog open={opened} onClose={close}>
        <StyledDialogTitle>
          Create Project
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

export default CreateProjectForm;
