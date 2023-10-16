import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute.tsx";
import Layout from "../components/Layout.tsx";
import Board from "../components/Board.tsx";
import Members from "../components/Members.tsx";
import { ShowError } from "../components/ShowError.tsx";
import Login from "../components/Login.tsx";
import Join from "../components/Join.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Board />,
      },
      {
        path: "members",
        element: <Members />,
      },
    ],
    errorElement: <ShowError />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ShowError />,
  },
  {
    path: "/join",
    element: <Join />,
    errorElement: <ShowError />,
  },
]);
export default router;
