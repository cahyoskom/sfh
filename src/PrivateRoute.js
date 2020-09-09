import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component, exact = false, path, authenticated }) => {
  return (
    <Route
      exact={exact}
      path={path}
      render={props =>
        authenticated ? React.createElement(component, props) : <Redirect to={`${process.env.PUBLIC_URL}/login`} />
      }
    />
  );
};

export default PrivateRoute;
