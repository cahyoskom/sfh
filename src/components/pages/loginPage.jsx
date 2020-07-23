import React, {Component} from 'react';
import SimpleReactValidator from "simple-react-validator";
import { connect } from "react-redux";
import HeaderOne from '../common/headers/header-one';
import FooterTwo from '../common/footers/footer-two';
import BlockUi from "react-block-ui";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Alert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { GoogleLogin } from 'react-google-login';
import {Credential} from '../../constants/google-key';
import {
    postLogin,
    onChangeStateLogin,
    resetStateLoginMenu,
    confirmLogin,
    setStateModalFormLogin,
    newPassword,
    onChangeStateNewPassword,
    googleLogin,
    closeAlert
  } from "../../actions";
import { 
Form, Modal, ModalHeader, 
ModalBody, ModalFooter, Col, Row, Spinner } from "reactstrap";
import Select from 'react-select'
import Recaptcha from 'react-recaptcha';
import { Grid } from '@material-ui/core';



import Breadcrumb from "../common/breadcrumb";

const recaptchaRef = React.createRef();



class SignIn extends Component {

    state = {
        newPasswordModal: false
    }
    // const recaptchaRef = React.createRef();

    // constructor (props) {
    //     super (props)

    //     this.onConfirmLogin = this.onConfirmLogin.bind(this);
        

    // }


    componentDidMount() {
        if (localStorage.getItem("isChecked")){
            this.props.onChangeStateLogin("email", localStorage.getItem("email"));
            this.props.onChangeStateLogin("isChecked", true);
            this.props.onChangeStateLogin("password", localStorage.getItem("password"));
        }

        document.getElementById('footer').style.display = "none"
        document.getElementById('sticky').style.display = "none" 
    }

    // recaptchaLoaded(){
    // }

    // componentDidUpdate(){
    //     let { accountState } = this.props
    //     if (accountState.reset_captcha) {
    //         // handleStateForm("recaptcha", "")
    //         recaptchaRef.current.reset()
    //         // handleState("reset_captcha", false)
    //     }
    // }

    componentWillMount() {
        const { resetStateLoginMenu } = this.props;
        resetStateLoginMenu();
    }

    onClickLogin() {
        const { postLogin } = this.props;
        // if (this.validator.allValid()) {
          // if (this.validateEmail(accountState.login.username)) {
          //   postLogin();
          // } else {
          //   fail("Email is not valid !");
          // }
          this.props.accountState.showSpinner = true
          postLogin();
        // // } else {
        //     this.validator.showMessages();
        //     this.forceUpdate();
        // }
    }

    // onConfirmLogin(){
    //     let { confirmLogin } = this.props;
    //     confirmLogin();
    // }

    onEnterKeyPress(e) {
        if (e.charCode == 13) {
          this.onClickLogin();
        }
    }
    openModalNewPassword = () => {
        this.setState({
            newPasswordModal:true
        })
    }
    closeModalNewPassword = () => {
        this.setState({
            newPasswordModal:false
        })
    }
    
     
    googleResponse = (response) =>{
        console.log(response)
        this.props.googleLogin(response)
    }

