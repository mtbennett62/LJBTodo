import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import { useAuth } from "../../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../Login/Login";
import Todo from "../Todo/Todo";
import Settings from "../Settings/Settings";
import Register from "../Login/Register";

const Routes = () => {
  const { token } = useAuth();

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/",
          element: <Todo />,
        },
        {
          path: "/settings",
          element: <Settings />, 
        },
        {
          path: "/logout",
          element: <div>Logout</div>,
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      // Redirect to login page
      element: <Navigate to="/login" />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    }
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return (
    <RouterProvider router={router} />
)
};

export default Routes;