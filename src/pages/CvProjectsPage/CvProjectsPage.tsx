import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import CvTabs from '@components/CvTabs';
import Preloader from '@components/Preloader';
import { createTable } from '@components/Table/Table';
import { CvProjectsTableButtons } from '@components/TableValues/CvProjectsPageValues/CvProjectTableButtons';
import { CvProjectsTableHead } from '@components/TableValues/CvProjectsPageValues/CvProjectTableHead';
import { CvProjectsTableRow } from '@components/TableValues/CvProjectsPageValues/CvProjectTableRow';
import { CV } from '@graphql/cvs/query';
import { ICv } from '@interfaces/ICv';
import { IProject } from '@interfaces/IProject';

const Table = createTable<IProject>();

type CvResult = {
  cv: ICv;
};

const CvProjectsPage = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery<CvResult>(CV, {
    variables: { id }
  });

  function createCvsProjectRowData(data: IProject[]) {
    return data?.map((project) => ({
      id: project.id,
      created_at: project.created_at,
      name: project.name || '',
      description: project.description,
      internal_name: project.internal_name || '',
      domain: project.domain || '',
      team_size: project.team_size,
      start_date: project.start_date || '',
      end_date: project.end_date || ''
    }));
  }

  return (
    <Preloader loading={loading} error={error}>
      <CvTabs />
      <Table
        items={createCvsProjectRowData(data?.cv?.projects || [])}
        TableButtonsComponent={CvProjectsTableButtons}
        TableHeadComponent={CvProjectsTableHead}
        TableRowComponent={CvProjectsTableRow}
        searchBy={['name', 'internal_name']}
        defaultSortBy="internal_name"
      />
    </Preloader>
  );
};

export default CvProjectsPage;
