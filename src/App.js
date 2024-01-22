import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PageNotFoundError from "./pages/Errors/404";
import DashboardIndexDecider from "./DashboardIndexDecider";
import { ConfigProvider } from 'antd';
import Root from './layout/Root';
import AdminDashboard from './pages/Administrators/Dashboard/AdminDashboard';
import ApplicantDashboard from './pages/Applicants/Dashboard/ApplicantDashboard';
import SuperuserDashboard from './pages/Superusers/Dashboard/SuperuserDashboard';
import SignUp from './pages/Authentication/SignUp/SignUp';
import Login from './pages/Authentication/Login/Login';


const router = createBrowserRouter([
  {
    path: "/sign-in",
    element: <Login />,
    errorElement: <PageNotFoundError />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
    errorElement: <PageNotFoundError />,
  },

  {
    path: "/",
    element: <Root />,
    errorElement: <PageNotFoundError />,
    children: [
      <PageNotFoundError />,

      {
        index: true,
        element: <DashboardIndexDecider />,
      },
      


      // Administrator Routes
      {
        path: "admin/dashboard",
        element: <AdminDashboard />,
        // loader: adminDashboardLoader,
      },

      {
        path: "admin/applications",
        element: <AdminDashboard />,
        // loader: adminDashboardLoader,
      },
      {
        path: "admin/jobs",
        element: <AdminDashboard />,
        // loader: adminDashboardLoader,
      },
      {
        path: "admin/interviews",
        element: <AdminDashboard />,
        // loader: adminDashboardLoader,
      },
      {
        path: "admin/applicants",
        element: <AdminDashboard />,
        // loader: adminDashboardLoader,
      },


      // Applicant Routes
      {
        path: "applicant/dashboard",
        element: <ApplicantDashboard />,
        // loader: applicantDahboardLoader,
      },



      // Superadmin Routes
      {
        path: "superadmin/dashboard",
        element: <SuperuserDashboard />,
        // loader: SuperuserDashboardLoader,
      },
    ],
  },
]);

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#b191ff',
          colorBgLayout: '#ecebe5'
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default App