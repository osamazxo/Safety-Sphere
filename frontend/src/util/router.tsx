import Home from "@pages/User/Home";
import UserLayout from "@pages/User/Layout";
import Signin from "@pages/Signin";
import { useEffect } from "react";
import { Outlet, createBrowserRouter, useNavigate } from "react-router-dom";
import Signout from "@pages/Signout";
import Settings from "@pages/Settings";
import Analytics from "@pages/User/Analytics";

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
      // admin routes
    ],
  },
]);
export { router };
