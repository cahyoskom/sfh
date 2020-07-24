import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import $ from "jquery";
import "smartmenus";
import { withTranslate, IntlActions } from "react-redux-multilingual";
import store from "../../../../store";
import { postLogout } from "../../../../actions";

class NavbarTMS extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navClose: { right: "0px" },
    };
  }

  componentWillMount() {
    $(function () {
      $("#main-menu").smartmenus({
        subMenusSubOffsetX: 1,
        subMenusSubOffsetY: -8,
      });
    });
    if (window.innerWidth < 750) {
      this.setState({ navClose: { right: "-410px" } });
    }
    if (window.innerWidth < 1199) {
      this.setState({ navClose: { right: "-300px" } });
    }
  }

  changeLanguage(lang) {
    store.dispatch(IntlActions.setLocale(lang));
    localStorage.setItem("locale-lang", lang);
  }

  openNav() {
    this.setState({ navClose: { right: "0px" } });
  }
  closeNav() {
    this.setState({ navClose: { right: "-410px" } });
  }
  onClickSignOut() {
    const { postLogout } = this.props;
    postLogout();
  }
  render() {
    const { translate } = this.props;
    return (
      <div>
        <nav id="main-nav">
          <div className="toggle-nav" onClick={this.openNav.bind(this)}>
            <i className="fa fa-bars sidebar-bar" />
          </div>
          {/*Horizontal menu*/}
          <ul
            id="main-menu"
            className="sm pixelstrap main-menu sm-horizontal"
            style={this.state.navClose}
          >
            <li>
              <div
                className="mobile-back text-right"
                onClick={this.closeNav.bind(this)}
              >
                Back
                <i className="fa fa-angle-right pl-2" aria-hidden="true" />
              </div>
            </li>
            <li className="mega">
              <Link to={`${process.env.PUBLIC_URL}/statuspesanan`}>
                {translate("shipment_status")}
              </Link>
            </li>
            <li>
              <a href="#">{translate("language")}</a>
              <ul className={"child-menu"}>
                <li>
                  <a href={null} onClick={() => this.changeLanguage("en")}>
                    English
                  </a>{" "}
                </li>
                <li>
                  <a href={null} onClick={() => this.changeLanguage("id")}>
                    Indonesia
                  </a>{" "}
                </li>
              </ul>
            </li>
            <li className="mega">
              <a
                style={{ cursor: "pointer" }}
                onClick={() => {
                  this.onClickSignOut();
                }}
              >
                {translate("logout")}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  accountState: state.account,
});

export default connect(mapStateToProps, { postLogout })(
  withTranslate(NavbarTMS)
);
