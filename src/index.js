import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ScrollContext } from 'react-router-scroll-4';
import { IntlProvider } from 'react-redux-multilingual';
import { IntlActions } from 'react-redux-multilingual';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import './index.scss';
import store from './store';
import translations from './constants/translations';

// Routes
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// Container
import App from './components/app';

// Pages
import Home from './components/pages/home';
import SignIn from './components/pages/loginPage';
import Register from './components/pages/register';
import UpdatePassword from './components/pages/update-password';
import Confirmation from './components/pages/confirmation';
import PageNotFound from './components/pages/404';
import AdsList from './components/pages/adsList';
import AdsAproval from './components/pages/adsAproval';

var lang = localStorage.getItem('locale-lang');

if (!lang) {
  lang = 'en';
}

class Root extends React.Component {
  authCheck() {
    let { account } = store.getState();
    if (!account.token || !account.token || !account.profile || !account.profile) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    store.dispatch(IntlActions.setLocale(lang));

    return (
      <Provider store={store}>
        <IntlProvider translations={translations} locale='en'>
          <BrowserRouter basename={'/'}>
            <ScrollContext>
              <App>
                <Switch>
                  <PrivateRoute
                    exact
                    path={`${process.env.PUBLIC_URL}/`}
                    component={AdsList}
                    authenticated={this.authCheck()}
                  />
                  <PrivateRoute
                    exact
                    path={`${process.env.PUBLIC_URL}/pratinjau/:id`}
                    component={AdsAproval}
                    authenticated={this.authCheck()}
                  />

                  <PublicRoute path={`${process.env.PUBLIC_URL}/login`} component={SignIn} authenticated={this.authCheck()} />
                  <PublicRoute path={`${process.env.PUBLIC_URL}/confirmation`} component={Confirmation} />
                  <PublicRoute
                    path={`${process.env.PUBLIC_URL}/register`}
                    component={Register}
                    authenticated={this.authCheck()}
                  />
                  <PublicRoute path={`${process.env.PUBLIC_URL}/update_password/:code`} component={UpdatePassword} />
                  <Route component={PageNotFound} />
                </Switch>
              </App>
            </ScrollContext>
          </BrowserRouter>
        </IntlProvider>
      </Provider>
    );
  }
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0170E3',
      contrastText: '#fff'
    },
    secondary: {
      main: '#FF2E2E',
      contrastText: '#fff'
    }
  },
  overrides: {
    MuiButton: {
      label: {
        textTransform: 'none'
      }
    }
  },
  shape: {
    borderRadius: 10
  }
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Root />
  </ThemeProvider>,
  document.getElementById('root')
);
