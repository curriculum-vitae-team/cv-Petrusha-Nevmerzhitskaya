import { useQuery } from '@apollo/client';
import Preloader from '@components/Preloader';
import { createTable } from '@components/Table/Table';
import { PositionsTableButtons } from '@components/TableValues/PositionsPageValues/PositionsButtons';
import { PositionsTableHead } from '@components/TableValues/PositionsPageValues/PositionsTableHead';
import { PositionsTableRow } from '@components/TableValues/PositionsPageValues/PositionsTableRow';
import { POSITIONS } from '@graphql/positions/query';
import { IPosition } from '@interfaces/IPosition';

const Table = createTable<IPosition>();

type PositionsResult = {
  positions: IPosition[];
};

const PositionsPage = () => {
  const { data, loading, error } = useQuery<PositionsResult>(POSITIONS);

  return (
    <Preloader loading={loading} error={error}>
      <Table
        items={data?.positions || []}
        TableButtonsComponent={PositionsTableButtons}
        TableHeadComponent={PositionsTableHead}
        TableRowComponent={PositionsTableRow}
        searchBy={['name']}
        defaultSortBy="name"
      />
    </Preloader>
  );
};

export default PositionsPage;
