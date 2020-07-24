import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { IntlActions } from "react-redux-multilingual";
import Pace from "react-pace-progress";

// Import custom components
import store from "../../../store";
import NavbarTMS from "./common/navbarNew";
import SideBar from "./common/sidebar";
import CartContainer from "./../../../containers/CartContainer";
import TopBar from "./common/topbar";
import { changeCurrency } from "../../../actions";
import { connect } from "react-redux";

class HeaderTwo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  componentWillMount() {
    // window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    // window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    let number =
      window.pageXOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    if (number >= 300) {
      document.getElementById("sticky").classList.add("fixed");
    } else {
      document.getElementById("sticky").classList.remove("fixed");
    }
  };

  changeLanguage(lang) {
    store.dispatch(IntlActions.setLocale(lang));
    localStorage.setItem("locale-lang", lang);
  }

  openNav() {
    var openmyslide = document.getElementById("mySidenav");
    if (openmyslide) {
      openmyslide.classList.add("open-side");
    }
  }
  openSearch() {
    document.getElementById("search-overlay").style.display = "block";
  }

  closeSearch() {
    document.getElementById("search-overlay").style.display = "none";
  }

  load = () => {
    this.setState({ isLoading: true });
    fetch().then(() => {
      // deal with data fetched
      this.setState({ isLoading: false });
    });
  };

  render() {
    return (
      <header id="sticky" className="sticky header-tms">
        {this.state.isLoading ? <Pace color="#27ae60" /> : null}
        {/* <div className="mobile-fix-option" /> */}
        {/*Top Header Component*/}
        {/* <TopBar /> */}

        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="main-menu">
                <div className="menu-left">
                  <div className="navbar">
                    {/* <a href="javascript:void(0)" onClick={this.openNav}>
                      <div className="bar-style">
                        {" "}
                        <i
                          className="fa fa-bars sidebar-bar"
                          aria-hidden="true"
                        />
                      </div>
                    </a> */}
                    {/*SideBar Navigation Component*/}
                    {/* <SideBar /> */}
                  </div>
                  <div className="brand-logo">
                    {/* <Link to={`${process.env.PUBLIC_URL}/`}>
                      <img
                        src={`${
                          process.env.PUBLIC_URL
                        }/assets/images/icon/jotun.png`}
                        className="img-fluid"
                        alt=""
                      />
                    </Link> */}
                  </div>
                </div>
                <div className="menu-right pull-right">
                  {/*Top Navigation Bar Component*/}
                  {/* <NavbarTMS /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default connect(null, { changeCurrency })(HeaderTwo);
