import { useReactiveVar } from '@apollo/client';
import SearchIcon from '@mui/icons-material/Search';
import { FormControl, InputAdornment, InputLabel } from '@mui/material';
import { useState } from 'react';
import CreateUserForm from '@components/CreateUserForm';
import Preloader from '@components/Preloader';
import UsersTable from '@components/UsersTable';
import { authService } from '@graphql/auth/authService';
import isAdmin from '@utils/isAdmin';
import {
  StyledBox,
  StyledButton,
  StyledOutlinedInput,
  StyledPageBox
} from './EmployeesPage.styles';

const EmployeesPage: React.FC = () => {
  const user = useReactiveVar(authService.user$);

  const isUserAdmin = isAdmin(user);

  const [search, setSearch] = useState('');
  const [formOpened, setFormOpened] = useState(false);

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const createUserClick = () => {
    setFormOpened(true);
  };

  const closeForm = () => {
    setFormOpened(false);
  };

  const createUser = async () => {
    closeForm();
  };

  return (
    <Preloader loading={false}>
      <CreateUserForm
        opened={formOpened}
        close={closeForm}
        confirm={createUser}
      />
      <StyledPageBox marginX={3}>
        <StyledBox marginX={2} marginY={3}>
          <FormControl>
            <InputLabel htmlFor="search-input">Search</InputLabel>
            <StyledOutlinedInput
              id="search-input"
              size="small"
              label="Search"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              onChange={searchHandler}
              value={search}
            />
          </FormControl>
          <StyledButton
            variant="outlined"
            color="secondary"
            disabled={!isUserAdmin}
            onClick={createUserClick}
          >
            Create employee
          </StyledButton>
        </StyledBox>
        <UsersTable search={search} isUserAdmin={isUserAdmin} />
      </StyledPageBox>
    </Preloader>
  );
};

export default EmployeesPage;
