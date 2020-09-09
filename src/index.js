import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ScrollContext } from 'react-router-scroll-4';
import { IntlReducer as Intl, IntlProvider } from 'react-redux-multilingual';
import { IntlActions } from 'react-redux-multilingual';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import './index.scss';

// Import custom components
import store from './store';
import translations from './constants/translations';
import Fashion from './components/layouts/fashion';

// Features
import Layout from './components/app';

// Extra Pages
import UpdatePassword from './components/pages/update-password';

//customme
import Home from './components/pages/home';
import SignIn from './components/pages/loginPage';
import Register from './components/pages/register';
import PrivateRoute from './PrivateRoute';

// import PrivateRouteAdmin from './PrivateRouteAdmin';

import PublicRoute from './PublicRoute';
import PublicRouteConfirmation from './PublicRouteConfirmation';

// import Admin from './components/usermanagement/admin';
// import Group from './components/usermanagement/group';
// import User from './components/usermanagement/user';
// import UserPerId from './components/usermanagement/user_perid';
// import Subject from './components/usermanagement/subject';
// import Class from './components/usermanagement/class';
// import Student from './components/usermanagement/student';
// import Role from './components/usermanagement/role';
import Confirmation from './components/pages/confirmation';

var lang = localStorage.getItem('locale-lang');

if (lang == null) {
  lang = 'en';
}

class Root extends React.Component {
  authCheck() {
    let { account } = store.getState();
    if (account.token == null || account.token == undefined || account.profile == null || account.profile == undefined) {
      return false;
    } else {
      return true;
    }
  }

  // roleAdminCheck() {
  //   let { account } = store.getState();
  //   if (account.token == null || account.token == undefined || account.profile == null || account.profile == undefined) {
  //     return false;
  //   } else {
  //     if (account.roles == null || account.roles == undefined || account.selectedRole[0].group_id != 1) {
  //       return false;
  //     } else {
  //       return true;
  //     }
  //   }
  // }

  render() {
    // store.dispatch(getAllProducts());
    store.dispatch(IntlActions.setLocale(lang));

    return (
      <Provider store={store}>
        <IntlProvider translations={translations} locale='en'>
          <BrowserRouter basename={'/'}>
            <ScrollContext>
              <Layout>
                <Switch>
                  <PrivateRoute exact path={`${process.env.PUBLIC_URL}/`} component={Home} authenticated={this.authCheck()} />

                  {/* Custom Routes */}
                  <PublicRoute path={`${process.env.PUBLIC_URL}/login`} component={SignIn} authenticated={this.authCheck()} />

                  <PublicRoute path={`${process.env.PUBLIC_URL}/confirmation`} component={Confirmation} />

                  <PublicRoute
                    path={`${process.env.PUBLIC_URL}/register`}
                    component={Register}
                    authenticated={this.authCheck()}
                  />

                  <PublicRoute path={`${process.env.PUBLIC_URL}/update_password/:code`} component={UpdatePassword} />

                  {/* <PrivateRouteAdmin
                    path={`${process.env.PUBLIC_URL}/usermanagement/group`}
                    component={Group}
                    authenticated={this.authCheck()}
                    role={this.roleAdminCheck()}
                  />

                  <PrivateRouteAdmin
                    path={`${process.env.PUBLIC_URL}/usermanagement/user/:id`}
                    component={UserPerId}
                    authenticated={this.authCheck()}
                    role={this.roleAdminCheck()}
                    exact={true}
                  />

                  <PrivateRouteAdmin
                    path={`${process.env.PUBLIC_URL}/usermanagement/user`}
                    component={User}
                    authenticated={this.authCheck()}
                    role={this.roleAdminCheck()}
                    exact={true}
                  />

                  <PrivateRouteAdmin
                    path={`${process.env.PUBLIC_URL}/usermanagement/subject`}
                    component={Subject}
                    authenticated={this.authCheck()}
                    role={this.roleAdminCheck()}
                  />

                  <PrivateRouteAdmin
                    path={`${process.env.PUBLIC_URL}/usermanagement/class`}
                    component={Class}
                    authenticated={this.authCheck()}
                    role={this.roleAdminCheck()}
                  />

                  <PrivateRouteAdmin
                    path={`${process.env.PUBLIC_URL}/usermanagement/student`}
                    component={Student}
                    authenticated={this.authCheck()}
                    role={this.roleAdminCheck()}
                  />

                  <PrivateRouteAdmin
                    path={`${process.env.PUBLIC_URL}/usermanagement/role`}
                    component={Role}
                    authenticated={this.authCheck()}
                    role={this.roleAdminCheck()}
                  />

                  <PrivateRouteAdmin
                    path={`${process.env.PUBLIC_URL}/usermanagement`}
                    component={Admin}
                    authenticated={this.authCheck()}
                    role={this.roleAdminCheck()}
                  /> */}

                  {/* <Route component={PageNotFound} /> */}
                </Switch>
              </Layout>
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
