import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {
  Avatar,
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography
} from '@mui/material';
import { red } from '@mui/material/colors';
import { useState } from 'react';

import { Header } from '../../components/Header';
import UsersTable from '../../components/UsersTable';
import isAdmin from '../../utils/isAdmin';

const EmployeesPage: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || '');
  const isUserAdmin = isAdmin(user);

  const [search, setSearch] = useState('');

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <Header>
        <IconButton size="large" color="inherit">
          <MenuIcon color="secondary" />
        </IconButton>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, textAlign: 'end', marginRight: 2 }}
        >
          {user.email}
        </Typography>
        <Avatar sx={{ bgcolor: red[900] }}>
          {user.email[0].toUpperCase()}
        </Avatar>
      </Header>
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
    </>
  );
};

export default EmployeesPage;
