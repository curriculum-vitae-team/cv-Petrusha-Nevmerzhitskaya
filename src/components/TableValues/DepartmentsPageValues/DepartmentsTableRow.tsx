import { useMutation, useReactiveVar } from '@apollo/client';
import { MenuItem, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import ActionsMenu from '@components/Table/ActionsMenu';
import { TableRowProps } from '@components/Table/Table.types';
import { authService } from '@graphql/auth/authService';
import { DELETE_DEPARMENT, DEPARTMENTS } from '@graphql/departments/query';
import { IDepartment } from '@interfaces/IDepartment';
import isAbleToEdit from '@utils/isAbleToEdit';
import UpdateDepartmentForm from './UpdateDepartmentForm';

export const DepartmentsTableRow = ({ item }: TableRowProps<IDepartment>) => {
  const user = useReactiveVar(authService.user$);
  const AbleToEdit = isAbleToEdit(user);
  const [formOpened, setFormOpened] = useState(false);
  const UpdateDepartmentClick = () => {
    setFormOpened(true);
  };

  const closeForm = () => {
    setFormOpened(false);
  };

  const createUser = async () => {
    closeForm();
  };

  const [deleteDepartment] = useMutation<{ affected: number }>(
    DELETE_DEPARMENT,
    {
      refetchQueries: [{ query: DEPARTMENTS }]
    }
  );

  const handleDeleteDepartment = async () => {
    await deleteDepartment({
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
            <MenuItem disabled={!AbleToEdit} onClick={UpdateDepartmentClick}>
              Update
            </MenuItem>
            <MenuItem disabled={!AbleToEdit} onClick={handleDeleteDepartment}>
              Delete
            </MenuItem>
          </ActionsMenu>
        </TableCell>
      </TableRow>
    </>
  );
};
