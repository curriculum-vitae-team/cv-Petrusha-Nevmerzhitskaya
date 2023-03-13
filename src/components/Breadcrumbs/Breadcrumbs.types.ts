import { ReactNode } from 'react';

export interface BreadcrumbsContextValue {
  config: BreadcrumbsConfig;
  updateConfig: (config: BreadcrumbsConfig) => void;
}

export interface BreadcrumbsProviderProps {
  children: ReactNode;
}

export interface BreadcrumbsConfig {
  [key: string]: {
    text: string | undefined;
    to?: string;
  };
}
