import { Breadcrumbs, Link, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

import { BreadcrumbsWrap } from './Breadcrumbs.style';

function toTitleCase(str: string) {
  return str
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

export const HeaderBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <BreadcrumbsWrap>
      <Breadcrumbs aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          return last ? (
            <Typography key={to}>{toTitleCase(value)}</Typography>
          ) : (
            <Link href={to} key={to}>
              {toTitleCase(value)}
            </Link>
          );
        })}
      </Breadcrumbs>
    </BreadcrumbsWrap>
  );
};
