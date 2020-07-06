import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ScrollContext } from 'react-router-scroll-4';
import { IntlReducer as Intl, IntlProvider } from 'react-redux-multilingual'
import { IntlActions } from 'react-redux-multilingual'
import './index.scss';

// Import custom components
import store from './store';
import translations from './constants/translations'
import { getAllProducts } from './actions'
import Fashion from './components/layouts/fashion';

//Collection Pages
import CollectionLeftSidebar from "./components/collection/collection-left-sidebar";
import CollectionNoSidebar from "./components/collection/collection-no-sidebar";
import CollectionRightSidebar from "./components/collection/collection-right-sidebar";

// Product Pages
import LeftSideBar from "./components/products/left-sidebar";
import RightSideBar from "./components/products/right-sidebar";
import NoSideBar from "./components/products/no-sidebar";
import LeftImage from "./components/products/left-image";
import RightImage from "./components/products/right-image";
import Accordian from "./components/products/accordian";
import ColumnLeft from "./components/products/column-left";
import ColumnRight from "./components/products/column-right";
import Column from "./components/products/column";
import Vertical from "./components/products/vertical";

// Features
import Layout from './components/app'
import Cart from './components/cart'
import Compare from './components/compare/index'
import wishList from './components/wishlist'
import checkOut from './components/checkout'
import orderSuccess from './components/checkout/success-page'

// Extra Pages
import aboutUs from './components/pages/about-us'
import PageNotFound from './components/pages/404'
import lookbook from './components/pages/lookbook'
import Login from './components/pages/login'
import Register from './components/pages/register'
import Search from './components/pages/search'
import Collection from './components/pages/collection'
import ForgetPassword from './components/pages/forget-password'
import Contact from './components/pages/contact'
import Dashboard from './components/pages/dashboard'
import Faq from './components/pages/faq'

// Blog Pages
import RightSide from './components/blogs/right-sidebar'
import Details from './components/blogs/details'
import BlogPage from './components/blogs/blog-page'

//customme
import SignIn from './components/pages/loginPage'
import PrivateRoute from './PrivateRoute';
import PrivateRouteGuru from './PrivateRouteGuru';
import PrivateRouteSiswa from './PrivateRouteSiswa';
import PrivateRouteAdmin from './PrivateRouteAdmin';
import PrivateRouteKepsek from './PrivateRouteAdmin';
import PublicRoute from './PublicRoute';
import TaskSiswa from './components/tasklist/tasksiswa';
import TaskOrtu from './components/tasklist/taskortu';
import TaskKepsek from './components/tasklist/taskkepsek';
import TaskKepsekPerId from './components/tasklist/taskkepsek_perid';
import TaskGuru from './components/tasklist/taskguru';
import TaskGuruPerId from './components/tasklist/taskguru_perid';
import Admin from './components/usermanagement/admin';
import Group from './components/usermanagement/group';
import User from './components/usermanagement/user';
import UserPerId from './components/usermanagement/user_perid';
import Subject from './components/usermanagement/subject';
import Class from './components/usermanagement/class';
import Student from './components/usermanagement/student';
import Role from './components/usermanagement/role';

var lang = localStorage.getItem('locale-lang');

if(lang==null){
	lang='en';
}

class Root extends React.Component {
	authCheck() {
		let { account } = store.getState()
		if(account.token == null || account.token==undefined || account.profile == null || account.profile==undefined){
			return false
		}
		else{
			return true
		}
	  }
	  
	roleGuruCheck(){
		let { account } = store.getState()
		if(account.token == null || account.token==undefined || account.profile == null || account.profile==undefined){
			return false
		}
		else{
			if(account.roles == null || account.roles==undefined || account.selectedRole[0].group_id != 4){
				return false
			}
			else{
				return true
			}
		}
	}

