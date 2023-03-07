import { useMutation, useReactiveVar } from '@apollo/client';
import { MenuItem, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import ActionsMenu from '@components/Table/ActionsMenu';
import { TableRowProps } from '@components/Table/Table.types';
import { authService } from '@graphql/auth/authService';
import { DELETE_SKILL } from '@graphql/skills/mutation';
import { SKILLS } from '@graphql/skills/query';
import { IDepartment } from '@interfaces/IDepartment';
import isAbleToEdit from '@utils/isAbleToEdit';
import UpdateDepartmentForm from './UpdateSkillForm';

export const SkillsTableRow = ({ item }: TableRowProps<IDepartment>) => {
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

  const [deleteSkill] = useMutation<{ affected: number }>(DELETE_SKILL, {
    refetchQueries: [{ query: SKILLS }]
  });

  const handleDelete = async () => {
    await deleteSkill({
      variables: { id: item.id }
    });
  };

  return (
    <>
      <UpdateDepartmentForm
        opened={formOpened}
        close={closeForm}
        confirm={create}
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
