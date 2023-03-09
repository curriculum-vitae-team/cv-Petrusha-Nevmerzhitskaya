import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
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
import { useNavigate } from 'react-router-dom';


import { authService } from '@graphql/auth/authService';
import { IUser } from '@interfaces/IUser';
import ConfirmDialog from '../ConfirmDialog';
import { DELETE_USER } from '@graphql/user/mutation';
import { USERS } from '@graphql/users/query';
import Preloader from '../Preloader';
import { LabelsType, SortingType } from './types';
import { filterUsers, sortUsers } from './usersModifications';
import { StyledTableBody, StyledTableCell } from './UsersTable.styles';

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
  const navigate = useNavigate();

  const curUser = useReactiveVar(authService.user$);

  const { loading, error, data } = useQuery(USERS);
  const [deleteUserMutation] = useMutation<{ affected: number }>(DELETE_USER, {
    refetchQueries: [{ query: USERS }]
  });


  const [sorting, setSorting] = useState<SortingType>({
    name: 'department_name',
    asc: true
  });
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [confirmOpened, setConfirmOpened] = useState(false);

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    user: IUser
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const changeSort = (label: LabelsType) => {
    setSorting((prev: SortingType) => ({
      name: label,
      asc: prev.name === label ? !prev.asc : true
    }));
  };

  const deleteUserClick = () => {
    setConfirmOpened(true);
    setAnchorEl(null);
  };

  const closeConfirm = () => {
    setConfirmOpened(false);
  };

  const deleteUser = async () => {
    await deleteUserMutation({
      variables: { id: selectedUser?.id }
    });

    closeConfirm();
  };

  const openProfile = () => {
    navigate(`/employees/${selectedUser?.id}/profile`);
  };

  return (
    <Preloader loading={loading} error={error}>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleMenuClose}>
        <MenuItem onClick={openProfile}>Profile</MenuItem>
        <MenuItem
          onClick={deleteUserClick}
          disabled={!isUserAdmin || selectedUser?.id === curUser?.id}
        >
          Delete user
        </MenuItem>
      </Menu>
      <ConfirmDialog
        opened={confirmOpened}
        close={closeConfirm}
        confirm={deleteUser}
        titleText="Delete User"
        contentText={`Are you sure you want to delete user ${selectedUser?.email}?`}
      />
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
            {data?.users &&
              sortUsers(filterUsers(data.users, search), sorting).map(
                (user) => (
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
                      <IconButton
                        onClick={(event) => handleMenuOpen(event, user)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              )}
          </StyledTableBody>
        </Table>
      </TableContainer>
    </Preloader>
  );
};

export default UsersTable;
