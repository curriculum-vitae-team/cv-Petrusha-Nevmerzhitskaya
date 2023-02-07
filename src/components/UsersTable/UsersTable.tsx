import { useMutation, useQuery } from '@apollo/client';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { useState } from 'react';

import { DELETE_USER } from '../../graphql/user/mutation';
import { USERS } from '../../graphql/users/query';
import Loader from '../Loader';
import { LabelsType, SortingType } from './types';
import { filterUsers, sortUsers } from './usersModifications';
import { StyledTableBody, StyledTableCell } from './UsersTable.styles';

interface AnchorType {
  anchor: SVGSVGElement | null;
  userId: string;
}

const initialAnchor: AnchorType = {
  anchor: null,
  userId: ''
};

interface HeaderLabelType {
  label: string;
  value: LabelsType;
}

const headerLabels: HeaderLabelType[] = [
  { label: 'First name', value: 'first_name' },
  { label: 'Last name', value: 'last_name' },
  { label: 'Email', value: 'email' },
  { label: 'Department', value: 'department_name' },
  { label: 'Position', value: 'position_name' }
];

interface Props {
  search: string;
  isUserAdmin: boolean;
}

const UsersTable: React.FC<Props> = ({ search, isUserAdmin }) => {
  const { loading, error, data } = useQuery(USERS);
  const [deleteUserMutation] = useMutation<{ affected: number }>(DELETE_USER);

  const [sorting, setSorting] = useState<SortingType>({
    name: 'department_name',
    asc: true
  });

  const [anchorEl, setAnchorEl] = useState<AnchorType>(initialAnchor);

  const handleMenuClose = () => {
    setAnchorEl(initialAnchor);
  };

  const handleMenuOpen = (
    event: React.MouseEvent<SVGSVGElement>,
    userId: string
  ) => {
    setAnchorEl({ anchor: event.currentTarget, userId });
  };

  const changeSort = (label: LabelsType) => {
    setSorting((prev) => ({
      name: label,
      asc: prev.name === label ? !prev.asc : true
    }));
  };

  const deleteUser = async () => {
    await deleteUserMutation({
      variables: { id: anchorEl.userId }
    });
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <Menu
        anchorEl={anchorEl.anchor}
        open={!!anchorEl.anchor}
        onClose={handleMenuClose}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem onClick={deleteUser} disabled={!isUserAdmin}>
          Delete user
        </MenuItem>
      </Menu>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell padding="checkbox" />
              {headerLabels.map((label) => (
                <StyledTableCell
                  key={label.label}
                  onClick={() => changeSort(label.value)}
                >
                  {label.label}
                  {sorting.name === label.value &&
                    (sorting.asc ? (
                      <ArrowUpwardIcon fontSize="small" />
                    ) : (
                      <ArrowDownwardIcon fontSize="small" />
                    ))}
                </StyledTableCell>
              ))}
              <StyledTableCell padding="checkbox" />
            </TableRow>
          </TableHead>
          <StyledTableBody>
            {sortUsers(filterUsers(data.users, search), sorting).map((user) => (
              <TableRow key={user.email}>
                <TableCell>
                  <Avatar alt="Avatar" src={user.profile.avatar} />
                </TableCell>
                <TableCell>{user.profile.first_name}</TableCell>
                <TableCell>{user.profile.last_name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.department_name}</TableCell>
                <TableCell>{user.position_name}</TableCell>
                <TableCell>
                  <IconButton>
                    <MoreVertIcon
                      onClick={(event) => handleMenuOpen(event, user.id)}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </StyledTableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UsersTable;
