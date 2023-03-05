import { useMutation, useReactiveVar } from '@apollo/client';
import { Checkbox, MenuItem, TableCell, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ActionsMenu from '@components/Table/ActionsMenu';
import { TableRowProps } from '@components/Table/Table.types';
import { RoutesPath } from '@constants/routes';
import { authService } from '@graphql/auth/authService';
import { DELETE_CV } from '@graphql/cvs/mutation';
import { CVS } from '@graphql/cvs/query';
import { ICv } from '@interfaces/ICv';
import isAdmin from '@utils/isAdmin';
import { DescriptionStyles } from './CvsTableRow.styles';

export const CVsTableRow = ({ item }: TableRowProps<ICv>) => {
  const user = useReactiveVar(authService.user$);
  const isUserAdmin = isAdmin(user);
  const [deleteCV] = useMutation<{ affected: number }>(DELETE_CV, {
    refetchQueries: [{ query: CVS }]
  });
  const navigate = useNavigate();

  const handleDeleteCV = async () => {
    await deleteCV({
      variables: { id: item.id }
    });
  };

  const handleClick = () => {
    navigate(`${RoutesPath.CVS}/${item.id}/details`);
    console.log(item.id);
  };

  const projectNames =
    item.projects?.map((project) => project.name).join(', ') || '-';
  return (
    <TableRow>
      <TableCell>
        <Checkbox checked={item.is_template} readOnly />
      </TableCell>
      <TableCell>{item.name}</TableCell>
      <TableCell sx={DescriptionStyles}>{item.description}</TableCell>
      <TableCell>{item.user?.email || '-'}</TableCell>
      <TableCell>{projectNames}</TableCell>
      <TableCell>
        <ActionsMenu>
          <MenuItem onClick={handleClick}>CV</MenuItem>
          <MenuItem disabled={!isUserAdmin} onClick={handleDeleteCV}>
            Delete CV
          </MenuItem>
        </ActionsMenu>
      </TableCell>
    </TableRow>
  );
};
