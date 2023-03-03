import { Button } from '@mui/material';
import SearchInput from '@components/Table/SearchInput';

export const DepartmentsTableButtons = () => {
  return (
    <>
      <SearchInput />
      <Button disabled variant="outlined">
        Create
      </Button>
    </>
  );
};
