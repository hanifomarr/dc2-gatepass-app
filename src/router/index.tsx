import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";
import HouseList from "@/pages/houses";
import ResidentList from "@/pages/residents";
import VisitorList from "@/pages/visitors";
import UserList from "@/pages/users";
import { ResidentDashboard, RegisterVisitor, MyVisitors, Payments } from "@/pages/resident-portal";
import LoginPage from "@/pages/login";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
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
            element: <ProtectedRoute allowedRoles={['admin', 'guard']} />,
            children: [
              {
                index: true,
                element: <Dashboard />,
              },
              {
                path: "houses",
                element: <HouseList />,
              },
              {
                path: "residents",
                element: <ResidentList />,
              },
              {
                path: "visitors",
                element: <VisitorList />,
              },
              {
                path: "users",
                element: <UserList />,
              },
              {
                path: "users",
                element: <UserList />,
              },
            ]
          },
          {
            element: <ProtectedRoute allowedRoles={['resident']} />,
            children: [
              // Resident Portal Routes
              {
                path: "resident-dashboard",
                element: <ResidentDashboard />,
              },
              {
                path: "register-visitor",
                element: <RegisterVisitor />,
              },
              {
                path: "my-visitors",
                element: <MyVisitors />,
              },
              {
                path: "payments",
                element: <Payments />,
              },
            ]
          },
        ],
      },
    ],
  },
]);
