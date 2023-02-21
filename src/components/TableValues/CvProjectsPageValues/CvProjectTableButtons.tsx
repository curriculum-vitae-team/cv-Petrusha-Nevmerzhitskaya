import { Button } from '@mui/material';
import SearchInput from '@components/Table/SearchInput';

export const CvProjectsTableButtons = () => {
  return (
    <>
      <SearchInput />
      <Button disabled variant="outlined">
        Update
      </Button>
    </>
  );
};
