import {Redirect, Route} from "react-router-dom";
import {ROUTES} from "../../config/routes";

const PublicRoutes= ({ component, ...rest }) => {
  const Component = component;
  return (
    <Route {...rest} render={(props) => {
      if (true) return <Redirect to={{ pathname: ROUTES.DASHBOARD }} />;
      return <Component {...props} />;
    }}
    />
  );
};

export default PublicRoutes