    render(){
        const { accountState, onChangeStateLogin, setStateModalFormLogin, buttonLabel,
            className, onChangeStateNewPassword, newPassword, closeAlert } = this.props;
        console.log(accountState.login.email)
        console.log(accountState.login.isChecked)
        
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
            <div>           
            <HeaderOne />    
                {/*Login section*/}
                <section className="login-page section-b-space">
                    <Container >
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Grid item xs={12} lg={7}>
                                <img src={`${process.env.PUBLIC_URL}/assets/images/login-img.png`} alt="login-page-img"></img>
                            </Grid>
                            <Grid item sm={12} lg={3}>
                                <div>
                                    <h4>Selamat Datang!</h4>
                                </div>
                                {/* <div className="theme-card"> */}
                                    <h5>Masuk ke SchoolFromHome</h5>
                                    <Grid item>
                                        <Collapse in={accountState.openLoginAlert}>
                                            <Alert severity="error" action={
                                            <IconButton
                                                aria-label="close"
                                                color="inherit"
                                                size="small"
                                                onClick={closeAlert}><CloseIcon fontSize="inherit" />
                                                </IconButton>}>{accountState.alertMsg}
                                            </Alert>
                                        </Collapse>
                                    </Grid>
                                    <form className="theme-form">
                                    <ValidatorForm onSubmit={() => {this.onClickLogin();}}>
                                        <div className="form-group">
                                            <TextValidator
                                                id="email"
                                                label="Email"
                                                type="email"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                margin="dense"
                                                fullWidth
                                                variant="outlined"
                                                onChange={e =>
                                                    onChangeStateLogin(e.target.id, e.target.value)
                                                    }
                                                onKeyPress={e => this.onEnterKeyPress(e)}
                                                value ={accountState.login.email}
                                                autoComplete={"email"}
                                                validators={['required', 'isEmail']}
                                                errorMessages={['masukkan email', 'email tidak valid']}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <TextValidator
                                                id="password"
                                                type="password"
                                                label="Kata sandi"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                margin="dense"
                                                fullWidth
                                                variant="outlined"
                                                onChange={e =>
                                                onChangeStateLogin(e.target.id, e.target.value)
                                                }
                                                onKeyPress={e => this.onEnterKeyPress(e)}
                                                value = {accountState.login.password}
                                                validators={['required']}
                                                errorMessages={['masukkan kata sandi']}
                                            />
                                        </div>
                                        <div>
                                            {/* <ModalExample onClick={()=>{this.newPassword}}></ModalExample> */}
                                            <label onClick={this.openModalNewPassword}>Lupa kata sandi?</label>
                                            <Modal isOpen={this.state.newPasswordModal} className={className}>
                                                <ModalHeader >Ganti kata sandi</ModalHeader>
                                                <ModalBody>
                                                    <label>Silahkan masukkan alamat email yang digunakan untuk registrasi akun anda. Kami akan mengirimkan email yang berisi link untuk melakukan reset password ke alamat ini.</label>
                                                    <label>Email: </label>
                                                    <Input 
                                                        type="textarea" 
                                                        placeholder="Contoh: janedoe@mail.com" 
                                                        onChange={e =>
                                                        onChangeStateNewPassword("email", e.target.value)
                                                        }
                                                    />
                                                </ModalBody>
                                                <ModalFooter>
                                                <Button color="primary" onClick={newPassword}>Do Something</Button>
                                                <Button color="secondary" onClick={this.closeModalNewPassword}>Cancel</Button>
                                                </ModalFooter>
                                            </Modal>

                                        </div>
                                        <Grid container direction="row" alignItems="center" justify="space-between">
                                            <Grid item>
                                            <FormControlLabel
                                                control={
                                                <Checkbox
                                                    checked={accountState.login.isChecked}
                                                    onChange={e =>
                                                        onChangeStateLogin(e.target.id, e.target.checked)
                                                        }
                                                    id= "isChecked"
                                                    name="checked"
                                                    color="primary"
                                                />
                                                }
                                                label="Ingat saya"
                                            />
                                            </Grid>
                                            <Grid item>
                                                <a href="#" color="primary">Lupa kata sandi?</a>
                                            </Grid>
                                        </Grid>
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
                                        <Grid container direction="column" alignItems="center" justify="space-around" spacing={2}>
                                            {!accountState.showSpinner &&<Button variant="contained" disableElevation color="primary" type="submit">Masuk</Button>}
                                            <Grid item>{accountState.showSpinner && <CircularProgress />}</Grid>
                                        </Grid>
                                    </ValidatorForm>
                                    </form>
                                    <Grid container direction="column" alignItems="center" justify="space-around" spacing={2}>
                                        <Grid item>atau masuk dengan</Grid>
                                        <Grid item>
                                            <div className="text-center">
                                                <GoogleLogin
                                                clientId={Credential}
                                                buttonText='Google'
                                                onSuccess={this.googleResponse}
                                                onFailure={this.googleResponse}
                                                cookiePolicy='single_host_origin'
                                                responseType='code,token'/>
                                            </div>
                                        </Grid>
                                        <Grid item>
                                            <div className="text-center">Belum punya akun SchoolFromHome? <a href="#">Daftar</a></div>
                                        </Grid>
                                    </Grid>
                            </Grid>
                        </Grid>
                    </Container>
                    
                    {/* <Modal isOpen={accountState.modal.show} fade={false} backdrop={'static'} centered>
                        <ModalHeader>{accountState.modal.title}</ModalHeader>
                        <ModalBody>
                            <Form>
                                <Row form={true}>
                                <Col md={12}>
                                    <FormGroup>
                                        {/* <Label for="kelas">Assign to</Label> */}
                                        {/* <Select
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
                        </ModalFooter> */}
                    {/* </Modal> */}
                </section>
                <FooterTwo/>
            </div>
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
    { postLogin, onChangeStateLogin, resetStateLoginMenu, confirmLogin, setStateModalFormLogin, 
        googleLogin, closeAlertnewPassword, onChangeStateNewPassword }
  )(SignIn);