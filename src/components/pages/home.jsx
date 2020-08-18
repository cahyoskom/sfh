import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import ClassIcon from '@material-ui/icons/Class';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import {
  onChangeStateJoinClass,
  joinClass,
  onChangeStateNewClass,
  createNewClass,
  onChangeStateNewSchool,
  createNewSchool
} from '../../actions';

//testing

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

                        {this.state.listClass.map((kelas, index) => (
                          <Grid item xs={12} lg={12}>
                            <Card variant='outlined'>
                              <CardContent>
                                <Grid container direction='row' justify='center' alignItems='center'>
                                  <Grid item xs={12} lg={9}>
                                    <Grid container direction='column' justify='center' alignItems='flex-start'>
                                      <Grid item>
                                        <p>{kelas.name}</p>
                                      </Grid>
                                      <Grid item>
                                        <p>{kelas.username}</p>
                                      </Grid>
                                      <Grid item>
                                        <p>{kelas.tahun}</p>
                                      </Grid>
                                      <Grid item>
                                        <p>{kelas.statusnya}</p>
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
          {!landingState.newSchool.success && (
            <ModalBody style={{ padding: '1rem 2rem 2rem 2rem' }}>
              <label>Nama sekolah: </label>
              <Input
                type='text'
                id='name'
                style={{ marginBottom: '0.5em' }}
                placeholder='Masukkan nama sekolah'
                value={landingState.newSchool.name}
                onChange={e => onChangeStateNewSchool(e.target.id, e.target.value)}
              />
              <label>Alamat sekolah: </label>
              <Input
                type='textarea'
                id='address'
                style={{ marginBottom: '0.5em' }}
                placeholder='Masukkan alamat sekolah'
                value={landingState.newSchool.address}
                onChange={e => onChangeStateNewSchool(e.target.id, e.target.value)}
              />
              <label>Kode pos: </label>
              <Input
                type='text'
                id='postalCode'
                style={{ marginBottom: '0.5em' }}
                placeholder='Masukkan kode pos sekolah'
                value={landingState.newSchool.postalCode}
                onChange={e => onChangeStateNewSchool(e.target.id, e.target.value)}
              />
              <label>Nomor telepon sekolah: </label>
              <Input
                type='text'
                id='phoneNumber'
                style={{ marginBottom: '0.5em' }}
                placeholder='Masukkan nomor telepon sekolah'
                value={landingState.newSchool.phoneNumber}
                onChange={e => onChangeStateNewSchool(e.target.id, e.target.value)}
              />
              <label>Logo sekolah: </label>
              <Input
                type='file'
                accept='image/*'
                style={{ marginBottom: '0.5em' }}
                id='picture'
                placeholder='Masukkan foto logo sekolah'
                value={landingState.newSchool.picture}
                onChange={e => onChangeStateNewSchool(e.target.id, e.target.value)}
              />
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
          )}
          {landingState.newSchool.success && (
            <ModalBody>
              <Alert severity='success'>
                <p>
                  <strong>Sekolah berhasil dibuat!</strong>
                </p>
                <p>{landingState.newSchool.successmsg}</p>
              </Alert>
            </ModalBody>
          )}
          {!landingState.newSchool.success && (
            <ModalFooter>
              <Button
                style={{ textTransform: 'none', marginRight: '1.5em' }}
                disableElevation
                onClick={() => onChangeStateNewSchool('show', false)}
              >
                Batal
              </Button>
              <Button
                color='primary'
                variant='contained'
                style={{ textTransform: 'none' }}
                disableElevation
                onClick={createNewSchool}
              >
                Buat sekolah
              </Button>
            </ModalFooter>
          )}
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
  createNewSchool
})(Home);
