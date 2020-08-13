import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Box, Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Container from '@material-ui/core/Container';
import { API_BASE_URL_DEV, API_PATH } from '../../constants/api';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import { requestUserData, onChangeStateProfile, onChangeStateEditProfile, postUpdateProfile } from '../../actions';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openDialog: false
    };
  }

  componentDidMount() {
    const { requestUserData, onChangeStateProfile, onChangeStateEditProfile } = this.props;
    requestUserData();
    onChangeStateProfile();
    onChangeStateEditProfile();

    ValidatorForm.addValidationRule('isPasswordMatch', value => {
      if (value !== this.props.user.profile.password) {
        return false;
      }
      return true;
    });
  }

  getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  };

  uploadImage = e => {
    const file = e.target.files[0];
    this.getBase64(file, result => {
      this.props.onChangeStateEditProfile('avatar', result);
    });
  };

  handleClose = () => {
    this.setState({ openDialog: false });
  };

  handleSubmit = () => {
    this.setState({ openDialog: true });
  };

  postProfile = () => {
    this.setState({ openDialog: false });
    if (this.props.user.profile.isChecked) {
      this.props.saveProfile();
    }
  };

  closeSuccessEditModal = () => {
    const { onChangeStateEditProfile } = this.props;
    onChangeStateEditProfile('success', false);
  };

  closeFailEditModal = () => {
    const { onChangeStateEditProfile } = this.props;
    onChangeStateEditProfile('updateFail', false);
  };

  toggleEditProfileForm = () => {
    const { onChangeStateEditProfile, user } = this.props;
    const currState = user.profile.editForm;
    onChangeStateEditProfile('editForm', !currState);
  };

  toggleConfirmUpdate = () => {
    const { onChangeStateEditProfile, user } = this.props;
    const currState = user.profile.confirmUpdate;
    onChangeStateEditProfile('confirmUpdate', !currState);
  };

  render() {
    const { user, onChangeStateEditProfile, postUpdateProfile, onChangeStateProfile } = this.props;
    const theme = {
      spacing: 100
    };
    return (
      <section className='home-page section-b-space'>
        <div>
          {!user.profile.editForm && (
            <Container>
              <Grid container direction='row' justify='center' alignItems='center'>
                <Card className='profile-box' variant='outlined' style={{ width: '60rem' }}>
                  <CardContent>
                    <Grid container direction='row' justify='center' alignItems='center'>
                      <Grid item xs={3}>
                        <Avatar
                          class-name='Avatar-profile'
                          style={{ height: '140px', width: '140px' }}
                          src={user.data.avatar || `${process.env.PUBLIC_URL}/assets/images/avatar jane doe.png`}
                        ></Avatar>
                      </Grid>
                    </Grid>
                    <ValidatorForm onSubmit={this.handleSubmit}>
                      <CardContent>
                        {/* <div className='form-group'>
                          <Grid container direction='row' justify='center' alignItems='center'>
                            <Grid item xs={3}>
                              Foto Profil
                            </Grid>
                            <Grid item xs={3}>
                              <Button
                                variant='contained'
                                color='primary'
                                className='Button-upload'
                                startIcon={<CloudUploadIcon />}
                              >
                                Upload
                              </Button>
                            </Grid>
                          </Grid>
                        </div> */}
                        <div className='form-group'>
                          <Grid container direction='row' justify='center' alignItems='center'>
                            <Grid item xs={3}>
                              Nama
                            </Grid>
                            <Grid item xs={3}>
                              <TextField
                                type='text'
                                id='name'
                                fullWidth
                                value={user.data.name}
                                margin='normal'
                                variant='outlined'
                                disabled
                              />
                            </Grid>
                          </Grid>
                        </div>
                        <div className='form-group'>
                          <Grid container direction='row' justify='center' alignItems='center'>
                            <Grid item xs={3}>
                              Email
                            </Grid>
                            <Grid item xs={3}>
                              <TextField
                                id='email'
                                placeholder={user.data.email}
                                className='email'
                                margin='normal'
                                variant='outlined'
                                disabled
                              />
                            </Grid>
                          </Grid>
                        </div>
                        {/* <Grid container direction='row' justify='center' alignItems='center'>
                          <Grid item xs={3}>
                            Kata Sandi
                          </Grid>
                          <Grid item xs={3}>
                            <TextField
                              id='password'
                              value={user.data.password}
                              className='retype-pass'
                              margin='normal'
                              variant='outlined'
                              type='password'
                              disabled
                            />
                          </Grid>
                        </Grid>
                        <Grid container direction='row' justify='center' alignItems='center'>
                          <Grid item xs={3}>
                            Kata Sandi Baru
                          </Grid>
                          <Grid item xs={3}>
                            <TextField
                              id='outlined-margin-normal'
                              placeholder='Kata Sandi Baru'
                              className='retype-pass'
                              margin='normal'
                              variant='outlined'
                              type='password'
                            />
                          </Grid>
                        </Grid>
                        <Grid container direction='row' justify='center' alignItems='center'>
                          <Grid item xs={3}>
                            Ulangi Kata Sandi Baru
                          </Grid>
                          <Grid item xs={3}>
                            <TextField
                              id='outlined-margin-normal'
                              placeholder='Ulangi Kata Sandi'
                              className='retype-pass'
                              margin='normal'
                              variant='outlined'
                              type='password'
                            />
                          </Grid>
                        </Grid> */}
                        <Grid container direction='row' justify='center' alignItems='center'>
                          <Grid item xs={3}>
                            Nomor Telepon
                          </Grid>
                          <Grid item xs={3}>
                            <TextField
                              id='phone'
                              value={user.data.phone}
                              className='no-telp'
                              margin='normal'
                              variant='outlined'
                              disabled
                            />
                          </Grid>
                        </Grid>
                        {/* <Grid container direction='row' justify='flex-end' alignItems='center'>
                        <Grid item xs={3}>
                          <Button variant='contained' color='primary'>
                            Simpan
                          </Button>
                        </Grid>
                      </Grid> */}
                      </CardContent>
                      <CardActions>
                        <Grid container direction='column' alignItems='center' justify='space-around' spacing={2}>
                          <Grid item>
                            <Button
                              variant='contained'
                              onClick={this.toggleEditProfileForm}
                              color='primary'
                              //disabled={this.state.buttonDisable === false && user.profile.isChecked === true ? false : true}
                            >
                              Edit
                            </Button>
                          </Grid>
                        </Grid>
                      </CardActions>
                    </ValidatorForm>
                  </CardContent>
                </Card>
              </Grid>
            </Container>
          )}
          {user.profile.editForm && (
            <Container>
              <Grid container direction='row' justify='center' alignItems='center'>
                <Card className='profile-box' variant='outlined' style={{ width: '60rem' }}>
                  <CardContent>
                    <Grid container direction='row' justify='center' alignItems='center'>
                      <Grid item xs={3}>
                        <Avatar
                          class-name='Avatar-profile'
                          style={{ height: '140px', width: '140px' }}
                          src={user.data.avatar || `${process.env.PUBLIC_URL}/assets/images/avatar jane doe.png`}
                        ></Avatar>
                      </Grid>
                    </Grid>
                    <ValidatorForm onSubmit={this.handleSubmit}>
                      <CardContent>
                        <div className='form-group'>
                          <Grid container direction='row' justify='center' alignItems='center'>
                            <Grid item xs={3}>
                              Foto Profil
                            </Grid>
                            <Grid item xs={3}>
                              <Input
                                variant='contained'
                                color='primary'
                                className='Button-upload'
                                type='file'
                                accept='image/*'
                                label='Pilih gambar'
                                onChange={this.uploadImage}
                              >
                                Upload
                              </Input>
                            </Grid>
                          </Grid>
                        </div>
                        <div className='form-group'>
                          <Grid container direction='row' justify='center' alignItems='center'>
                            <Grid item xs={3}>
                              Nama
                            </Grid>
                            <Grid item xs={3}>
                              <TextField
                                type='text'
                                id='name'
                                fullWidth
                                value={user.profile.name}
                                onChange={e => onChangeStateEditProfile(e.target.id, e.target.value)}
                                margin='normal'
                                variant='outlined'
                              />
                            </Grid>
                          </Grid>
                        </div>
                        <div className='form-group'>
                          <Grid container direction='row' justify='center' alignItems='center'>
                            <Grid item xs={3}>
                              Email
                            </Grid>
                            <Grid item xs={3}>
                              <TextField
                                id='email'
                                placeholder={user.profile.email}
                                className='email'
                                margin='normal'
                                variant='outlined'
                                disabled
                              />
                            </Grid>
                          </Grid>
                        </div>
                        <Grid container direction='row' justify='center' alignItems='center'>
                          <Grid item xs={3}>
                            Kata Sandi Lama
                          </Grid>
                          <Grid item xs={3}>
                            <TextField
                              id='password'
                              placeholder='Kata Sandi Lama'
                              className='retype-pass'
                              onChange={e => onChangeStateEditProfile(e.target.id, e.target.value)}
                              margin='normal'
                              variant='outlined'
                              type='password'
                            />
                          </Grid>
                        </Grid>
                        <Grid container direction='row' justify='center' alignItems='center'>
                          <Grid item xs={3}>
                            Kata Sandi Baru
                          </Grid>
                          <Grid item xs={3}>
                            <TextValidator
                              id='new_password'
                              placeholder='Kata Sandi Baru'
                              className='retype-pass'
                              margin='normal'
                              variant='outlined'
                              type='password'
                              onChange={e => onChangeStateEditProfile(e.target.id, e.target.value)}
                              validators={['required', 'minStringLength:6']}
                              errorMessages={['masukkan kata sandi', 'kata sandi minimal 6 karakter']}
                            />
                          </Grid>
                        </Grid>
                        <Grid container direction='row' justify='center' alignItems='center'>
                          <Grid item xs={3}>
                            Ulangi Kata Sandi Baru
                          </Grid>
                          <Grid item xs={3}>
                            <TextField
                              id='re_new_password'
                              placeholder='Ulangi Kata Sandi'
                              className='retype-pass'
                              margin='normal'
                              variant='outlined'
                              type='password'
                              onChange={e => onChangeStateEditProfile(e.target.id, e.target.value)}
                            />
                          </Grid>
                        </Grid>
                        <Grid container direction='row' justify='center' alignItems='center'>
                          <Grid item xs={3}>
                            Nomor Telepon
                          </Grid>
                          <Grid item xs={3}>
                            <TextField
                              id='phone'
                              value={user.profile.phone}
                              onChange={e => onChangeStateEditProfile(e.target.id, e.target.value)}
                              className='no-telp'
                              margin='normal'
                              variant='outlined'
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                      <CardActions>
                        <Grid container direction='column' justify='center' alignItems='center'>
                          <Grid item xs={12} lg={4}>
                            <Button variant='contained' color='secondary' onClick={this.toggleEditProfileForm}>
                              Batal
                            </Button>
                            <Button variant='contained' color='primary' onClick={this.toggleConfirmUpdate}>
                              Simpan
                            </Button>
                          </Grid>
                        </Grid>
                      </CardActions>
                    </ValidatorForm>
                  </CardContent>
                </Card>
              </Grid>
            </Container>
          )}
          {/* {confirm update profile} */}
          <Modal isOpen={user.profile.confirmUpdate}>
            <ModalBody>
              <Grid container direction='column' justify='center' alignItems='center'>
                <strong>Apakah anda yakin dengan data yang diubah?</strong>
                Pastikan semua informasi yang anda masukkan sudah sesuai
              </Grid>
            </ModalBody>
            <ModalFooter>
              <Button color='primary' variant='contained' disableElevation type='submit' onClick={this.toggleConfirmUpdate}>
                Batal
              </Button>
              <Button color='primary' variant='contained' disableElevation type='submit' onClick={postUpdateProfile}>
                Ya
              </Button>
            </ModalFooter>
          </Modal>
          <Modal isOpen={user.profile.success}>
            <ModalBody>
              <Grid container direction='column' justify='center' alignItems='center'>
                <strong>Informasi profile BERHASIL diubah!</strong>
                Anda telah membuat perubahan pada informasi profile.
                <Button color='primary' variant='contained' disableElevation type='submit' onClick={this.closeSuccessEditModal}>
                  Oke
                </Button>
              </Grid>
            </ModalBody>
          </Modal>
          {/* Update Fail <<<<<<<<<<<<<<<<<<<<<<<<<< */}
          <Modal isOpen={user.profile.updateFail}>
            <ModalBody>
              <Grid container direction='column' justify='center' alignItems='center'>
                <strong>GAGAL mengubah profile!</strong>
                Proses mengubah profile GAGAL, silakan coba lagi!
                <Button color='secondary' variant='contained' disableElevation type='submit' onClick={this.closeFailEditModal}>
                  Oke
                </Button>
              </Grid>
            </ModalBody>
          </Modal>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  user: state.profile
});

export default connect(mapStateToProps, {
  requestUserData,
  onChangeStateProfile,
  onChangeStateEditProfile,
  postUpdateProfile
})(Profile);
