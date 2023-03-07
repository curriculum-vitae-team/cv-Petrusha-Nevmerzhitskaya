import { useMutation, useReactiveVar } from '@apollo/client';
import { MenuItem, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import ActionsMenu from '@components/Table/ActionsMenu';
import { TableRowProps } from '@components/Table/Table.types';
import { authService } from '@graphql/auth/authService';
import { DELETE_POSITION } from '@graphql/positions/mutation';
import { POSITIONS } from '@graphql/positions/query';
import { IDepartment } from '@interfaces/IDepartment';
import isAbleToEdit from '@utils/isAbleToEdit';
import UpdateDepartmentForm from './UpdatePositionForm';

export const PositionsTableRow = ({ item }: TableRowProps<IDepartment>) => {
  const user = useReactiveVar(authService.user$);
  const AbleToEdit = isAbleToEdit(user);
  const [formOpened, setFormOpened] = useState(false);
  const UpdateClick = () => {
    setFormOpened(true);
  };

  const closeForm = () => {
    setFormOpened(false);
  };

  const createUser = async () => {
    closeForm();
  };

  const [deletePosition] = useMutation<{ affected: number }>(DELETE_POSITION, {
    refetchQueries: [{ query: POSITIONS }]
  });

  const handleDelete = async () => {
    await deletePosition({
      variables: { id: item.id }
    });
  };

  return (
    <>
      <UpdateDepartmentForm
        opened={formOpened}
        close={closeForm}
        confirm={createUser}
        id={item.id}
      />
      <TableRow>
        <TableCell>{item.name}</TableCell>
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
