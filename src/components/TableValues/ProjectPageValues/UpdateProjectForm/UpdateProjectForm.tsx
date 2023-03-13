import { useMutation } from '@apollo/client';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogContent, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import Preloader from '@components/Preloader';
import { UPDATE_PROJECT } from '@graphql/projects/mutation';
import { PROJECTS } from '@graphql/projects/query';
import {
  StyledBox,
  StyledDialogTitle
} from '../../CvsPageValues/CreateCvForm/CreateCvForm.styles';
import FormFields from '../CreateProjectsForm/FormFields';
import { IFormInput } from '../CreateProjectsForm/IFormInput';

interface Props {
  opened: boolean;
  close: () => void;
  confirm: () => void;
  id: string | undefined;
}

const UpdateProjectForm: React.FC<Props> = ({ close, confirm, opened, id }) => {
  const { control, handleSubmit, reset } = useForm<IFormInput>();

  const [UpdateProject, { loading }] = useMutation(UPDATE_PROJECT, {
    refetchQueries: [{ query: PROJECTS }]
  });

  const onSubmit = async (inputs: IFormInput) => {
    console.log(inputs);

    await UpdateProject({
      variables: {
        id,
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
          Update Project
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

export default UpdateProjectForm;
