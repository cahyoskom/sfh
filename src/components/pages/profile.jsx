import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Container from '@material-ui/core/Container';
import { API_BASE_URL_DEV, API_PATH } from '../../constants/api';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import { requestUserData, onChangeStateProfile, saveProfile } from '../../actions';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openDialog: false
    };
  }

  componentDidMount() {
    const { requestUserData } = this.props;
    requestUserData();

    ValidatorForm.addValidationRule('isPasswordMatch', value => {
      if (value !== this.props.user.profile.password) {
        return false;
      }
      return true;
    });
  }

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

  render() {
    const { user, onChangeStateProfile } = this.props;

    return (
      <div>
        <section className='profile'>
          <center>
            <h3>Edit Profil</h3>
          </center>
          <Container>
            <Grid container direction='row' justify='center' alignItems='center'>
              <Card className='profile-box' variant='outlined' style={{ width: '60rem' }}>
                <CardContent>
                  <Grid container direction='row' justify='center' alignItems='center'>
                    <Grid item xs={3}>
                      {/* ImageAvatar(); */}
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
                              value={user.data.name}
                              onChange={e => onChangeStateProfile(e.target.id, e.target.value)}
                              margin='normal'
                              variant='outlined'
                              autoComplete={'name'}
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
                              id='outlined-margin-normal'
                              placeholder={user.data.email}
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
                            id='outlined-margin-normal'
                            placeholder='Kata Sandi Lama'
                            className='retype-pass'
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
                      </Grid>
                      <Grid container direction='row' justify='center' alignItems='center'>
                        <Grid item xs={3}>
                          Nomor Telepon
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            id='outlined-margin-normal'
                            value={user.data.phone}
                            onChange={e => onChangeStateProfile(e.target.id, e.target.value)}
                            className='no-telp'
                            margin='normal'
                            variant='outlined'
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
                            disableElevation
                            color='primary'
                            type='submit'
                            //disabled={this.state.buttonDisable === false && user.profile.isChecked === true ? false : true}
                          >
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
        </section>
        <Dialog
          open={this.state.openDialog}
          onClose={this.handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Apakah kamu sudah yakin dengan data yang kamu ubah?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Grid container direction='row' alignItems='center' justify='space-around'>
              <Grid item>
                <Button onClick={this.handleClose} variant='contained' disableElevation color='default'>
                  Kembali
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={this.postProfile} variant='contained' disableElevation color='primary' autoFocus>
                  Ya, sudah yakin
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.profile
});

export default connect(mapStateToProps, {
  requestUserData,
  onChangeStateProfile,
  saveProfile
})(Profile);
