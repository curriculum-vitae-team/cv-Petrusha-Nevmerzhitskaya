import { createContext, useState } from 'react';
import {
  BreadcrumbsProviderProps,
  BreadcrumbsContextValue,
  BreadcrumbsConfig
} from './Breadcrumbs.types';

const defaultValue: BreadcrumbsContextValue = {
  config: {},
  updateConfig: () => {}
};

export const BreadcrumbsContext = createContext(defaultValue);

export const BreadcrumbsProvider = ({ children }: BreadcrumbsProviderProps) => {
  const [config, setConfig] = useState<BreadcrumbsConfig>(defaultValue.config);

  const updateConfig = (config: BreadcrumbsConfig) => {
    setConfig(config);
  };

  return (
    <BreadcrumbsContext.Provider value={{ config, updateConfig }}>
      {children}
    </BreadcrumbsContext.Provider>
  );
};
