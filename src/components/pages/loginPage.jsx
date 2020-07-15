import React, {Component} from 'react';
import SimpleReactValidator from "simple-react-validator";
import { connect } from "react-redux";
import BlockUi from "react-block-ui";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { GoogleLogin } from 'react-google-login';
import {Credential} from '../../constants/google-key';
import {
    postLogin,
    onChangeStateLogin,
    resetStateLoginMenu,
    confirmLogin,
    setStateModalFormLogin,
    googleLogin
  } from "../../actions";
import { 
Button, Form, Modal, ModalHeader, 
ModalBody, ModalFooter, Col, Row, Label, Input, InputGroup } from "reactstrap";
import Select from 'react-select'
import Recaptcha from 'react-recaptcha';

import Breadcrumb from "../common/breadcrumb";

const recaptchaRef = React.createRef();

class SignIn extends Component {

    constructor (props) {
        super (props)

        this.validator = new SimpleReactValidator();
        this.onConfirmLogin = this.onConfirmLogin.bind(this);

    }

    componentDidMount() {
        document.getElementById('footer').style.display = "none"
        document.getElementById('sticky').style.display = "none"
    }

    recaptchaLoaded(){
    }

    componentDidUpdate(){
        let { accountState } = this.props
        if (accountState.reset_captcha) {
            // handleStateForm("recaptcha", "")
            recaptchaRef.current.reset()
            // handleState("reset_captcha", false)
        }
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

    onConfirmLogin(){
        let { confirmLogin } = this.props;
        confirmLogin();
    }

    onEnterKeyPress(e) {
        if (e.charCode == 13) {
          this.onClickLogin();
        }
      }
      
    googleResponse = (response) =>{
        this.props.googleLogin(response)
    }

    renderView (){
        const { accountState, onChangeStateLogin, setStateModalFormLogin } = this.props;

        return (
            <div>
                {/* <Breadcrumb title={'Login'}/> */}
                
                
                {/*Login section*/}
                <section className="login-page section-b-space">
                    <div className="container">
                        <div className="row row d-flex justify-content-center">
                            <div className="col-lg-8 text-center">
                                <img src={`${process.env.PUBLIC_URL}/assets/images/login-img.png`}></img>
                            </div>
                            <div className="col-lg-4">
                                <div>
                                    <h4>Selamat Datang!</h4>
                                </div>
                                {/* <div className="theme-card"> */}
                                    <h5>Masuk ke SchoolFromHome</h5>
                                    <form className="theme-form">
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="email"
                                                placeholder="johndoe@gmail.com"
                                                onChange={e =>
                                                onChangeStateLogin(e.target.id, e.target.value)
                                                }
                                                onKeyPress={e => this.onEnterKeyPress(e)}
                                                autoComplete={"email"}
                                            />
                                            {this.validator.message(
                                                "email",
                                                accountState.login.email,
                                                "required|email"
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="review">Kata Sandi</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="password"
                                                placeholder="Masukkan kata sandi"
                                                onChange={e =>
                                                onChangeStateLogin(e.target.id, e.target.value)
                                                }
                                                onKeyPress={e => this.onEnterKeyPress(e)}
                                                autoComplete={"password"}
                                            />
                                            {this.validator.message(
                                                "password",
                                                accountState.login.password,
                                                "required|min:6"
                                            )}
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                            <FormControlLabel
                                                control={
                                                <Checkbox
                                                    // checked={state.checkedB}
                                                    // onChange={handleChange}
                                                    name="checkedB"
                                                    color="primary"
                                                />
                                                }
                                                label="Ingat saya"
                                            />
                                            </div>
                                            <div className="col text-right">
                                                <a href="#" color="primary">Lupa kata sandi?</a>
                                            </div>
                                        </div>
                                        {/* <div className="form-group">
                                        <Recaptcha
                                            ref={recaptchaRef}
                                            value={accountState.login.recaptcha} 
                                            sitekey={accountState.site_key}
                                            render="explicit"
                                            onloadCallback={this.recaptchaLoaded}
                                            verifyCallback={(response) => { 
                                                onChangeStateLogin("recaptcha",  response);
                                            }}
                                            expiredCallback={() => {
                                                this.forceUpdate();
                                            }}
                                        />
                                        {this.validator.message(
                                            "recaptcha",
                                            accountState.login.recaptcha,
                                            "required"
                                        )}
                                        </div> */}
                                        <div className={"text-center"}>
                                            <a 
                                                onClick={() => {
                                                    this.onClickLogin();
                                                }}
                                                className="btn btn-solid primary"
                                            >Masuk</a>
                                        </div>
                                    </form>
                                    <div className="text-center">atau masuk dengan</div>
                                    <div className="text-center">
                                        <GoogleLogin
                                        clientId={Credential}
                                        buttonText='Google'
                                        onSuccess={this.googleResponse}
                                        onFailure=""
                                        cookiePolicy=""
                                        responseType='code,token'/>
                                    </div>
                                    <div className="text-center">Belum punya akun SchoolFromHome? <a href="#">Daftar</a></div>
                                {/* </div> */}
                            </div>
                        </div>
                    </div>

                    <Modal isOpen={accountState.modal.show} fade={false} backdrop={'static'} centered>
                        <ModalHeader>{accountState.modal.title}</ModalHeader>
                        <ModalBody>
                            <Form>
                                <Row form={true}>
                                <Col md={12}>
                                    <FormGroup>
                                        {/* <Label for="kelas">Assign to</Label> */}
                                        <Select
                                            options={accountState.dataSourceRoleAccount}
                                            onChange= { (e) => setStateModalFormLogin("group_id", e.value)}
                                        />
                                    </FormGroup>
                                </Col>  
                                </Row>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                        {accountState.modal.type == "switch" &&
                            <Button size="sm" color="primary" onClick={() => { this.onConfirmLogin()}}>{accountState.modal.buttonText}</Button>
                        }
                        </ModalFooter>
                    </Modal>
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
    { postLogin, onChangeStateLogin, resetStateLoginMenu, confirmLogin, setStateModalFormLogin, googleLogin }
  )(SignIn);