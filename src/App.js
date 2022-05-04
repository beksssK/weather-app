import { Provider } from "react-redux";
import { store } from "./store/store";
import "./sass/main.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Auth/Login";
import Detailed from "./pages/Detailed/Detailed";
import Auth from "./components/Auth/Auth";
import Register from "./pages/Auth/Register";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Auth>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/detailed" element={<Detailed />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Auth>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
