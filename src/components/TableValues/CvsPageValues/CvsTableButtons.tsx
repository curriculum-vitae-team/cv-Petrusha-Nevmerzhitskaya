import { Button } from '@mui/material';
import SearchInput from '@components/Table/SearchInput';

export const CVsTableButtons = () => {
  return (
    <>
      <SearchInput />
      <Button disabled variant="outlined">
        Create CV
      </Button>
    </>
  );
};
