import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import HouseManagement from "../pages/HouseManagement";
import ResidentManagement from "../pages/ResidentManagement";
import VisitorManagement from "../pages/VisitorManagement";
import UserManagement from "../pages/UserManagement";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "houses",
            element: <HouseManagement />,
          },
          {
            path: "residents",
            element: <ResidentManagement />,
          },
          {
            path: "visitors",
            element: <VisitorManagement />,
          },
          {
            path: "users",
            element: <UserManagement />,
          },
        ],
      },
    ],
  },
]);
