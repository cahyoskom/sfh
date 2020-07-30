import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

const PublicRouteConfirmation = ({
  component,
  exact = false,
  path,
  authenticated,
}) => {
  var search = window.location.search.substring(1);
  var queryStringObj = JSON.parse(
    '{"' +
      decodeURI(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
  console.log(queryStringObj);
  if (queryStringObj.q == "update_password") {
    authenticated = true;
  }
  return (
    <Route
      exact={exact}
      path={path}
      render={(props) =>
        authenticated ? (
          <Redirect
            to={`${process.env.PUBLIC_URL}/update_password/${queryStringObj.code}`}
          />
        ) : (
          React.createElement(component, props)
        )
      }
    />
  );
};

export default PublicRouteConfirmation;
