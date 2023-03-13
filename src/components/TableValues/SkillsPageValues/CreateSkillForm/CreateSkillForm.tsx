import { useMutation } from '@apollo/client';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogContent, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import Preloader from '@components/Preloader';
import { CREATE_SKILL } from '@graphql/skills/mutation';
import { SKILLS } from '@graphql/skills/query';
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

const CreateSkillForm: React.FC<Props> = ({ close, confirm, opened }) => {
  const { control, handleSubmit, reset } = useForm<IFormInput>();

  const [CreateSkill, { loading }] = useMutation(CREATE_SKILL, {
    refetchQueries: [{ query: SKILLS }]
  });

  const onSubmit = async (inputs: IFormInput) => {
    await CreateSkill({
      variables: {
        skill: {
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
          Create Skill
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

export default CreateSkillForm;