	roleSiswaCheck(){
		let { account } = store.getState()
		if(account.token == null || account.token==undefined || account.profile == null || account.profile==undefined){
			return false
		}
		else{
			if(account.roles == null || account.roles==undefined || account.selectedRole[0].group_id != 6){
				return false
			}
			else{
				return true
			}
		}
	}

	roleAdminCheck(){
		let { account } = store.getState()
		if(account.token == null || account.token==undefined || account.profile == null || account.profile==undefined){
			return false
		}
		else{
			if(account.roles == null || account.roles==undefined || account.selectedRole[0].group_id != 1){
				return false
			}
			else{
				return true
			}
		}
	}

	roleKepsekCheck(){
		let { account } = store.getState()
		if(account.token == null || account.token==undefined || account.profile == null || account.profile==undefined){
			return false
		}
		else{
			if(account.roles == null || account.roles==undefined || account.selectedRole[0].group_id != 2){
				return false
			}
			else{
				return true
			}
		}
	}

    render() {
        // store.dispatch(getAllProducts());
		store.dispatch(IntlActions.setLocale(lang))

        return(
        	<Provider store={store}>
                <IntlProvider translations={translations} locale='en'>
				<BrowserRouter basename={'/'} >
					<ScrollContext>
                        <Layout>
                            <Switch>
								<PrivateRoute
									exact
									path={`${process.env.PUBLIC_URL}/`}
									component={SignIn}
									authenticated={this.authCheck()}
								/>

								{/* Custom Routes */}
								<PublicRoute path={`${process.env.PUBLIC_URL}/login`} component={SignIn}/>

								<PrivateRouteSiswa
									path={`${process.env.PUBLIC_URL}/tasksiswa`}
									component={TaskSiswa}
									// authenticated={this.authCheck()}
									role={this.roleSiswaCheck()}
									exact={true}
								/>

								<PrivateRoute
									path={`${process.env.PUBLIC_URL}/taskortu`}
									component={TaskOrtu}
									authenticated={this.authCheck()}
								/>

								<PrivateRouteKepsek
									path={`${process.env.PUBLIC_URL}/taskkepsek/:id`}
									component={TaskKepsekPerId}
									// authenticated={this.authCheck()}
									role={this.roleKepsekCheck()}
								/>

								<PrivateRouteKepsek
									path={`${process.env.PUBLIC_URL}/taskkepsek`}
									component={TaskKepsek}
									// authenticated={this.authCheck()}
									role={this.roleKepsekCheck()}
								/>

								<PrivateRouteGuru
									path={`${process.env.PUBLIC_URL}/taskguru/:id`}
									component={TaskGuruPerId}
									// authenticated={this.authCheck()}
									role={this.roleGuruCheck()}
									exact={true}
								/>

								<PrivateRouteGuru
									path={`${process.env.PUBLIC_URL}/taskguru`}
									component={TaskGuru}
									// authenticated={this.authCheck()}
									role={this.roleGuruCheck()}
									exact={true}
								/>

								<PrivateRouteAdmin
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
								/>

								{/*Routes For Extra Pages*/}
                                {/* <Route path={`${process.env.PUBLIC_URL}/pages/about-us`} component={aboutUs}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/404`} component={PageNotFound}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/lookbook`} component={lookbook}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/login`} component={Login}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/register`} component={Register}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/search`} component={Search}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/collection`} component={Collection}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/forget-password`} component={ForgetPassword}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/contact`} component={Contact}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/dashboard`} component={Dashboard}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/faq`} component={Faq}/> */}

								{/*Blog Pages*/}
                                {/* <Route path={`${process.env.PUBLIC_URL}/blog/right-sidebar`} component={RightSide}/>
                                <Route path={`${process.env.PUBLIC_URL}/blog/details`} component={Details}/>
                                <Route path={`${process.env.PUBLIC_URL}/blog/blog-page`} component={BlogPage}/> */}

								<Route component={PageNotFound} />
                            </Switch>
						</Layout>
					  </ScrollContext>
					</BrowserRouter>
                </IntlProvider>
			</Provider>
    	);
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));


