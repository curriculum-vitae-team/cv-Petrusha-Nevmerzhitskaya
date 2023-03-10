import { useMutation } from '@apollo/client';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogContent, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import Preloader from '@components/Preloader';
import {
  StyledBox,
  StyledDialogTitle
} from '@components/TableValues/CvsPageValues/CreateCvForm/CreateCvForm.styles';
import { UPDATE_USER } from '@graphql/user/mutation';
import { USER } from '@graphql/user/query';
import useUserData from '@hooks/useUserData';
import { ISkillMastery } from '@interfaces/ISkillMastery';
import FormFields from './FormFields';
import { IFormInput } from './IFormInput';

interface Props {
  opened: boolean;
  close: () => void;
  confirm: () => void;
}
export const createArrayForSkills = (data: ISkillMastery[] | undefined) => {
  if (!data) {
    return [];
  }

  return data.map(({ skill_name, mastery }) => {
    return { skill_name, mastery };
  });
};

const AddSkillForm: React.FC<Props> = ({ close, confirm, opened }) => {
  const { control, handleSubmit, reset } = useForm<IFormInput>();
  const { user } = useUserData();
  const [updateUserMutation, { loading }] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: USER, variables: { id: user?.id } }]
  });

  const onSubmit = async ({ skill_name, mastery }: IFormInput) => {
    await updateUserMutation({
      variables: {
        id: user?.id,
        user: {
          profile: {
            first_name: user?.profile.first_name || '',
            last_name: user?.profile.last_name || '',
            skills: [
              { skill_name, mastery },
              ...createArrayForSkills(user?.profile.skills)
            ]
          },
          departmentId: user?.department?.id || '',
          positionId: user?.position?.id || ''
        }
      }
    });
    reset();
  };

  return (
    <Preloader loading={loading}>
      <Dialog open={opened} onClose={close}>
        <StyledDialogTitle>
          Add skill
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

export default AddSkillForm;
