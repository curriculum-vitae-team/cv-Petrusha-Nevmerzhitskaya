import { useQuery } from '@apollo/client';
import Preloader from '@components/Preloader';
import { createTable } from '@components/Table/Table';
import { SkillsTableButtons } from '@components/TableValues/SkillsPageValues/SkillsButtons';
import { SkillsTableHead } from '@components/TableValues/SkillsPageValues/SkillsTableHead';
import { SkillsTableRow } from '@components/TableValues/SkillsPageValues/SkillsTableRow';
import { SKILLS } from '@graphql/skills/query';
import { ISkill } from '@interfaces/ISkill';

const Table = createTable<ISkill>();

type SkillsResult = {
  skills: ISkill[];
};

const SkillsPage = () => {
  const { data, loading, error } = useQuery<SkillsResult>(SKILLS);

  return (
    <Preloader loading={loading} error={error}>
      <Table
        items={data?.skills || []}
        TableButtonsComponent={SkillsTableButtons}
        TableHeadComponent={SkillsTableHead}
        TableRowComponent={SkillsTableRow}
        searchBy={['name']}
        defaultSortBy="name"
      />
    </Preloader>
  );
};

export default SkillsPage;
