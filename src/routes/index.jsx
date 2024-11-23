import { createBrowserRouter } from "react-router-dom";
import HomePage from "@pages/HomePage";
import BaseLayout from "@layouts/BaseLayout";
import DetailsPage from "../pages/DetailsPage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <BaseLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "/pokemon/:id",
          element: <DetailsPage />,
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatRoutes: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
      v7_relativeSplatPath: true,
    },
  }
);

export default router;
