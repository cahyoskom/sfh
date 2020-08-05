import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { connect } from 'react-redux';
import BlockUi from 'react-block-ui';
import Container from '@material-ui/core/Container';
import { Grid, Box } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Link } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';

import { onChangeStateUpdatePassword, updatePassword, setUpdatePasswordCode } from '../../actions';

class UpdatePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false
    };
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);

    this.validator = new SimpleReactValidator();
  }

  componentDidMount() {
    document.getElementById('footer').style.display = 'none';
    document.getElementById('sticky').style.display = 'none';
  }

  onClickUpdatePassword() {
    let { updatePassword, onChangeStateUpdatePassword } = this.props;
    onChangeStateUpdatePassword('code', this.props.match.params.code);
    updatePassword();
  }
  handleClickShowPassword() {
    const currentState = this.state.showPassword;
    this.setState({
      showPassword: !currentState
    });
  }

  renderView() {
    const { accountState, onChangeStateUpdatePassword } = this.props;

    return (
      <div>
        <section className='login-page section-b-space'>
          <div className='container'>
            {/* <div className='row row d-flex justify-content-center'>
              <div className='col-lg-4'>
                <div className={'text-center'}>
                  <h5>Perbarui kata sandi</h5>
                </div>

                <div className='theme-card'>
                  <form className='theme-form'>
                    <div className='form-group'>
                      <label htmlFor='email'>Email</label>
                      <input
                        type='text'
                        className='form-control'
                        id='email'
                        placeholder='Email'
                        onChange={(e) =>
                          onChangeStateUpdatePassword(
                            e.target.id,
                            e.target.value
                          )
                        }
                        autoComplete={'email'}
                      />
                      {this.validator.message(
                        'email',
                        accountState.updatePassword.email,
                        'required'
                      )}
                    </div>
                    <div className='form-group'>
                      <label htmlFor='review'>Masukkan kata sandi baru</label>
                      <input
                        type='password'
                        className='form-control'
                        id='password'
                        placeholder='Enter your password'
                        onChange={(e) =>
                          onChangeStateUpdatePassword(
                            e.target.id,
                            e.target.value
                          )
                        }
                        autoComplete={'password'}
                      />
                      {this.validator.message(
                        'password',
                        accountState.updatePassword.password,
                        'required'
                      )}
                    </div>
                    <div className='form-group'>
                      <label htmlFor='review'>Ulangi kata sandi baru</label>
                      <input
                        type='password'
                        className='form-control'
                        id='repeatPassword'
                        placeholder='Enter your password'
                        onChange={(e) =>
                          onChangeStateUpdatePassword(
                            e.target.id,
                            e.target.value
                          )
                        }
                        autoComplete={'password'}
                      />
                      {this.validator.message(
                        'password',
                        accountState.updatePassword.password,
                        'required'
                      )}
                    </div>

                    
                    <div className={'text-center'}>
                      <a
                        onClick={() => {
                          this.onClickUpdatePassword();
                        }}
                        className='btn btn-solid'>
                        Ganti kata sandi
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div> */}
          </div>

          <Container>
            <Grid container direction='column' justify='center' alignItems='center'>
              <Grid item xs={12} lg={12}>
                <Box maxWidth={700}>
                  <Card variant='outlined'>
                    <CardContent>
                      {!accountState.updatePassword.success && (
                        <Grid container direction='row' justify='center' alignItems='stretch' spacing={2}>
                          <Grid item>
                            <h3>
                              <strong>Ganti Kata Sandi</strong>
                            </h3>
                          </Grid>
                          <Grid container direction='row' justify='space-between' alignItems='center'>
                            <Grid item xs={12} lg={5}>
                              <h4>Kata sandi yang baru</h4>
                            </Grid>
                            <Grid item xs={12} lg={7}>
                              <OutlinedInput
                                id='password'
                                placeholder='Masukkan kata sandi'
                                fullWidth='true'
                                type={this.state.showPassword ? 'text' : 'password'}
                                onChange={e => onChangeStateUpdatePassword(e.target.id, e.target.value)}
                                endAdornment={
                                  <InputAdornment position='end'>
                                    <IconButton
                                      aria-label='toggle password visibility'
                                      onClick={this.handleClickShowPassword}
                                      edge='end'
                                    >
                                      {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                  </InputAdornment>
                                }
                                labelWidth={70}
                              />
                            </Grid>
                          </Grid>
                          <Grid container direction='row' justify='space-between' alignItems='center'>
                            <Grid item xs={12} lg={5}>
                              <h4>Ulangi kata sandi yang baru</h4>
                            </Grid>
                            <Grid item xs={12} lg={7}>
                              {/* <input
                type="password"
                className="form-control"
                id="repeatPassword"
                placeholder="Masukkan kata sandi"
                onChange={(e) =>
                  onChangeStateUpdatePassword(
                    e.target.id,
                    e.target.value
                  )
                }
                autoComplete={"password"}
              /> */}
                              <OutlinedInput
                                id='repeatPassword'
                                placeholder='Masukkan kata sandi'
                                fullWidth='true'
                                type={this.state.showPassword ? 'text' : 'password'}
                                onChange={e => onChangeStateUpdatePassword(e.target.id, e.target.value)}
                                endAdornment={
                                  <InputAdornment position='end'>
                                    <IconButton
                                      aria-label='toggle password visibility'
                                      onClick={this.handleClickShowPassword}
                                      edge='end'
                                    >
                                      {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                  </InputAdornment>
                                }
                                labelWidth={70}
                              />
                            </Grid>
                          </Grid>

                          <Grid container direction='row-reverse' justify='flex-start' alignItems='center'>
                            <Button
                              variant='contained'
                              color='primary'
                              onClick={() => {
                                this.onClickUpdatePassword();
                              }}
                            >
                              Ganti kata sandi
                            </Button>
                          </Grid>
                        </Grid>
                      )}
                      {accountState.updatePassword.success && (
                        <Grid container direction='column' justify='center' alignItems='center'>
                          <Alert severity='success'>
                            <p>
                              <strong>Kata sandi berhasil diubah!</strong>
                            </p>
                            <Link to={`${process.env.PUBLIC_URL}/login`}>
                              <Button variant='contained' color='primary'>
                                Masuk
                              </Button>
                            </Link>
                          </Alert>
                        </Grid>
                      )}
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </section>
      </div>
    );
  }

  render() {
    const { accountState } = this.props;

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

export default connect(mapStateToProps, {
  onChangeStateUpdatePassword,
  updatePassword,
  setUpdatePasswordCode
})(UpdatePassword);
