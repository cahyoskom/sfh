import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Paper, Button, Container, Box, Collapse, TextField, IconButton, CircularProgress } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import { Image } from 'react-bootstrap';
import { Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
  getSchool,
  setModalSchool,
  onUpdateSchool,
  saveUpdateSchool,
  deleteSchool,
  handleDoneUpdateSchool
} from '../../actions';

const pattern = /^[0-9]*$/;

class SchoolInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPhoneValid: true,
      phoneErrorText: '',
      isZipcodeValid: true,
      zipcodeErrorText: '',

      openDialog: false,
      updateConfirmation: false
    };
  }

  componentDidMount = () => {
    this.props.getSchool(this.props.match.params.id);
  };

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
      this.props.setModalSchool('avatar', result);
    });
  };

  validatePhone = () => {
    var isValid = this.props.schoolState.modal.phone ? pattern.test(this.props.schoolState.modal.phone) : true;

    if (isValid) {
      this.setState({
        isPhoneValid: true,
        phoneErrorText: ''
      });
    } else {
      this.setState({
        isPhoneValid: false,
        phoneErrorText: 'nomor telepon tidak valid'
      });
    }
  };

  validateZipcode = () => {
    var isValid = this.props.schoolState.modal.zipcode ? pattern.test(this.props.schoolState.modal.zipcode) : true;

    if (isValid) {
      this.setState({
        isZipcodeValid: true,
        zipcodeErrorText: ''
      });
    } else {
      this.setState({
        isZipcodeValid: false,
        zipcodeErrorText: 'kode pos tidak valid'
      });
    }
  };

  handleDelete = () => {
    this.setState({ openDialog: true });
  };

  handleClose = () => {
    this.setState({ openDialog: false });
  };

  handleUpdate = () => {
    this.setState({ updateConfirmation: true });
  };

  closeUpdateConfirmation = () => {
    this.setState({ updateConfirmation: false });
  };

  handleSaveUpdateSchool = () => {
    this.setState({ updateConfirmation: false });
    this.props.saveUpdateSchool();
  };

  handleDoneDelete = () => {
    window.location.href = process.env.PUBLIC_URL + '/';
  };

  render() {
    const { schoolState, onUpdateSchool, setModalSchool, saveUpdateSchool, deleteSchool, handleDoneUpdateSchool } = this.props;
    return (
      <div>
        <section className='school-page section-b-space'>
          <Container>
            <Grid container justify='center' alignItems='center'>
              <Grid item xs={12} lg={6}>
                <Paper elevation={3}>
                  <Box p={3}>
                    <Grid container direction='col' justify='center' alignItems='center' spacing={3}>
                      <Grid item container justify='center'>
                        <Image
                          className='school-logo'
                          style={{ height: '140px', width: '140px' }}
                          src={schoolState.data.avatar || `${process.env.PUBLIC_URL}/assets/images/school-logo.svg`}
                          roundedCircle
                        ></Image>
                      </Grid>
                      <hr style={{ border: '1px solid #C4C4C4', width: '95%' }} />

                      <Grid item container direction='row'>
                        <Grid item xs={5} lg={5}>
                          <strong>Nama Sekolah</strong>
                        </Grid>
                        <Grid item xs={7} lg={7}>
                          {schoolState.data.name}
                        </Grid>
                      </Grid>
                      <Grid item container direction='row'>
                        <Grid item xs={5} lg={5}>
                          <strong>Alamat</strong>
                        </Grid>
                        <Grid item xs={7} lg={7}>
                          {schoolState.data.address}, {schoolState.data.zipcode}
                        </Grid>
                      </Grid>
                      <Grid item container direction='row'>
                        <Grid item xs={5} lg={5}>
                          <strong>Nomor telepon</strong>
                        </Grid>
                        <Grid item xs={7} lg={7}>
                          {schoolState.data.phone}
                        </Grid>
                      </Grid>
                      {/* ONLY SHOW FOR OWNER MAINTAINER*/}
                      {schoolState.userHasAuthority && (
                        <Grid item container direction='row'>
                          <Grid item xs={5} lg={5}>
                            <strong>Kode sekolah</strong>
                          </Grid>
                          <Grid item xs={7} lg={7}>
                            <strong>{schoolState.data.code}</strong>
                          </Grid>
                        </Grid>
                      )}
                      <Grid item container direction='row'>
                        <Grid item xs={5} lg={5}>
                          <strong>Catatan Sekolah</strong>
                        </Grid>
                        <Grid item xs={7} lg={7}>
                          {schoolState.data.note || 'Belum mengisi catatan sekolah'}
                        </Grid>
                      </Grid>
                      {/* ONLY SHOW FOR OWNER MAINTAINER*/}
                      {schoolState.userHasAuthority && (
                        <Grid item container direction='row' justify='space-between'>
                          <Grid item xs={6} lg={6}>
                            <Button
                              style={{ textTransform: 'none' }}
                              color='secondary'
                              variant='contained'
                              disableElevation
                              onClick={this.handleDelete}
                            >
                              Hapus Sekolah
                            </Button>
                          </Grid>
                          <Grid item container xs={6} lg={6} justify='flex-end'>
                            <Button
                              style={{ textTransform: 'none' }}
                              color='primary'
                              variant='contained'
                              disableElevation
                              onClick={onUpdateSchool}
                            >
                              Ubah
                            </Button>
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Container>

          {/*Modal edit school */}
          <Modal isOpen={schoolState.successUpdateSchool == true ? false : schoolState.modal.show}>
            <ModalHeader toggle={() => setModalSchool('show', false)}>
              <strong>Ubah Sekolah</strong>
            </ModalHeader>
            <ValidatorForm onSubmit={this.handleUpdate}>
              <ModalBody>
                <div className='form-group'>
                  <span>Nama sekolah*</span>

                  <TextValidator
                    id='name'
                    type='text'
                    InputLabelProps={{
                      shrink: true
                    }}
                    placeholder='Contoh: SD Negeri 1 Depok'
                    margin='dense'
                    fullWidth
                    variant='outlined'
                    onChange={e => setModalSchool(e.target.id, e.target.value)}
                    value={schoolState.modal.name}
                    validators={['required']}
                    errorMessages={['masukkan nama sekolah']}
                  />
                </div>
                <div className='form-group'>
                  <span>Alamat sekolah</span>
                  <TextField
                    id='address'
                    InputLabelProps={{
                      shrink: true
                    }}
                    margin='dense'
                    placeholder='Contoh alamat: Jl KH Wahid Hasyim 80, Kebon Sirih'
                    multiline
                    fullWidth
                    rows={4}
                    variant='outlined'
                    onChange={e => setModalSchool(e.target.id, e.target.value)}
                    value={schoolState.modal.address}
                  />
                </div>
                <div className='form-group'>
                  <span>Kode pos</span>
                  <TextField
                    id='zipcode'
                    type='text'
                    InputLabelProps={{
                      shrink: true
                    }}
                    placeholder='Contoh: 13720'
                    margin='dense'
                    fullWidth
                    variant='outlined'
                    onKeyUp={this.validateZipcode}
                    error={!this.state.isZipcodeValid}
                    helperText={this.state.zipcodeErrorText}
                    onChange={e => setModalSchool(e.target.id, e.target.value)}
                    value={schoolState.modal.zipcode}
                  />
                </div>
                <div className='form-group'>
                  <span>Nomor telepon</span>
                  <TextField
                    id='phone'
                    type='text'
                    InputLabelProps={{
                      shrink: true
                    }}
                    margin='dense'
                    placeholder='Contoh: 0212894203'
                    fullWidth
                    variant='outlined'
                    onKeyUp={this.validatePhone}
                    error={!this.state.isPhoneValid}
                    helperText={this.state.phoneErrorText}
                    onChange={e => setModalSchool(e.target.id, e.target.value)}
                    value={schoolState.modal.phone}
                  />
                </div>
                <div className='form-group'>
                  <label>Logo sekolah</label>
                  <div>
                    {/* <Button
                    variant="contained"
                    disableElevation
                    component="label"
                    style={{ background: "#4AA0B5", color: "white" }}
                  >
                  Pilih Gambar */}
                    <input type='file' accept='image/*' label='Pilih gambar' onChange={this.uploadImage} />
                    {/* </Button> */}
                  </div>
                </div>

                <Collapse in={schoolState.modal.failed}>
                  <Alert
                    severity='error'
                    action={
                      <IconButton
                        aria-label='close'
                        color='inherit'
                        size='small'
                        onClick={() => setModalSchool('failed', false)}
                      >
                        <CloseIcon fontSize='inherit' />
                      </IconButton>
                    }
                  >
                    {schoolState.modal.errormsg}
                  </Alert>
                </Collapse>
              </ModalBody>
              <ModalFooter>
                {!schoolState.modal.showSpinner && (
                  <div>
                    <div>
                      <Button
                        color='default'
                        style={{ textTransform: 'none' }}
                        variant='contained'
                        disableElevation
                        onClick={() => setModalSchool('show', false)}
                      >
                        Batal
                      </Button>
                    </div>
                    <div>
                      <Button
                        style={{ textTransform: 'none' }}
                        color='primary'
                        variant='contained'
                        disableElevation
                        type='submit'
                      >
                        Simpan
                      </Button>
                    </div>
                  </div>
                )}
                {schoolState.modal.showSpinner && <CircularProgress />}
              </ModalFooter>
            </ValidatorForm>
          </Modal>

          {/* Remove school confirmation dialog*/}
          <Modal isOpen={schoolState.successDeleteSchool == true ? false : this.state.openDialog} centered>
            <ModalBody>
              {!schoolState.deleteSchoolFailed && (
                <Grid container direction='col' spacing={1} justify='center' alignItems='center'>
                  <Grid item>Apakah kamu yakin ingin menghapus sekolah?</Grid>
                  <Grid item container justify='space-around'>
                    <Grid item>
                      <Button
                        style={{ textTransform: 'none' }}
                        color='default'
                        variant='contained'
                        disableElevation
                        onClick={this.handleClose}
                      >
                        Batal
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        style={{ textTransform: 'none' }}
                        color='primary'
                        variant='contained'
                        disableElevation
                        onClick={deleteSchool}
                      >
                        Hapus
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              )}
              {schoolState.deleteSchoolFailed && <Alert severity='error'>{schoolState.deleteErrormsg}</Alert>}
            </ModalBody>
          </Modal>

          {/* Update school confirmation dialog */}
          <Modal isOpen={this.state.updateConfirmation} centered>
            <ModalBody>
              <Grid container direction='col' spacing={1} justify='center' alignItems='center'>
                <Grid item>Apakah kamu yakin dengan data yang kamu isi dan ingin menyimpannya?</Grid>
                <Grid item container justify='space-around'>
                  <Grid item>
                    <Button
                      style={{ textTransform: 'none' }}
                      color='default'
                      variant='contained'
                      disableElevation
                      onClick={this.closeUpdateConfirmation}
                    >
                      Batal
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      style={{ textTransform: 'none' }}
                      color='primary'
                      variant='contained'
                      disableElevation
                      onClick={this.handleSaveUpdateSchool}
                    >
                      Simpan
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </ModalBody>
          </Modal>

          {/* Success delete modal */}
          <Modal isOpen={schoolState.successDeleteSchool} centered>
            <ModalBody>
              <Grid container direction='col' spacing={2} justify='center' alignItems='center'>
                <Grid item>
                  <strong>Sekolah berhasil dihapus!</strong>
                </Grid>
                <Grid container justify='center'>
                  <Grid item>
                    <Button
                      style={{ textTransform: 'none' }}
                      color='primary'
                      variant='contained'
                      disableElevation
                      onClick={this.handleDoneDelete}
                    >
                      Oke
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </ModalBody>
          </Modal>

          {/* Success update modal */}
          <Modal isOpen={schoolState.successUpdateSchool} centered>
            <ModalBody>
              <Grid container direction='col' spacing={2} justify='center' alignItems='center'>
                <Grid item>
                  <strong>Data sekolah berhasil diubah!</strong>
                </Grid>
                <Grid container justify='center'>
                  <Grid item>
                    <Button
                      style={{ textTransform: 'none' }}
                      color='primary'
                      variant='contained'
                      disableElevation
                      onClick={handleDoneUpdateSchool}
                    >
                      Oke
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </ModalBody>
          </Modal>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  schoolState: state.school
});
export default connect(mapStateToProps, {
  getSchool,
  setModalSchool,
  onUpdateSchool,
  saveUpdateSchool,
  deleteSchool,
  handleDoneUpdateSchool
})(SchoolInfo);