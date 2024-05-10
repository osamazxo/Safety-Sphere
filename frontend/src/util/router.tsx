import Home from "@pages/Home";
import Layout from "@pages/Layout";
import Signin from "@pages/Signin";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
    ],
  },
]);
export { router };
