import { useQuery } from '@apollo/client';
import Preloader from '@components/Preloader';
import { createTable } from '@components/Table/Table';
import { CVsTableButtons } from '@components/TableValues/CvsPageValues/CvsTableButtons';
import { CVsTableHead } from '@components/TableValues/CvsPageValues/CvsTableHead';
import { CVsTableRow } from '@components/TableValues/CvsPageValues/CvsTableRow';
import { CVS } from '@graphql/cvs/query';
import { ICv } from '@interfaces/ICv';

const Table = createTable<ICv>();

type CvsResult = {
  cvs: ICv[];
};

const Cvs = () => {
  const { data, loading, error } = useQuery<CvsResult>(CVS);

  return (
    <Preloader loading={loading} error={error}>
      <Table
        items={data?.cvs || []}
        TableButtonsComponent={CVsTableButtons}
        TableHeadComponent={CVsTableHead}
        TableRowComponent={CVsTableRow}
        searchBy={['name']}
        defaultSortBy="name"
      />
    </Preloader>
  );
};

export default Cvs;
