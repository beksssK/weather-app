import { Provider } from "react-redux";
import { store } from "./store/store";
import "./sass/main.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Auth/Login";
import Detailed from "./pages/Detailed/Detailed";
import Register from "./pages/Auth/Register";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/detailed"
              element={
                <PrivateRoute>
                  <Detailed />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
