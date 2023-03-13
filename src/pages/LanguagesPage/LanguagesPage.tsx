import { useQuery } from '@apollo/client';
import Preloader from '@components/Preloader';
import { createTable } from '@components/Table/Table';
import { LanguagesTableButtons } from '@components/TableValues/LanguagesPageValues/LanguagesButtons';
import { LanguagesTableHead } from '@components/TableValues/LanguagesPageValues/LanguagesTableHead';
import { LanguagesTableRow } from '@components/TableValues/LanguagesPageValues/LanguagesTableRow';
import { LANGUAGES } from '@graphql/languages/query';
import { ILanguage } from '@interfaces/ILanguage';

const Table = createTable<ILanguage>();

type LanguageResult = {
  languages: ILanguage[];
};

const LanguagesPage = () => {
  const { data, loading, error } = useQuery<LanguageResult>(LANGUAGES);

  return (
    <Preloader loading={loading} error={error}>
      <Table
        items={data?.languages || []}
        TableButtonsComponent={LanguagesTableButtons}
        TableHeadComponent={LanguagesTableHead}
        TableRowComponent={LanguagesTableRow}
        searchBy={['name']}
        defaultSortBy="name"
      />
    </Preloader>
  );
};

export default LanguagesPage;
