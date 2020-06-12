import React, {Component} from 'react';
import SimpleReactValidator from "simple-react-validator";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import BlockUi from "react-block-ui";
import {
    postLogin,
    onChangeStateLogin,
    resetStateLoginMenu
  } from "../../actions";

import Breadcrumb from "../common/breadcrumb";

class SignIn extends Component {

    constructor (props) {
        super (props)

        this.validator = new SimpleReactValidator();

    }

    componentDidMount() {
        document.getElementById('footer').style.display = "none"
        document.getElementById('sticky').style.display = "none"
    }

    componentWillMount() {
        const { resetStateLoginMenu } = this.props;
        resetStateLoginMenu();
    }

    onClickLogin() {
        const { accountState, postLogin } = this.props;
        if (this.validator.allValid()) {
          // if (this.validateEmail(accountState.login.username)) {
          //   postLogin();
          // } else {
          //   fail("Email is not valid !");
          // }
          postLogin();
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    onEnterKeyPress(e) {
        if (e.charCode == 13) {
          this.onClickLogin();
        }
      }

    renderView (){
        const { accountState, onChangeStateLogin } = this.props;

        return (
            <div>
                {/* <Breadcrumb title={'Login'}/> */}
                
                
                {/*Login section*/}
                <section className="login-page section-b-space">
                    <div className="container">
                        <div className="row row d-flex justify-content-center">
                            <div className="col-lg-4">
                                <div className={"text-center"}>
                                    <h5>Sign In Google</h5>
                                </div>
                                <div className="theme-card">
                                    <form className="theme-form">
                                        <div className="form-group">
                                            <label htmlFor="email">Username</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="username"
                                                placeholder="Username"
                                                onChange={e =>
                                                onChangeStateLogin(e.target.id, e.target.value)
                                                }
                                                onKeyPress={e => this.onEnterKeyPress(e)}
                                                autoComplete={"username"}
                                            />
                                            {this.validator.message(
                                                "username",
                                                accountState.login.username,
                                                "required"
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="review">Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="password"
                                                placeholder="Enter your password"
                                                onChange={e =>
                                                onChangeStateLogin(e.target.id, e.target.value)
                                                }
                                                onKeyPress={e => this.onEnterKeyPress(e)}
                                                autoComplete={"password"}
                                            />
                                            {this.validator.message(
                                                "password",
                                                accountState.login.password,
                                                "required"
                                            )}
                                        </div>
                                        <div className={"text-center"}>
                                            <a 
                                                onClick={() => {
                                                    this.onClickLogin();
                                                }}
                                                className="btn btn-solid"
                                            >Login</a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }

    render() {
        const { accountState } = this.props;
    
        return (
          <BlockUi
            tag="div"
            blocking={accountState.loader}
            message={
              <span>
                <div id="preloader">
                  <div id="loader" />
                </div>
              </span>
            }
          >
            {this.renderView()}
          </BlockUi>
        );
      }

}

// export default SignIn
const mapStateToProps = state => ({
    accountState: state.account
  });
  
  export default connect(
    mapStateToProps,
    { postLogin, onChangeStateLogin, resetStateLoginMenu }
  )(SignIn);