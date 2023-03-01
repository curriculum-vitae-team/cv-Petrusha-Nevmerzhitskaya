import { Search } from '@mui/icons-material';
import {
  InputAdornment,
  OutlinedInput,
  OutlinedInputProps
} from '@mui/material';
import { ChangeEvent, useContext } from 'react';
import { TableSearchContext } from './Table.context';

const SearchInput = (props: OutlinedInputProps) => {
  const { search, setSearch } = useContext(TableSearchContext);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <OutlinedInput
      placeholder="Search"
      size="small"
      startAdornment={
        <InputAdornment position="start">
          <Search />
        </InputAdornment>
      }
      inputProps={{ sx: { minWidth: 150 } }}
      {...props}
      value={search}
      onChange={handleSearch}
    />
  );
};

export default SearchInput;
