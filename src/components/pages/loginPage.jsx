import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import { connect } from 'react-redux';
import HeaderOne from '../common/headers/header-one';
import FooterTwo from '../common/footers/footer-two';
import BlockUi from 'react-block-ui';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { default as MaterialLink } from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import Alert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { GoogleLogin } from 'react-google-login';
import { Credential } from '../../constants/google-key';
import {
  postLogin,
  onChangeStateLogin,
  resetStateLoginMenu,
  confirmLogin,
  setStateModalFormLogin,
  newPassword,
  onChangeStateNewPassword,
  googleLogin,
  closeAlert,
  setModalActivation,
  resendEmail
} from '../../actions';
import {
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Row,
  Spinner,
  Input
} from 'reactstrap';
import Select from 'react-select';
import Recaptcha from 'react-recaptcha';
import { Grid } from '@material-ui/core';

import Breadcrumb from '../common/breadcrumb';

const recaptchaRef = React.createRef();

class SignIn extends Component {
  state = {
    newPasswordModal: false
  };
  // const recaptchaRef = React.createRef();

  // constructor (props) {
  //     super (props)

  // }

  componentDidMount() {
    if (localStorage.getItem('isChecked')) {
      this.props.onChangeStateLogin('email', localStorage.getItem('email'));
      this.props.onChangeStateLogin('isChecked', true);
      this.props.onChangeStateLogin(
        'password',
        localStorage.getItem('password')
      );
    }

    document.getElementById('footer').style.display = 'none';
    document.getElementById('sticky').style.display = 'none';
  }

  componentWillMount() {
    const { resetStateLoginMenu } = this.props;
    resetStateLoginMenu();
  }

  onClickLogin() {
    const { postLogin } = this.props;
    postLogin();
  }

  onEnterKeyPress(e) {
    if (e.charCode == 13) {
      this.onClickLogin();
    }
  }
  openModalNewPassword = () => {
    this.setState({
      newPasswordModal: true
    });
  };
  closeModalNewPassword = () => {
    this.setState({
      newPasswordModal: false
    });
  };

  googleResponse = (response) => {
    console.log(response);
    this.props.googleLogin(response);
  };

