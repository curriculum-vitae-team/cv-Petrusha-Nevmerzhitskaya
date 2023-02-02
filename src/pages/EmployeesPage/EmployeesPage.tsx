import { useReactiveVar } from '@apollo/client';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@mui/material';
import { useState } from 'react';

import UsersTable from '../../components/UsersTable';
import { authService } from '../../graphql/auth/authService';
import isAdmin from '../../utils/isAdmin';

const EmployeesPage: React.FC = () => {
  const user = useReactiveVar(authService.user$);

  const isUserAdmin = isAdmin(user);

  const [search, setSearch] = useState('');

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <Box marginX={3} sx={{ overflow: 'auto' }}>
      <Box
        marginX={2}
        marginY={3}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <FormControl>
          <InputLabel htmlFor="search-input">Search</InputLabel>
          <OutlinedInput
            id="search-input"
            size="small"
            label="Search"
            sx={{ borderRadius: 0 }}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            onChange={searchHandler}
            value={search}
          />
        </FormControl>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ borderRadius: 0 }}
          disabled={!isUserAdmin}
        >
          Create employee
        </Button>
      </Box>
      <UsersTable search={search} isUserAdmin={isUserAdmin} />
    </Box>
  );
};

export default EmployeesPage;
