import UserHome from "@pages/User/Home";
import UserLayout from "@pages/User/Layout";
import Signin from "@pages/Signin";
import { useEffect } from "react";
import { Outlet, createBrowserRouter, useNavigate } from "react-router-dom";
import Signout from "@pages/Signout";
import UserSettings from "@pages/User/Settings";
import Analytics from "@pages/User/Analytics";
import AdminLayout from "@pages/Admin/Layout";
import AdminHome from "@pages/Admin/Home";
import Devices from "@pages/Admin/Devices";

// eslint-disable-next-line react-refresh/only-export-components
const ProtectedRoute = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return navigate("/signin");
    }
  }, [navigate]);
  return <Outlet />;
};

// eslint-disable-next-line react-refresh/only-export-components
const Fallback = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("role") === "admin") {
      return navigate("/admin");
    } else {
      return navigate("/user");
    }
  }, [navigate]);
  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      //global routes
      {
        index: true,
        element: <Fallback />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/signout",
        element: <Signout />,
      },
      // user routes
      {
        path: "/user",
        element: <UserLayout />,
        children: [
          {
            index: true,
            element: <UserHome />,
          },
          {
            path: "analytics",
            element: <Analytics />,
          },
          {
            path: "settings",
            element: <UserSettings />,
          },
        ],
      },
      // admin routes
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminHome />,
          },
          {
            path: "devices",
            element: <Devices />,
          },
          {
            path: "settings",
            element: <UserSettings />,
          },
        ],
      },
    ],
  },
]);
export { router };
