import { Route, Routes } from 'react-router-dom';

import EmployeesPage from '../pages/EmployeesPage/EmployeesPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import SignupPage from '../pages/SignupPage/SignupPage';

export default function AppRoute() {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/employees" element={<EmployeesPage />} />
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}
