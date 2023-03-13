import { useMutation } from '@apollo/client';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogContent, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import Preloader from '@components/Preloader';
import { UPDATE_LANGUAGE } from '@graphql/languages/mutation';
import { LANGUAGES } from '@graphql/languages/query';
import {
  StyledBox,
  StyledDialogTitle
} from '../../CvsPageValues/CreateCvForm/CreateCvForm.styles';
import FormFields from '../CreateLanguageForm/FormFields';
import { IFormInput } from '../CreateLanguageForm/IFormInput';

interface Props {
  opened: boolean;
  close: () => void;
  confirm: () => void;
  id: string;
}

const UpdateLanguageForm: React.FC<Props> = ({
  close,
  confirm,
  opened,
  id
}) => {
  const { control, handleSubmit, reset } = useForm<IFormInput>();

  const [UpdateLanguage, { loading }] = useMutation(UPDATE_LANGUAGE, {
    refetchQueries: [{ query: LANGUAGES }]
  });

  const onSubmit = async (inputs: IFormInput) => {
    await UpdateLanguage({
      variables: {
        id,
        language: {
          name: inputs.name,
          iso2: inputs.iso2,
          native_name: inputs.native_name
        }
      }
    });

    reset();
  };

  return (
    <Preloader loading={loading}>
      <Dialog open={opened} onClose={close}>
        <StyledDialogTitle>
          Update Language
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

export default UpdateLanguageForm;
