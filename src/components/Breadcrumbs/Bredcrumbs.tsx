import { HomeOutlined, NavigateNext } from '@mui/icons-material';
import { Link, Typography } from '@mui/material';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { BreadcrumbsContext } from './Breadcrumbs.context';
import { Breadcrumbs, HomeStyles } from './Breadcrumbs.style';

export const HeaderBreadcrumbs = () => {
  const location = useLocation();
  const { config } = useContext(BreadcrumbsContext);

  const links = location.pathname
    .split('/')
    .filter((x) => x)
    .map((name, index, array) => ({
      name: name[0].toUpperCase() + name.slice(1),
      to: array.slice(0, index + 1).join('/')
    }));

  return (
    <Breadcrumbs separator={<NavigateNext fontSize="small" color="disabled" />}>
      <Link href="/" sx={HomeStyles}>
        <HomeOutlined />
        <Typography>Home</Typography>
      </Link>
      {links.map(({ name, to }) => {
        const dataFromConfig = config[to];
        return (
          <Link key={name} href={`/${dataFromConfig?.to || to}`}>
            <Typography>{dataFromConfig?.text || name}</Typography>
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};
