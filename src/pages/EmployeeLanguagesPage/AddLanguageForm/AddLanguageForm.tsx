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
import { ILanguageProficiency } from '@interfaces/ILanguageProficiency';
import FormFields from './FormFields';
import { IFormInput } from './IFormInput';

interface Props {
  opened: boolean;
  close: () => void;
  confirm: () => void;
}
export const createArrayForLanguages = (
  data: ILanguageProficiency[] | undefined
) => {
  if (!data) {
    return [];
  }

  return data.map(({ language_name, proficiency }) => {
    return { language_name, proficiency };
  });
};

const AddLanguageForm: React.FC<Props> = ({ close, confirm, opened }) => {
  const { control, handleSubmit, reset } = useForm<IFormInput>();
  const { user } = useUserData();
  const [updateUserMutation, { loading }] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: USER, variables: { id: user?.id } }]
  });

  const onSubmit = async ({ language_name, proficiency }: IFormInput) => {
    await updateUserMutation({
      variables: {
        id: user?.id,
        user: {
          profile: {
            first_name: user?.profile.first_name || '',
            last_name: user?.profile.last_name || '',
            languages: [
              {
                language_name,
                proficiency
              },
              ...createArrayForLanguages(user?.profile.languages)
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
          Add language
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

export default AddLanguageForm;