  render() {
    const {
      accountState,
      onChangeStateLogin,
      setStateModalFormLogin,
      buttonLabel,
      className,
      onChangeStateNewPassword,
      newPassword,
      closeAlert,
      setModalActivation,
      resendEmail
    } = this.props;
    console.log('SUKSEESSS GA SIHH' + accountState.modalActivation.success);
    console.log(accountState.login.email);
    console.log(accountState.login.isChecked);
    return (
      <BlockUi
        tag='div'
        blocking={accountState.loader}
        message={
          <span>
            <div id='preloader'>
              <div id='loader' />
            </div>
          </span>
        }>
        <div>
          <HeaderOne />
          {/*Login section*/}
          <section className='login-page section-b-space'>
            <Container>
              <Grid
                container
                direction='row'
                justify='center'
                alignItems='center'>
                <Grid item xs={12} lg={7}>
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/images/login-img.png`}
                    alt='login-page-img'></img>
                </Grid>
                <Grid item sm={12} lg={3}>
                  <div>
                    <h4>
                      <strong>Selamat Datang!</strong>
                    </h4>
                  </div>
                  {/* <div className="theme-card"> */}
                  <h5>Masuk ke SchoolFromHome</h5>
                  <Grid
                    container
                    direction='column'
                    justify='space-between'
                    alignItems='center'>
                    <Grid item>
                      <Collapse in={accountState.openLoginAlert}>
                        <Alert
                          severity='error'
                          action={
                            <IconButton
                              aria-label='close'
                              color='inherit'
                              size='small'
                              onClick={closeAlert}>
                              <CloseIcon fontSize='inherit' />
                            </IconButton>
                          }>
                          <strong>{accountState.alertMsg}</strong>
                        </Alert>
                      </Collapse>
                    </Grid>
                    <Grid item>
                      {accountState.resendActivation && (
                        <MaterialLink
                          component='button'
                          variant='body2'
                          onClick={() => setModalActivation('show', true)}>
                          Kirim ulang verifikasi email
                        </MaterialLink>
                      )}
                    </Grid>
                  </Grid>
                  <form className='theme-form'>
                    <ValidatorForm
                      onSubmit={() => {
                        this.onClickLogin();
                      }}>
                      <div className='form-group'>
                        <TextValidator
                          id='email'
                          label='Email'
                          type='email'
                          InputLabelProps={{
                            shrink: true
                          }}
                          margin='dense'
                          fullWidth
                          variant='outlined'
                          onChange={(e) =>
                            onChangeStateLogin(e.target.id, e.target.value)
                          }
                          onKeyPress={(e) => this.onEnterKeyPress(e)}
                          value={accountState.login.email}
                          autoComplete={'email'}
                          validators={['required', 'isEmail']}
                          errorMessages={[
                            'masukkan email',
                            'email tidak valid'
                          ]}
                        />
                      </div>
                      <div className='form-group'>
                        <TextValidator
                          id='password'
                          type='password'
                          label='Kata sandi'
                          InputLabelProps={{
                            shrink: true
                          }}
                          margin='dense'
                          fullWidth
                          variant='outlined'
                          onChange={(e) =>
                            onChangeStateLogin(e.target.id, e.target.value)
                          }
                          onKeyPress={(e) => this.onEnterKeyPress(e)}
                          value={accountState.login.password}
                          validators={['required']}
                          errorMessages={['masukkan kata sandi']}
                        />
                      </div>
                      <Grid
                        container
                        direction='row'
                        alignItems='center'
                        justify='space-between'>
                        <Grid item>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={accountState.login.isChecked}
                                onChange={(e) =>
                                  onChangeStateLogin(
                                    e.target.id,
                                    e.target.checked
                                  )
                                }
                                id='isChecked'
                                name='checked'
                                color='primary'
                              />
                            }
                            label='Ingat saya'
                          />
                        </Grid>
                        <Grid item>
                          <a
                            onClick={this.openModalNewPassword}
                            color='primary'>
                            Lupa kata sandi?
                          </a>
                          <Modal
                            isOpen={this.state.newPasswordModal}
                            className={className}>
                            <ModalHeader>Ganti kata sandi</ModalHeader>
                            <ModalBody>
                              <label>
                                Silahkan masukkan alamat email yang digunakan
                                untuk registrasi akun anda. Kami akan
                                mengirimkan email yang berisi link untuk
                                melakukan reset password ke alamat ini.
                              </label>
                              <label>Email: </label>
                              <Input
                                type='textarea'
                                placeholder='Contoh: janedoe@mail.com'
                                onChange={(e) =>
                                  onChangeStateNewPassword(
                                    'email',
                                    e.target.value
                                  )
                                }
                              />
                            </ModalBody>
                            <ModalFooter>
                              <Button color='primary' onClick={newPassword}>
                                Kirim email
                              </Button>
                              <Button
                                color='secondary'
                                onClick={this.closeModalNewPassword}>
                                Cancel
                              </Button>
                            </ModalFooter>
                          </Modal>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        direction='column'
                        alignItems='center'
                        justify='space-around'
                        spacing={2}>
                        <Grid item>
                          {!accountState.showSpinner && (
                            <Button
                              variant='contained'
                              disableElevation
                              color='primary'
                              type='submit'>
                              Masuk
                            </Button>
                          )}
                        </Grid>
                        <Grid item>
                          {accountState.showSpinner && <CircularProgress />}
                        </Grid>
                      </Grid>
                    </ValidatorForm>
                  </form>
                  <Grid
                    container
                    direction='column'
                    alignItems='center'
                    justify='space-around'
                    spacing={2}>
                    <Grid item>atau masuk dengan</Grid>
                    <Grid item>
                      <div className='text-center'>
                        <GoogleLogin
                          clientId={Credential}
                          buttonText='Google'
                          onSuccess={this.googleResponse}
                          onFailure={this.googleResponse}
                          cookiePolicy='single_host_origin'
                          responseType='code,token'
                        />
                      </div>
                    </Grid>
                    <Grid item>
                      <div className='text-center'>
                        Belum punya akun SchoolFromHome?{' '}
                        <Link to={`${process.env.PUBLIC_URL}/register`}>
                          Daftar
                        </Link>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Container>
            {/* modal resend email activation */}
            <Modal isOpen={accountState.modalActivation.show}>
              <ModalHeader toggle={() => setModalActivation('show', false)}>
                <strong>Kirim ulang verifikasi email</strong>
              </ModalHeader>
              {!accountState.modalActivation.success && (
                <ModalBody>
                  <label>
                    Silahkan masukkan alamat email yang digunakan untuk
                    registrasi akun anda. Kami akan mengirimkan email yang
                    berisi link untuk melakukan verifikasi.
                  </label>
                  <label>Email: </label>
                  <Input
                    type='email'
                    id='email'
                    placeholder='Contoh: janedoe@mail.com'
                    value={accountState.modalActivation.email}
                    onChange={(e) =>
                      setModalActivation(e.target.id, e.target.value)
                    }
                  />
                  <Collapse in={accountState.modalActivation.openAlert}>
                    <Alert
                      severity='error'
                      action={
                        <IconButton
                          aria-label='close'
                          color='inherit'
                          size='small'
                          onClick={() =>
                            setModalActivation('openAlert', false)
                          }>
                          <CloseIcon fontSize='inherit' />
                        </IconButton>
                      }>
                      {accountState.modalActivation.errormsg}
                    </Alert>
                  </Collapse>
                </ModalBody>
              )}
              {accountState.modalActivation.success && (
                <ModalBody>
                  <Alert severity='success'>
                    <p>
                      <strong>Email berhasil dikirim!</strong>
                    </p>
                    <p>{accountState.modalActivation.successmsg}</p>
                  </Alert>
                </ModalBody>
              )}
              {!accountState.modalActivation.success && (
                <ModalFooter>
                  <Button
                    color='primary'
                    variant='contained'
                    disableElevation
                    onClick={resendEmail}>
                    Kirim email
                  </Button>
                </ModalFooter>
              )}
            </Modal>
          </section>
          <FooterTwo />
        </div>
      </BlockUi>
    );
  }
}

// export default SignIn
const mapStateToProps = (state) => ({
  accountState: state.account
});

export default connect(mapStateToProps, {
  postLogin,
  onChangeStateLogin,
  resetStateLoginMenu,
  confirmLogin,
  setStateModalFormLogin,
  googleLogin,
  closeAlert,
  newPassword,
  onChangeStateNewPassword,
  setModalActivation,
  resendEmail
})(SignIn);
