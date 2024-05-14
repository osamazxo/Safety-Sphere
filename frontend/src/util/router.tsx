import Home from "@pages/User/Home";
import UserLayout from "@pages/User/Layout";
import Signin from "@pages/Signin";
import { useEffect } from "react";
import { Outlet, createBrowserRouter, useNavigate } from "react-router-dom";
import Signout from "@pages/Signout";
import Settings from "@pages/Settings";
import Analytics from "@pages/User/Analytics";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return navigate("/signin");
    }
  }, [navigate]);
  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/signout",
        element: <Signout />,
      },
      {
        path: "/user",
        element: <UserLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "analytics",
            element: <Analytics />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },
]);
export { router };
