import { Route, Routes } from 'react-router-dom';

import { Layout } from '../components/Layout';
import EmployeesPage from '../pages/EmployeesPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';

export default function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="*" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}
