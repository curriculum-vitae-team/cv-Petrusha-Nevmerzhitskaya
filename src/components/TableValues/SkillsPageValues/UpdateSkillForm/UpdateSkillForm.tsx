import { useMutation } from '@apollo/client';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogContent, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import Preloader from '@components/Preloader';
import { UPDATE_SKILL } from '@graphql/skills/mutation';
import { SKILLS } from '@graphql/skills/query';
import {
  StyledBox,
  StyledDialogTitle
} from '../../CvsPageValues/CreateCvForm/CreateCvForm.styles';
import { IFormInput } from '../../CvsPageValues/CreateCvForm/IFormInput';
import FormFields from '../CreateSkillForm/FormFields';

interface Props {
  opened: boolean;
  close: () => void;
  confirm: () => void;
  id: string;
}

const UpdateSkillForm: React.FC<Props> = ({ close, confirm, opened, id }) => {
  const { control, handleSubmit, reset } = useForm<IFormInput>();

  const [UpdateSkill, { loading }] = useMutation(UPDATE_SKILL, {
    refetchQueries: [{ query: SKILLS }]
  });

  const onSubmit = async (inputs: IFormInput) => {
    await UpdateSkill({
      variables: {
        id,
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
          Update Skill
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

export default UpdateSkillForm;
