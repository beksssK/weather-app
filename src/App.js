import { Provider } from "react-redux";
import { store } from "./store/store";
import "./sass-utils/main.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Auth/Login/Login";
import Detailed from "./pages/Detailed/Detailed";

function App() {
  console.log("update");
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/detailed" element={<Detailed />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
