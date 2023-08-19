import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/style.css";
import Login from "./comnponents/Login";
import Dashboard from "./comnponents/Dashboard";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import routes from "./routes/routes";

export const router = createBrowserRouter([...routes]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router}>
        <Login />
        <Dashboard />
      </RouterProvider>
    </Provider>
  );
}

export default App;
