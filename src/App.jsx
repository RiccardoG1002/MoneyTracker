import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Layouts
import Main, { mainLoader } from "./layouts/Main";

// Routes
import Error from "./pages/Error";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    loader: mainLoader,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        element: <Dashboard></Dashboard>,
        // loader: dashboardLoader,
        // errorElement: <Error></Error>
      },
    ]
  },
]);

function App() {
  return  <div className='App'>
    <RouterProvider router={router} />
  </div>;
}

export default App
