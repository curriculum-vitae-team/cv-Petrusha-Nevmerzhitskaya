import { TableHead, TableRow } from '@mui/material';
import { FC, useState } from 'react';
import { sortItems, searchItems } from './modifications';
import * as Styled from './Table.styles';
import {
  Item,
  TableProps,
  TableSearchContext,
  TableSortContext,
  SortOrder
} from './Table.types';

const Table = <T extends Item>({
  items,
  TableButtonsComponent,
  TableHeadComponent,
  TableRowComponent,
  searchBy,
  defaultSortBy
}: TableProps<T>) => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState(defaultSortBy);
  const [order, setOrder] = useState(SortOrder.Asc);
  const filteredItems = items.filter(searchItems(searchBy, search));
  const sortedItems = sortItems<T>(filteredItems, sortBy, order);

  return (
    <Styled.MuiTable>
      <TableHead sx={{ backgroundColor: 'white' }}>
        <TableSearchContext.Provider value={{ search, setSearch }}>
          <TableRow>
            <Styled.ToolBar colSpan={7}>
              <Styled.ButtonsWrapper>
                <TableButtonsComponent />
              </Styled.ButtonsWrapper>
            </Styled.ToolBar>
          </TableRow>
        </TableSearchContext.Provider>
        <TableSortContext.Provider
          value={{ sortBy, order, setSortBy, setOrder } as never}
        >
          <TableHeadComponent />
        </TableSortContext.Provider>
      </TableHead>
      <Styled.TableBodyStyled>
        {sortedItems.map((item) => (
          <TableRowComponent key={item.id} item={item} />
        ))}
      </Styled.TableBodyStyled>
    </Styled.MuiTable>
  );
};

export const createTable = <T extends Item>(): FC<TableProps<T>> => Table;
