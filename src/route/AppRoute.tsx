import { useReactiveVar } from '@apollo/client';
import { LinearProgress } from '@mui/material';
import { lazy, Suspense } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import { Layout } from '../components/Layout';
import { RoutesPath } from '../constants/routes';
import { authService } from '../graphql/auth/authService';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

const LoginPage = lazy(() => import('../pages/LoginPage'));
const SignupPage = lazy(() => import('../pages/SignupPage'));

const EmployeesPage = lazy(() => import('../pages/EmployeesPage'));
const DepartmentsPage = lazy(() => import('../pages/DepartmentsPage'));
const LanguagesPage = lazy(() => import('../pages/LanguagesPage'));
const CvsPage = lazy(() => import('../pages/CvsPage'));
const PositionsPage = lazy(() => import('../pages/PositionsPage'));
const ProjectsPage = lazy(() => import('../pages/ProjectsPage'));
const SkillsPage = lazy(() => import('../pages/SkillsPage'));
const EmployeeCvsPage = lazy(() => import('../pages/EmployeeCvsPage'));
const EmployeeLanguagesPage = lazy(() =>
  import('../pages/EmployeeLanguagesPage')
);
const EmployeeProfilePage = lazy(() => import('../pages/EmployeeProfilePage'));
const EmployeeSkillsPage = lazy(() => import('../pages/EmployeeSkillsPage'));
const ProjectsDetailsPage = lazy(() => import('../pages/ProjectDetailsPage'));

export default function AppRoute() {
  const isAuth = useReactiveVar(authService.access_token$);

  const redirectPath = isAuth ? (
    <Navigate to={RoutesPath.EMPLOYEES} replace />
  ) : (
    <Navigate to={RoutesPath.LOGIN} replace />
  );

  return (
    <Suspense fallback={<LinearProgress color="secondary" />}>
      <Routes>
        <Route path={RoutesPath.INITIAL} element={<Layout />}>
          <Route index element={redirectPath} />

          <Route
            path={RoutesPath.SIGNUP}
            element={
              <PublicRoute>
                <SignupPage />
              </PublicRoute>
            }
          />
          <Route
            path={RoutesPath.LOGIN}
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />

          <Route
            path={RoutesPath.EMPLOYEES}
            element={
              <PrivateRoute>
                <EmployeesPage />
              </PrivateRoute>
            }
          />
          <Route
            path={RoutesPath.DEPARTMENTS}
            element={
              <PrivateRoute>
                <DepartmentsPage />
              </PrivateRoute>
            }
          />
          <Route
            path={RoutesPath.LANGUAGES}
            element={
              <PrivateRoute>
                <LanguagesPage />
              </PrivateRoute>
            }
          />
          <Route
            path={RoutesPath.CVS}
            element={
              <PrivateRoute>
                <CvsPage />
              </PrivateRoute>
            }
          />
          <Route
            path={RoutesPath.POSITIONS}
            element={
              <PrivateRoute>
                <PositionsPage />
              </PrivateRoute>
            }
          />
          <Route
            path={RoutesPath.PROJECTS}
            element={
              <PrivateRoute>
                <Outlet />
              </PrivateRoute>
            }
          >
            <Route index element={<ProjectsPage />} />
            <Route path=":id" element={<ProjectsDetailsPage />} />
          </Route>
          <Route
            path={RoutesPath.SKILLS}
            element={
              <PrivateRoute>
                <SkillsPage />
              </PrivateRoute>
            }
          />
          <Route
            path={RoutesPath.EMPLOYEE_PROFILE}
            element={
              <PrivateRoute>
                <EmployeeProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path={RoutesPath.EMPLOYEE_SKILLS}
            element={
              <PrivateRoute>
                <EmployeeSkillsPage />
              </PrivateRoute>
            }
          />
          <Route
            path={RoutesPath.EMPLOYEE_LANGUAGES}
            element={
              <PrivateRoute>
                <EmployeeLanguagesPage />
              </PrivateRoute>
            }
          />
          <Route
            path={RoutesPath.EMPLOYEE_CVS}
            element={
              <PrivateRoute>
                <EmployeeCvsPage />
              </PrivateRoute>
            }
          />

          <Route path={RoutesPath.OTHER} element={redirectPath} />
        </Route>
      </Routes>
    </Suspense>
  );
}
