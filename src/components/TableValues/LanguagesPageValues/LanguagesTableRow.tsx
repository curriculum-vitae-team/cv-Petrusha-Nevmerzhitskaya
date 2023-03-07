import { useMutation, useReactiveVar } from '@apollo/client';
import { MenuItem, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import ActionsMenu from '@components/Table/ActionsMenu';
import { TableRowProps } from '@components/Table/Table.types';
import { authService } from '@graphql/auth/authService';
import { DELETE_LANGUAGE } from '@graphql/languages/mutation';
import { LANGUAGES } from '@graphql/languages/query';
import { ILanguage } from '@interfaces/ILanguage';
import isAbleToEdit from '@utils/isAbleToEdit';
import UpdateLanguageForm from './UpdateLanguageForm';

export const LanguagesTableRow = ({ item }: TableRowProps<ILanguage>) => {
  const user = useReactiveVar(authService.user$);
  const AbleToEdit = isAbleToEdit(user);
  const [formOpened, setFormOpened] = useState(false);
  const UpdateClick = () => {
    setFormOpened(true);
  };

  const closeForm = () => {
    setFormOpened(false);
  };

  const create = async () => {
    closeForm();
  };

  const [deleteLanguage] = useMutation<{ affected: number }>(DELETE_LANGUAGE, {
    refetchQueries: [{ query: LANGUAGES }]
  });

  const handleDelete = async () => {
    await deleteLanguage({
      variables: { id: item.id }
    });
  };

  return (
    <>
      <UpdateLanguageForm
        opened={formOpened}
        close={closeForm}
        confirm={create}
        id={item.id}
      />
      <TableRow>
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.iso2}</TableCell>
        <TableCell sx={{ textAlign: 'right' }}>
          <ActionsMenu>
            <MenuItem disabled={!AbleToEdit} onClick={UpdateClick}>
              Update
            </MenuItem>
            <MenuItem disabled={!AbleToEdit} onClick={handleDelete}>
              Delete
            </MenuItem>
          </ActionsMenu>
        </TableCell>
      </TableRow>
    </>
  );
};
