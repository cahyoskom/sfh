import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import { Grid, TextField, Button, IconButton, Card, CardContent, Collapse } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import ClassIcon from '@material-ui/icons/Class';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AddIcon from '@material-ui/icons/Add';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Image } from 'react-bootstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import {
  onChangeStateJoinClass,
  joinClass,
  onChangeStateNewClass,
  createNewClass,
  onChangeStateNewSchool,
  createNewSchool,
  getClasses
} from '../../actions';
const pattern = /^[0-9]*$/;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPhoneValid: true,
      phoneErrorText: '',
      isZipcodeValid: true,
      zipcodeErrorText: '',
      isFileValid: true,
      fileErrorText: '',

      listClass: [
        {
          name: 'Kelas 2A',
          username: 'Budi',
          tahun: 'Tahun ajaran 2020',
          statusnya: 'Belum Terverifikasi'
        },
        {
          name: 'Kelas 5A',
          username: 'Andi',
          tahun: 'Tahun ajaran 2020',
          statusnya: 'Belum Terverifikasi'
        }
      ],

      listSchool: [
        {
          name: 'SDN 1 Jakarta',
          deskripsi: 'Jl. Kebayoran lama no.34'
        },
        {
          name: 'SDN 2 Jakarta',
          deskripsi: 'Jl. Mangga no.2'
        }
      ]
    };
  }
  componentDidMount() {
    const { getClasses } = this.props;
    getClasses();
    console.log("ah bambang")
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

  checkFileSize = file => {
    var fileSize = file.size / 1024 / 1024;
    if (fileSize > 2) {
      this.setState({
        isFileValid: false,
        fileErrorText: 'ukuran gambar tidak boleh melebihi 2MB'
      });
      return false;
    }
    return true;
  };

  uploadImage = e => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      var isValid = this.checkFileSize(file);
      if (isValid) {
        this.getBase64(file, result => {
          this.props.onChangeStateNewSchool('picture', result);
        });
      }
    } else {
      this.setState({
        isFileValid: true,
        fileErrorText: ''
      });
    }
  };

  validatePhone = () => {
    var isValid = this.props.landingState.newSchool.phoneNumber
      ? pattern.test(this.props.landingState.newSchool.phoneNumber)
      : true;

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
    var isValid = this.props.landingState.newSchool.postalCode
      ? pattern.test(this.props.landingState.newSchool.postalCode)
      : true;

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

  render() {
    const {
      landingState,
      onChangeStateJoinClass,
      joinClass,
      onChangeStateNewClass,
      createNewClass,
      onChangeStateNewSchool,
      createNewSchool
    } = this.props;
    let classes = []
    if(landingState.classes.data) classes = landingState.classes.data
    return (
      <section className='home-page section-b-space'>
        <Container>
          <Grid container direction='row' justify='flex-start' alignItems='center'>
            <Grid item xs={12} lg={12}>
              <Card variant='outlined'>
                <CardContent>
                  <Grid container direction='row' justify='flex-start' alignItems='flex-start' style={{ padding: '2em' }}>
                    <Grid item xs={12} lg={5}>
                      <Grid container direction='column' justify='flex-start' alignItems='stretch' spacing={2}>
                        <Grid item>
                          <h3>Kelas</h3>
                        </Grid>
                        <Grid item>
                          <Grid
                            container
                            direction='row'
                            justify='flex-start'
                            alignItems='stretch'
                            spacing={2}
                            style={{ marginBottom: '0.3em' }}
                          >
                            <Grid item>
                              <Button
                                variant='contained'
                                color='primary'
                                style={{ textTransform: 'none' }}
                                startIcon={<OpenInBrowserIcon />}
                                onClick={() => onChangeStateJoinClass('show', true)}
                              >
                                Gabung ke kelas
                              </Button>
                            </Grid>
                            <Grid item>
                              <Button
                                variant='contained'
                                color='primary'
                                style={{ textTransform: 'none' }}
                                startIcon={<AddIcon />}
                                onClick={() => onChangeStateNewClass('show', true)}
                              >
                                Buat kelas
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>

                        {classes.map((kelas, index) => (
                          
                          <Grid item xs={12} lg={12}>
                            <a href={kelas.url}>
                            <Card variant='outlined'>
                              <CardContent>
                                <Grid container direction='row' justify='center' alignItems='center'>
                                  <Grid item xs={12} lg={9}>
                                    <Grid container direction='column' justify='center' alignItems='flex-start'>
                                      <Grid item>
                                        <strong>{kelas.name}</strong>
                                      </Grid>
                                      <Grid item>
                                        <p>{kelas.owner}</p>
                                      </Grid>
                                      <Grid item>
                                        <p>{kelas.description}</p>
                                      </Grid>
                                      <Grid item>
                                        <p>{kelas.link_status}</p>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  <Grid item xs={12} lg={3}>
                                    <Avatar>N</Avatar>
                                  </Grid>
                                </Grid>
                              </CardContent>
                            </Card>
                            </a>
                            </Grid>
                        ))}
                      </Grid>
                    </Grid>

                    {/* ------------------------------------------------------------------------------ */}
                    <Grid item sm={12} lg={2}></Grid>
                    {/* ------------------------------------------------------------------------------ */}

                    <Grid item xs={12} lg={5}>
                      <Grid container direction='column' justify='flex-start' alignItems='stretch' spacing={2}>
                        <Grid item>
                          <h3>Sekolah</h3>
                        </Grid>
                        <Grid item>
                          <Grid
                            container
                            direction='row'
                            justify='flex-start'
                            alignItems='stretch'
                            spacing={2}
                            style={{ marginBottom: '0.3em' }}
                          >
                            <Grid item>
                              <Button
                                variant='contained'
                                color='primary'
                                style={{ textTransform: 'none' }}
                                startIcon={<AddIcon />}
                                onClick={() => onChangeStateNewSchool('show', true)}
                              >
                                Buat sekolah
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>

                        {this.state.listSchool.map((sekolah, index) => (
                          <Grid item xs={12} lg={12}>
                            <Card variant='outlined'>
                              <CardContent>
                                <Grid container direction='row' justify='center' alignItems='center'>
                                  <Grid item xs={12} lg={9}>
                                    <Grid container direction='column' justify='center' alignItems='flex-start'>
                                      <Grid item>
                                        <p>{sekolah.name}</p>
                                      </Grid>
                                      <Grid item>
                                        <p>{sekolah.deskripsi}</p>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  <Grid item xs={12} lg={3}>
                                    <Avatar>N</Avatar>
                                  </Grid>
                                </Grid>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
        {/* Modal Join Class <<<<<<<<<<<<<<<<<<<<<<<<<*/}
        <Modal centered isOpen={landingState.modaljoinClass.show}>
          <ModalHeader toggle={() => onChangeStateJoinClass('show', false)}>
            <strong>Gabung ke kelas</strong>
          </ModalHeader>
          {!landingState.newClass.success && (
            <ModalBody style={{ padding: '1rem 2rem 1rem 2rem' }}>
              <label>Kode kelas: </label>
              <Input
                type='text'
                id='code'
                style={{ marginBottom: '0.5em' }}
                placeholder='Masukkan kode kelas'
                value={landingState.modaljoinClass.code}
                onChange={e => onChangeStateJoinClass(e.target.id, e.target.value)}
              />
              <Collapse in={landingState.modaljoinClass.openAlert}>
                <Alert
                  severity='error'
                  action={
                    <IconButton
                      aria-label='close'
                      color='inherit'
                      size='small'
                      onClick={() => onChangeStateJoinClass('openAlert', false)}
                    >
                      <CloseIcon fontSize='inherit' />
                    </IconButton>
                  }
                >
                  {landingState.modaljoinClass.errormsg}
                </Alert>
              </Collapse>
            </ModalBody>
          )}
          {landingState.modaljoinClass.success && (
            <ModalBody>
              <Alert severity='success'>
                <p>
                  <strong>Berhasil bergabung ke kelas!</strong>
                </p>
                <p>{landingState.modaljoinClass.successmsg}</p>
              </Alert>
            </ModalBody>
          )}
          {!landingState.modaljoinClass.success && (
            <ModalFooter>
              <Button
                disableElevation
                style={{ textTransform: 'none', marginRight: '1.5em' }}
                onClick={() => onChangeStateJoinClass('show', false)}
              >
                Batal
              </Button>
              <Button
                color='primary'
                variant='contained'
                style={{ textTransform: 'none' }}
                disableElevation
                onClick={joinClass}
              >
                Gabung
              </Button>
            </ModalFooter>
          )}
        </Modal>
        {/* Modal New Class <<<<<<<<<<<<<<<<<<<<<<<<<*/}
        <Modal centered isOpen={landingState.newClass.show}>
          <ModalHeader toggle={() => onChangeStateNewClass('show', false)}>
            <strong>Buat kelas</strong>
          </ModalHeader>
          {!landingState.newClass.success && (
            <ModalBody style={{ padding: '1rem 2rem 2rem 2rem' }}>
              <label>Nama kelas: </label>
              <Input
                type='text'
                id='name'
                style={{ marginBottom: '0.5em' }}
                placeholder='Contoh: Kelas 1B'
                value={landingState.newClass.name}
                onChange={e => onChangeStateNewClass(e.target.id, e.target.value)}
              />
              <label>Deskripsi: </label>
              <Input
                type='text'
                id='description'
                style={{ marginBottom: '0.5em' }}
                placeholder='Masukkan deskripsi kelas'
                value={landingState.newClass.description}
                onChange={e => onChangeStateNewClass(e.target.id, e.target.value)}
              />
              <label>Sekolah: </label>
              <Input
                type='text'
                id='school'
                placeholder='Masukkan link atau kode sekolah'
                value={landingState.newClass.school}
                onChange={e => onChangeStateNewClass(e.target.id, e.target.value)}
              />
              <Collapse in={landingState.newClass.openAlert}>
                <Alert
                  severity='error'
                  action={
                    <IconButton
                      aria-label='close'
                      color='inherit'
                      size='small'
                      onClick={() => onChangeStateNewClass('openAlert', false)}
                    >
                      <CloseIcon fontSize='inherit' />
                    </IconButton>
                  }
                >
                  {landingState.newClass.errormsg}
                </Alert>
              </Collapse>
            </ModalBody>
          )}
          {landingState.newClass.success && (
            <ModalBody>
              <Alert severity='success'>
                <p>
                  <strong>Kelas berhasil dibuat!</strong>
                </p>
                <p>{landingState.newClass.successmsg}</p>
              </Alert>
            </ModalBody>
          )}
          {!landingState.newClass.success && (
            <ModalFooter>
              <Button
                style={{ textTransform: 'none', marginRight: '1.5em' }}
                disableElevation
                onClick={() => onChangeStateNewClass('show', false)}
              >
                Batal
              </Button>
              <Button
                color='primary'
                variant='contained'
                style={{ textTransform: 'none' }}
                disableElevation
                onClick={createNewClass}
              >
                Buat kelas
              </Button>
            </ModalFooter>
          )}
        </Modal>

        {/* Modal New School <<<<<<<<<<<<<<<<<<<<<<<<<*/}
        <Modal centered isOpen={landingState.newSchool.show}>
          <ModalHeader toggle={() => onChangeStateNewSchool('show', false)}>
            <strong>Buat sekolah</strong>
          </ModalHeader>
          <ValidatorForm onSubmit={createNewSchool}>
            <ModalBody>
              <div className='form-group'>
                <Grid item container justify='center'>
                  <Image
                    className='school-logo'
                    style={{ height: '140px', width: '140px' }}
                    src={landingState.newSchool.picture || `${process.env.PUBLIC_URL}/assets/images/school-logo.svg`}
                    roundedCircle
                  ></Image>
                </Grid>
              </div>
              <div className='form-group'>
                <Grid container alignItems='center'>
                  <Grid item lg={4}>
                    <span>
                      <strong>Logo sekolah</strong>
                    </span>
                  </Grid>
                  <Grid item lg={8}>
                    <div>
                      <input
                        type='file'
                        accept='image/*'
                        style={{ display: 'none' }}
                        id='upload-file'
                        onChange={this.uploadImage}
                      />
                      <label htmlFor='upload-file'>
                        <Button
                          variant='contained'
                          style={{ background: '#4AA0B5', color: 'white' }}
                          component='span'
                          startIcon={<CloudUploadIcon />}
                        >
                          Pilih file
                        </Button>
                      </label>
                    </div>
                  </Grid>
                </Grid>
              </div>
              <div className='form-group'>
                <Grid container alignItems='center'>
                  <Grid item lg={4}>
                    <span>
                      <strong>Nama sekolah*</strong>
                    </span>
                  </Grid>
                  <Grid item lg={8}>
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
                      onChange={e => onChangeStateNewSchool(e.target.id, e.target.value)}
                      value={landingState.newSchool.name}
                      validators={['required']}
                      errorMessages={['masukkan nama sekolah']}
                    />
                  </Grid>
                </Grid>
              </div>
              <div className='form-group'>
                <Grid container alignItems='center'>
                  <Grid item lg={4}>
                    <span>
                      <strong>Alamat sekolah</strong>
                    </span>
                  </Grid>
                  <Grid item lg={8}>
                    <TextField
                      id='address'
                      InputLabelProps={{
                        shrink: true
                      }}
                      margin='dense'
                      placeholder='Contoh alamat: Jl KH Wahid Hasyim 80, Kebon Sirih'
                      multiline
                      fullWidth
                      rows={2}
                      variant='outlined'
                      onChange={e => onChangeStateNewSchool(e.target.id, e.target.value)}
                      value={landingState.newSchool.address}
                    />
                  </Grid>
                </Grid>
              </div>
              <div className='form-group'>
                <Grid container alignItems='center'>
                  <Grid item lg={4}>
                    <span>
                      <strong>Kode pos</strong>
                    </span>
                  </Grid>
                  <Grid item lg={8}>
                    <TextField
                      id='postalCode'
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
                      onChange={e => onChangeStateNewSchool(e.target.id, e.target.value)}
                      value={landingState.newSchool.postalCode}
                    />
                  </Grid>
                </Grid>
              </div>
              <div className='form-group'>
                <Grid container alignItems='center'>
                  <Grid item lg={4}>
                    <span>
                      <strong>Nomor telepon</strong>
                    </span>
                  </Grid>
                  <Grid item lg={8}>
                    <TextField
                      id='phoneNumber'
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
                      onChange={e => onChangeStateNewSchool(e.target.id, e.target.value)}
                      value={landingState.newSchool.phoneNumber}
                    />
                  </Grid>
                </Grid>
              </div>
              <div className='form-group'>
                <Grid container alignItems='center'>
                  <Grid item lg={4}>
                    <span>
                      <strong>Catatan sekolah</strong>
                    </span>
                  </Grid>
                  <Grid item lg={8}>
                    <TextField
                      id='note'
                      InputLabelProps={{
                        shrink: true
                      }}
                      margin='dense'
                      placeholder='Masukkan catatan sekolah'
                      multiline
                      fullWidth
                      rows={2}
                      variant='outlined'
                      onChange={e => onChangeStateNewSchool(e.target.id, e.target.value)}
                      value={landingState.newSchool.note}
                    />
                  </Grid>
                </Grid>
              </div>

              <Collapse in={landingState.newSchool.openAlert}>
                <Alert
                  severity='error'
                  action={
                    <IconButton
                      aria-label='close'
                      color='inherit'
                      size='small'
                      onClick={() => onChangeStateNewSchool('openAlert', false)}
                    >
                      <CloseIcon fontSize='inherit' />
                    </IconButton>
                  }
                >
                  {landingState.newSchool.errormsg}
                </Alert>
              </Collapse>
            </ModalBody>
            <ModalFooter>
              <Grid container justify='flex-end' spacing={2}>
                <Grid item>
                  <Button
                    color='default'
                    variant='contained'
                    disableElevation
                    onClick={() => onChangeStateNewSchool('show', false)}
                  >
                    Batal
                  </Button>
                </Grid>
                <Grid item>
                  <Button color='primary' variant='contained' disableElevation type='submit'>
                    Simpan
                  </Button>
                </Grid>
              </Grid>
            </ModalFooter>
          </ValidatorForm>
        </Modal>

        {/* Success create school modal */}
        <Modal isOpen={landingState.newSchool.success} centered>
          <ModalBody>
            <Grid container direction='col' spacing={2} justify='center' alignItems='center'>
              <Grid item>
                <strong>Sekolah berhasil dibuat</strong>
              </Grid>
              <Grid container justify='center'>
                <Grid item>
                  <Button
                    color='primary'
                    variant='contained'
                    disableElevation
                    onClick={() => onChangeStateNewSchool('success', false)}
                  >
                    Oke
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </ModalBody>
        </Modal>
      </section>
    );
  }
}

// export default SignIn
const mapStateToProps = state => ({
  landingState: state.landingpage
});

export default connect(mapStateToProps, {
  onChangeStateJoinClass,
  joinClass,
  onChangeStateNewClass,
  createNewClass,
  onChangeStateNewSchool,
  createNewSchool,
  getClasses
})(Home);
