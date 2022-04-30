import React from 'react';
import {Redirect, Route} from "react-router-dom";
import {ROUTES} from "../../config/routes";

const PrivateRoutes = ({component, ...rest}) => {
  const Component = component;
  return (
    <>
      <Route {...rest} render={(props) => {
        if(false) {
          return <Redirect to={{ pathname: ROUTES.LOGIN }} />;
        }
        return <Component {...props} />;
      }}/>
    </>
  );
};

export default PrivateRoutes;