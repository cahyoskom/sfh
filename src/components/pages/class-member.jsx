import React, { Component } from 'react';

import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Image } from 'react-bootstrap';
import {
  getDataClassMembers,
  getDataClassInfo,
  onChangeStateClassInfo,
  onChangeStateUpdateMember,
  postUpdateMember,
  onChangeStateAddMember,
  postAddMember
} from '../../actions';

import Alert from '@material-ui/lab/Alert';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Grid, Box, Collapse, IconButton, Container, Breadcrumbs, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { default as MaterialLink } from '@material-ui/core/Link';
import CloseIcon from '@material-ui/icons/Close';

class ClassMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: {
        maxWidth: 200
      }
    };
  }
  componentDidMount() {
    const { getDataClassInfo, onChangeStateClassInfo, getDataClassMembers } = this.props;
    onChangeStateClassInfo('id', this.props.match.params.id);
    getDataClassMembers();
    getDataClassInfo();
  }

  onClickNonaktifkan(e) {
    const { onChangeStateUpdateMember, postUpdateMember } = this.props;
    onChangeStateUpdateMember('request', 'nonaktifkan');
    onChangeStateUpdateMember('userId', e);
    postUpdateMember();
  }
  onClickAktifkan(e) {
    const { onChangeStateUpdateMember, postUpdateMember } = this.props;
    onChangeStateUpdateMember('request', 'aktifkan');
    onChangeStateUpdateMember('userId', e);
    postUpdateMember();
  }
  onClickSetujui(e) {
    const { onChangeStateUpdateMember, postUpdateMember } = this.props;
    onChangeStateUpdateMember('request', 'setujui');
    onChangeStateUpdateMember('userId', e);
    postUpdateMember();
  }
  onClickTolak(e) {
    const { onChangeStateUpdateMember, postUpdateMember } = this.props;
    onChangeStateUpdateMember('request', 'tolak');
    onChangeStateUpdateMember('userId', e);
    postUpdateMember();
  }
  onClickBatalkan(e) {
    const { onChangeStateUpdateMember, postUpdateMember } = this.props;
    onChangeStateUpdateMember('request', 'batalkan');
    onChangeStateUpdateMember('userId', e);
    postUpdateMember();
  }
  onClickKeluarkan(e) {
    const { onChangeStateUpdateMember, postUpdateMember } = this.props;
    onChangeStateUpdateMember('request', 'keluarkan');
    onChangeStateUpdateMember('userId', e);
    postUpdateMember();
  }
  onClickAddTeacher(e) {
    const { onChangeStateAddMember } = this.props;
    onChangeStateAddMember('position', 'teacher');
    onChangeStateAddMember('modal', true);
  }
  onClickAddStudent(e) {
    const { onChangeStateAddMember } = this.props;
    onChangeStateAddMember('position', 'student');
    onChangeStateAddMember('modal', true);
  }

  render() {
    const { classState, postAddMember, onChangeStateAddMember } = this.props;
    let students = [];
    let teachers = [];
    if (classState.members.data != '') {
      students = classState.members.data.students; //
      // students = JSON.parse(classState.members.data).students;
      teachers = classState.members.data.teachers; //
      // teachers = JSON.parse(classState.members.data).teachers;
    }
    return (
      <div>
        <Container>
          <Breadcrumbs separator={<NavigateNextIcon fontSize='small' />} aria-label='breadcrumb'>
            <MaterialLink color='inherit' href={`${process.env.PUBLIC_URL}/`}>
              Beranda
            </MaterialLink>
            <Typography color='textPrimary'>{classState.classInfo.name}</Typography>
          </Breadcrumbs>
          <section className='home-page section-b-space'>
            <Grid container direction='col' spacing={2} justify='center' alignItems='center'>
              <Grid item xs={12} lg={10}>
                <Paper variant='outlined' width={1}>
                  <Box p={2}>
                    <Grid item container direction='row' justify='space-between' alignItems='center'>
                      <Grid item lg={8}>
                        <div>
                          <div style={{ fontSize: '36px', color: '#0170E3' }}>
                            <strong>{classState.classInfo.name}</strong>
                          </div>
                          <div style={{}}>
                            <strong>{classState.classInfo.owner.name}</strong>
                          </div>
                          <div style={{}}>
                            <strong>{classState.classInfo.description}</strong>
                          </div>

                          <div>
                            Kode kelas: <strong>{classState.classInfo.code}</strong>
                          </div>
                        </div>
                      </Grid>
                      <Grid item>
                        <div>
                          <Image
                            className='school-logo'
                            style={{ height: '140px', width: '140px' }}
                            src={classState.classInfo.owner.avatar || `${process.env.PUBLIC_URL}/assets/images/school-logo.svg`}
                            roundedCircle
                          ></Image>
                        </div>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Grid>
              <Grid item container direction='row' justify='space-between' alignItems='center'>
                <Grid item>
                  <h3>Pengajar</h3>
                </Grid>
                <Grid item>
                  <Button color='primary' variant='contained' onClick={() => this.onClickAddTeacher()}>
                    tambah pengajar +
                  </Button>
                </Grid>
              </Grid>
              <TableContainer component={Paper}>
                <Table className='tableMember' aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      {classState.members.data.hasAuthority && (
                        <TableCell>
                          <strong>Status</strong>
                        </TableCell>
                      )}
                      <TableCell>
                        <strong> Nama</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {teachers.map(row => (
                      <TableRow key={row.name}>
                        {classState.members.data.hasAuthority && row.link_status == 'Disetujui' && (
                          <TableCell style={{ color: '#0170E3' }}>{row.link_status}</TableCell>
                        )}
                        {classState.members.data.hasAuthority && row.link_status == 'Menunggu persetujuan' && (
                          <TableCell style={{ color: '#fcbe03' }}>{row.link_status}</TableCell>
                        )}
                        {classState.members.data.hasAuthority && row.link_status == 'Dinonaktifkan' && (
                          <TableCell style={{ color: '#bfbfbf' }}>{row.link_status}</TableCell>
                        )}
                        {classState.members.data.hasAuthority && row.link_status == 'Undangan terkirim' && (
                          <TableCell style={{ color: '#fc035a' }}>{row.link_status}</TableCell>
                        )}
                        <TableCell component='th' scope='row'>
                          {row.name}
                        </TableCell>
                        {classState.members.data.hasAuthority && row.link_status == 'Disetujui' && (
                          <TableCell align='right'>
                            <Button color='secondary' onClick={() => this.onClickNonaktifkan(row.id)}>
                              Nonaktifkan
                            </Button>
                            <Button onClick={() => this.onClickKeluarkan(row.id)}>Keluarkan</Button>
                          </TableCell>
                        )}
                        {classState.members.data.hasAuthority && row.link_status == 'Menunggu persetujuan' && (
                          <TableCell align='right'>
                            <Button color='secondary' onClick={() => this.onClickTolak(row.id)}>
                              Tolak
                            </Button>
                            <Button color='primary' onClick={() => this.onClickSetujui(row.id)}>
                              Setujui
                            </Button>
                          </TableCell>
                        )}
                        {classState.members.data.hasAuthority && row.link_status == 'Dinonaktifkan' && (
                          <TableCell align='right'>
                            <Button color='secondary' onClick={() => this.onClickKeluarkan(row.id)}>
                              Keluarkan
                            </Button>
                            <Button color='primary' onClick={() => this.onClickAktifkan(row.id)}>
                              Aktifkan
                            </Button>
                          </TableCell>
                        )}
                        {classState.members.data.hasAuthority && row.link_status == 'Undangan terkirim' && (
                          <TableCell align='right'>
                            <Button color='secondary' onClick={() => this.onClickBatalkan(row.id)}>
                              Batalkan
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Grid item container direction='row' justify='space-between' alignItems='center'>
                <Grid item>
                  <h3>Pelajar</h3>
                </Grid>
                <Grid item>
                  <Button color='primary' variant='contained' onClick={() => this.onClickAddStudent()}>
                    tambah pelajar +
                  </Button>
                </Grid>
              </Grid>
              <TableContainer component={Paper} width={1}>
                <Table className='tableMember' aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      {classState.members.data.hasAuthority && (
                        <TableCell>
                          <strong>Status</strong>
                        </TableCell>
                      )}
                      <TableCell>
                        <strong>Nama</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students.map(row => (
                      <TableRow key={row.name}>
                        {classState.members.data.hasAuthority && row.link_status == 'Disetujui' && (
                          <TableCell style={{ color: '#0170E3' }}>{row.link_status}</TableCell>
                        )}
                        {classState.members.data.hasAuthority && row.link_status == 'Menunggu persetujuan' && (
                          <TableCell style={{ color: '#fcbe03' }}>{row.link_status}</TableCell>
                        )}
                        {classState.members.data.hasAuthority && row.link_status == 'Dinonaktifkan' && (
                          <TableCell style={{ color: '#bfbfbf' }}>{row.link_status}</TableCell>
                        )}
                        {classState.members.data.hasAuthority && row.link_status == 'Undangan terkirim' && (
                          <TableCell style={{ color: '#fc035a' }}>{row.link_status}</TableCell>
                        )}
                        <TableCell component='th' scope='row'>
                          {row.name}
                        </TableCell>
                        {classState.members.data.hasAuthority && row.link_status == 'Disetujui' && (
                          <TableCell align='right'>
                            <Button color='secondary' onClick={() => this.onClickNonaktifkan(row.id)}>
                              Nonaktifkan
                            </Button>
                            <Button onClick={() => this.onClickKeluarkan(row.id)}>Keluarkan</Button>
                          </TableCell>
                        )}
                        {classState.members.data.hasAuthority && row.link_status == 'Menunggu persetujuan' && (
                          <TableCell align='right'>
                            <Button color='secondary' onClick={() => this.onClickTolak(row.id)}>
                              Tolak
                            </Button>
                            <Button color='primary' onClick={() => this.onClickSetujui(row.id)}>
                              Setujui
                            </Button>
                          </TableCell>
                        )}
                        {classState.members.data.hasAuthority && row.link_status == 'Dinonaktifkan' && (
                          <TableCell align='right'>
                            <Button color='secondary' onClick={() => this.onClickKeluarkan(row.id)}>
                              Keluarkan
                            </Button>
                            <Button color='primary' onClick={() => this.onClickAktifkan(row.id)}>
                              Aktifkan
                            </Button>
                          </TableCell>
                        )}
                        {classState.members.data.hasAuthority && row.link_status == 'Undangan terkirim' && (
                          <TableCell align='right'>
                            <Button color='secondary' onClick={() => this.onClickBatalkan(row.id)}>
                              Batalkan
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            {/* modal add member */}
            <Modal isOpen={classState.addMember.modal} centered>
              <ModalHeader toggle={() => onChangeStateAddMember('modal', false)}>
                <strong>Tambah anggota</strong>
              </ModalHeader>
              <ValidatorForm onSubmit={postAddMember}>
                <ModalBody>
                  <div className='form-group'>
                    <label>
                      Masukkan email anggota yang ingin kamu tambahkan sebagai <strong>anggota</strong>. Kami akan memberikan
                      undangan berupa tautan yang akan dikirimkan melalui email.
                    </label>
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
                      onChange={e => onChangeStateAddMember(e.target.id, e.target.value)}
                      onBlur={this.validateEmail}
                      error={!this.state.isEmailValid}
                      helperText={this.state.emailErrorText}
                      value={classState.addMember.email}
                      validators={['required']}
                      errorMessages={['masukkan email']}
                    />
                  </div>

                  <Collapse in={classState.addMember.error}>
                    <Alert
                      severity='error'
                      action={
                        <IconButton
                          aria-label='close'
                          color='inherit'
                          size='small'
                          onClick={() => onChangeStateAddMember('error', false)}
                        >
                          <CloseIcon fontSize='inherit' />
                        </IconButton>
                      }
                    >
                      {classState.addMember.errormsg}
                    </Alert>
                  </Collapse>
                </ModalBody>
                <ModalFooter>
                  <div>
                    <Button
                      color='default'
                      variant='contained'
                      disableElevation
                      onClick={() => onChangeStateAddMember('modal', false)}
                    >
                      Batal
                    </Button>
                  </div>
                  <div>
                    <Button color='primary' variant='contained' disableElevation type='submit'>
                      Kirim
                    </Button>
                  </div>
                </ModalFooter>
              </ValidatorForm>
            </Modal>
          </section>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  // accountState: state.account,
  classState: state.class
});

// export default ClassInfo;
export default connect(mapStateToProps, {
  getDataClassInfo,
  getDataClassMembers,
  onChangeStateClassInfo,
  onChangeStateUpdateMember,
  postUpdateMember,
  onChangeStateAddMember,
  postAddMember
})(ClassMember);
