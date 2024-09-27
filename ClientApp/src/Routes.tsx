import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "./Login";
import Todo from "./Todo";
import Settings from "./Settings";
import Register from "./Register";

const Routes = () => {
  const { token } = useAuth();

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/service",
      element: <div>Service Page</div>,
    },
    {
      path: "/about-us",
      element: <div>About Us</div>,
    },
  ];

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
      element: <div>Home Page not logged in</div>,
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
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return (
//   <NavigationMenu.Root className="NavigationMenuRoot">
    <RouterProvider router={router} />
    // </NavigationMenu.Root>
)
};

export default Routes;