import { Outlet } from 'react-router-dom';

import { Header } from '../Header';
import { Notification } from '../Notification';

export const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Notification />
    </>
  );
};
