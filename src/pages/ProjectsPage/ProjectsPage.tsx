import { useReactiveVar } from '@apollo/client';
import SearchIcon from '@mui/icons-material/Search';
import { FormControl, InputAdornment, InputLabel } from '@mui/material';
import { useState } from 'react';

import ProjectsTable from '@components/ProjectsTable';
import { authService } from '@graphql/auth/authService';
import isAdmin from '@utils/isAdmin';
import {
  StyledBox,
  StyledButton,
  StyledOutlinedInput,
  StyledPageBox
} from '../EmployeesPage/EmployeesPage.styles';

const ProjectsPage: React.FC = () => {
  const user = useReactiveVar(authService.user$);

  const isUserAdmin = isAdmin(user);

  const [search, setSearch] = useState('');

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
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
        >
          Create project
        </StyledButton>
      </StyledBox>
      <ProjectsTable search={search} isUserAdmin={isUserAdmin} />
    </StyledPageBox>
  );
};

export default ProjectsPage;
