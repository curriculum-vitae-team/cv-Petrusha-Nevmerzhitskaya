import { useContext, useEffect } from 'react';
import { BreadcrumbsContext } from '@components/Breadcrumbs/Breadcrumbs.context';
import { BreadcrumbsConfig } from '@components/Breadcrumbs/Breadcrumbs.types';

export const useBreadcrumbs = (config: BreadcrumbsConfig) => {
  const { updateConfig } = useContext(BreadcrumbsContext);
  const update = Object.values(config).every((value) => value.text);

  useEffect(() => {
    updateConfig(config);
  }, [update]);

  return null;
};
