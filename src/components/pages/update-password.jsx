import React, {Component} from 'react';
import SimpleReactValidator from "simple-react-validator";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import BlockUi from "react-block-ui";
import {
    onChangeStateUpdatePassword,
    updatePassword,
    setUpdatePasswordCode
  } from "../../actions";
import { 
Button, Form, FormGroup, Modal, ModalHeader, 
ModalBody, ModalFooter, Col, Row, Label, Input, InputGroup } from "reactstrap";
import Select from 'react-select'
import Recaptcha from 'react-recaptcha';



import Breadcrumb from "../common/breadcrumb";

const recaptchaRef = React.createRef();



class UpdatePassword extends Component {

    state = {
        newPasswordModal: false
    }

    constructor (props) {
        super (props)

        this.validator = new SimpleReactValidator();
        // const {setUpdatePasswordCode} = this.props
        // setUpdatePasswordCode(this.props.match.params.id)

    }


    componentDidMount() {
        document.getElementById('footer').style.display = "none"
        document.getElementById('sticky').style.display = "none"
    }

    recaptchaLoaded(){
    }

    onClickUpdatePassword() {
        let {setUpdatePasswordCode, updatePassword, onChangeStateUpdatePassword} = this.props
        onChangeStateUpdatePassword("code",this.props.match.params.code)
        updatePassword()
    }

    
    

    renderView (){
        const { accountState, onChangeStateUpdatePassword, updatePassword } = this.props;
        

        return (
            <div>
                {/* <Breadcrumb title={'Login'}/> */}
                
                {/*Login section*/}
                <section className="login-page section-b-space">
                    <div className="container">
                        <div className="row row d-flex justify-content-center">
                            <div className="col-lg-4">
                                <div className={"text-center"}>
                                    <h5>Perbarui kata sandi</h5>
                                </div>

                                <div className="theme-card">
                                    <form className="theme-form">
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="email"
                                                placeholder="Email"
                                                onChange={e =>
                                                onChangeStateUpdatePassword(e.target.id, e.target.value)
                                                }
                                                autoComplete={"email"}
                                            />
                                            {this.validator.message(
                                                "email",
                                                accountState.updatePassword.email,
                                                "required"
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="review">Masukkan kata sandi baru</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="password"
                                                placeholder="Enter your password"
                                                onChange={e =>
                                                    onChangeStateUpdatePassword(e.target.id, e.target.value)
                                                }
                                                autoComplete={"password"}
                                            />
                                            {this.validator.message(
                                                "password",
                                                accountState.login.password,
                                                "required"
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="review">Ulangi kata sandi baru</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="repeatPassword"
                                                placeholder="Enter your password"
                                                onChange={e =>
                                                    onChangeStateUpdatePassword(e.target.id, e.target.value)
                                                }
                                                autoComplete={"password"}
                                            />
                                            {this.validator.message(
                                                "password",
                                                accountState.login.password,
                                                "required"
                                            )}
                                        </div>
                                        
                                        <div className="form-group">
                                        <Recaptcha
                                            ref={recaptchaRef}
                                            value={accountState.login.recaptcha} 
                                            sitekey={accountState.site_key}
                                            render="explicit"
                                            onloadCallback={this.recaptchaLoaded}
                                            verifyCallback={(response) => { 
                                                onChangeStateUpdatePassword("recaptcha",  response);
                                            }}
                                            expiredCallback={() => {
                                                this.forceUpdate();
                                            }}
                                        />
                                        {this.validator.message(
                                            "recaptcha",
                                            accountState.updatePassword.recaptcha,
                                            "required"
                                        )}
                                        </div>
                                        <div className={"text-center"}>
                                            <a 
                                                onClick={() => {
                                                    this.onClickUpdatePassword();
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

// export default UpdatePassword
const mapStateToProps = state => ({
    accountState: state.account
  });
  
  export default connect(
    mapStateToProps,
    {onChangeStateUpdatePassword, updatePassword,setUpdatePasswordCode }
  )(UpdatePassword);