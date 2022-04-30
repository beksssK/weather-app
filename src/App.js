import { BrowserRouter, Switch } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./config/routes";
import PublicRoutes from "./components/PublicRoutes/PublicRoutes";
import { createBrowserHistory } from "history";
import PrivateRoutes from "./components/PrivateRoutes/PrivateRoutes";
import { Provider } from "react-redux";
import { store } from "./store/store";

export const history = createBrowserHistory();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          {publicRoutes.map((route) => (
            <PublicRoutes key={route.path} {...route} />
          ))}
          {privateRoutes.map((route) => (
            <PrivateRoutes key={route.path} {...route} />
          ))}
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
