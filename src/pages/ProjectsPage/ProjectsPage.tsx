import { useQuery } from '@apollo/client';
import Preloader from '@components/Preloader';
import { createTable } from '@components/Table/Table';
import { ProjectsTableButtons } from '@components/TableValues/ProjectPageValues/ProjectTableButtons';
import { ProjectsTableHead } from '@components/TableValues/ProjectPageValues/ProjectTableHead';
import { ProjectsTableRow } from '@components/TableValues/ProjectPageValues/ProjectTableRow';
import { IProjectsResult } from '@graphql/projects/IProjectsResult';
import { PROJECTS } from '@graphql/projects/query';
import { IProject } from '@interfaces/IProject';

const Table = createTable<IProject>();

const ProjectPage = () => {
  const { data, loading, error } = useQuery<IProjectsResult>(PROJECTS);

  return (
    <Preloader loading={loading} error={error}>
      <Table
        items={data?.projects || []}
        TableButtonsComponent={ProjectsTableButtons}
        TableHeadComponent={ProjectsTableHead}
        TableRowComponent={ProjectsTableRow}
        searchBy={['name', 'internal_name']}
        defaultSortBy="name"
      />
    </Preloader>
  );
};

export default ProjectPage;
