import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component, exact = false, path, authenticated }) => {
  return (
    <Route
      exact={exact}
      path={path}
      render={props => (authenticated ? <Redirect to={`${process.env.PUBLIC_URL}/`} /> : React.createElement(component, props))}
    />
  );
};

export default PublicRoute;
