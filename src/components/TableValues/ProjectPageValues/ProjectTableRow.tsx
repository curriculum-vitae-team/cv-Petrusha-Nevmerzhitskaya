import { useMutation, useReactiveVar } from '@apollo/client';
import { MenuItem, TableCell, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ActionsMenu from '@components/Table/ActionsMenu';
import { TableRowProps } from '@components/Table/Table.types';
import { RoutesPath } from '@constants/routes';
import { authService } from '@graphql/auth/authService';
import { DELETE_PROJECT } from '@graphql/projects/mutation';
import { PROJECTS } from '@graphql/projects/query';
import { IProject } from '@interfaces/IProject';
import isAdmin from '@utils/isAdmin';

export const ProjectsTableRow = ({ item }: TableRowProps<IProject>) => {
  const user = useReactiveVar(authService.user$);
  const AbleToEdit = isAdmin(user);
  const navigate = useNavigate();

  const handleGoToProject = () => {
    navigate(`${RoutesPath.PROJECTS}/${item.id}`);
  };

  const [deleteProject] = useMutation<{ affected: number }>(DELETE_PROJECT, {
    refetchQueries: [{ query: PROJECTS }]
  });

  const handleDelete = async () => {
    await deleteProject({
      variables: { id: item.id }
    });
  };
  return (
    <TableRow>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.internal_name}</TableCell>
      <TableCell>{item.domain}</TableCell>
      <TableCell>{item.start_date}</TableCell>
      <TableCell>{item.end_date || 'Till now'}</TableCell>
      <TableCell>{item.team_size}</TableCell>
      <TableCell>
        <ActionsMenu>
          <MenuItem onClick={handleGoToProject}>Project</MenuItem>
          <MenuItem disabled={!AbleToEdit} onClick={handleDelete}>
            Delete Project
          </MenuItem>
        </ActionsMenu>
      </TableCell>
    </TableRow>
  );
};
