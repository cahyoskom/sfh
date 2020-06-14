import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRouteSiswa = ({ component, exact = true, path, role }) => {
  return(
    <Route
      exact={exact}
      path={path}
      render={props => (
        // authenticated ? (
          role ? (
          React.createElement(component, props)
        ) : (
            <Redirect to={`${process.env.PUBLIC_URL}/login`}
            />
          )
      )}
    />
  )
};


export default PrivateRouteSiswa;
