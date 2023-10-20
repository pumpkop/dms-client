import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute.tsx";
import Container from "../components/Container.tsx";
import Members from "../components/Members.tsx";
import { ShowError } from "../components/ShowError.tsx";
import Login from "../components/Login.tsx";
import Join from "../components/Join.tsx";
import { OrderSheet } from "../components/OrderSheet.tsx";
import { Notice } from "../components/Notice.tsx";
import { Qna } from "../components/Qna.tsx";
import { OrderList } from "../components/OrderList.tsx";
import { ProductList } from "../components/ProductList.tsx";
import { LedgerList } from "../components/LedgerList.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Container />
      </ProtectedRoute>
    ),
    children: [
      // {
      //   path: "",
      //   element: <DashBoard />,
      // },
      {
        // path: "/register",
        path: "",
        element: <OrderSheet />,
      },
      {
        path: "/orderList",
        element: <OrderList />,
      },
      {
        path: "/productList",
        element: <ProductList />,
      },
      {
        path: "/ledgerList",
        element: <LedgerList />,
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
  {
    path: "/qna",
    element: <Qna />,
    errorElement: <ShowError />,
  },
  {
    path: "/notice",
    element: <Notice />,
    errorElement: <ShowError />,
  },
]);
export default router;
