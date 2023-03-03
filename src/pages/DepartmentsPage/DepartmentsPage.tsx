import { useQuery } from '@apollo/client';
import Preloader from '@components/Preloader';
import { createTable } from '@components/Table/Table';
import { DepartmentsTableButtons } from '@components/TableValues/DepartmentsPageValues/DepartmentsButtons';
import { DepartmentTableHead } from '@components/TableValues/DepartmentsPageValues/DepartmentsTableHead';
import { DepartmentsTableRow } from '@components/TableValues/DepartmentsPageValues/DepartmentsTableRow';
import { DEPARTMENTS } from '@graphql/departments/query';
import { IDepartment } from '@interfaces/IDepartment';

const Table = createTable<IDepartment>();

type DepartmentsResult = {
  departments: IDepartment[];
};

const DepartmentsPage = () => {
  const { data, loading, error } = useQuery<DepartmentsResult>(DEPARTMENTS);

  return (
    <Preloader loading={loading} error={error}>
      <Table
        items={data?.departments || []}
        TableButtonsComponent={DepartmentsTableButtons}
        TableHeadComponent={DepartmentTableHead}
        TableRowComponent={DepartmentsTableRow}
        searchBy={['name']}
        defaultSortBy="name"
      />
    </Preloader>
  );
};

export default DepartmentsPage;
