import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Paper,
  Button,
  Container,
  Box,
  Collapse,
  TextField,
  IconButton,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputBase
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Image } from 'react-bootstrap';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import * as EmailValidator from 'email-validator';
import {
  getSchoolMembers,
  getSchool,
  changeOwner,
  removeMember,
  onChangeAddMember,
  closeSuccessModal,
  addMember
} from '../../actions';

class SchoolMember extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ownerConfirmation: false,
      ownerTargetId: null,
      ownerTargetName: '',

      removeConfirmation: false,
      removeTargetId: null,
      removeTargetName: '',

      isEmailValid: true,
      emailErrorText: ''
    };
  }

  componentDidMount = () => {
    this.props.getSchool(this.props.match.params.id);
    this.props.getSchoolMembers(this.props.match.params.id);
  };

  openOwnerConfirmation = (id, name) => {
    this.setState({
      ownerConfirmation: true,
      ownerTargetId: id,
      ownerTargetName: name
    });
  };

  closeOwnerConfirmation = () => {
    this.setState({
      ownerConfirmation: false,
      ownerTargetId: null
    });
  };

  openRemoveConfirmation = (id, name) => {
    this.setState({
      removeConfirmation: true,
      removeTargetId: id,
      removeTargetName: name
    });
  };

  closeRemoveConfirmation = id => {
    this.setState({
      removeConfirmation: false,
      removeTargetId: null
    });
  };

  handleChangeOwner = () => {
    this.props.changeOwner(this.state.ownerTargetId);
    this.setState({
      ownerConfirmation: false,
      ownerTargetId: null
    });
  };

  handleRemoveMember = () => {
    this.props.removeMember(this.state.removeTargetId);
    this.setState({
      removeConfirmation: false,
      removeTargetId: null
    });
  };

  validateEmail = () => {
    if (!EmailValidator.validate(this.props.schoolState.addMemberModal.email)) {
      this.setState({
        isEmailValid: false,
        emailErrorText: 'email tidak valid'
      });
    } else {
      this.setState({
        isEmailValid: true,
        emailErrorText: ''
      });
    }
  };

  render() {
    const { schoolState, onChangeAddMember, closeSuccessModal, addMember } = this.props;
    return (
      <div>
        <section className='school-member-page section-b-space'>
          <Container>
            <Grid container directions='col' spacing={2} justify='center' alignItems='center'>
              <Grid item xs={12} lg={5}>
                <Paper variant='outlined' width={1}>
                  <Box p={2}>
                    <Grid item container direction='row' justify='space-between' alignItems='center'>
                      <Grid item lg={8}>
                        <div>
                          <div style={{ fontSize: '36px', color: '#0170E3' }}>
                            <strong>{schoolState.data.name}</strong>
                          </div>
                          <br></br>
                          <div>
                            {schoolState.data.address}, {schoolState.data.zipcode}
                          </div>
                          <br></br>

                          {schoolState.userHasAuthority ? (
                            <div>
                              Kode sekolah: <stong>{schoolState.data.code}</stong>
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </div>
                      </Grid>
                      <Grid item>
                        <div>
                          <Image
                            className='school-logo'
                            style={{ height: '140px', width: '140px' }}
                            src={`${process.env.PUBLIC_URL}/assets/images/school-logo.svg`}
                            roundedCircle
                          ></Image>
                        </div>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} lg={3}></Grid>
              <Grid item container direction='row' justify='space-between' xs={12} lg={8} alignItems='center'>
                <Grid item>
                  <strong>Anggota Sekolah</strong>
                </Grid>
                <Grid item>
                  {schoolState.userHasAuthority && (
                    <Button
                      variant='contained'
                      color='primary'
                      style={{ textTransform: 'none' }}
                      startIcon={<AddIcon />}
                      onClick={() => onChangeAddMember('show', true)}
                    >
                      Tambah anggota
                    </Button>
                  )}
                </Grid>
              </Grid>
              <Grid item container xs={12} lg={10}>
                <TableContainer component={Paper}>
                  <Table aria-label='simple table'>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <strong>Nama Anggota</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Email</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Nomor telepon</strong>
                        </TableCell>
                        {schoolState.userHasAuthority && (
                          <TableCell>
                            <strong>Aksi</strong>
                          </TableCell>
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {schoolState.listMembers.map(row => (
                        <TableRow key={row.id}>
                          <TableCell component='th' scope='col'>
                            <div style={{ width: 200, whiteSpace: 'normal' }}>
                              {row.sec_user_model.name} {row.sec_group_id == 1 ? '(Koordinator)' : ''}
                            </div>
                          </TableCell>
                          <TableCell>{row.sec_user_model.email}</TableCell>
                          <TableCell>{row.sec_user_model.phone}</TableCell>
                          {schoolState.userHasAuthority && (
                            <TableCell key={row.id}>
                              <Grid container>
                                {schoolState.isOwner == true && row.sec_group_id != 1 ? (
                                  <div style={{ marginRight: '3px' }}>
                                    <Button
                                      variant='contained'
                                      color='primary'
                                      size='small'
                                      style={{ textTransform: 'none' }}
                                      onClick={() => this.openOwnerConfirmation(row.id, row.sec_user_model.name)}
                                    >
                                      Jadikan sebagai pemilik sekolah
                                    </Button>
                                  </div>
                                ) : null}
                                {row.sec_group_id != 1 && (
                                  <div>
                                    <Button
                                      variant='contained'
                                      color='secondary'
                                      size='small'
                                      style={{ textTransform: 'none' }}
                                      onClick={() => this.openRemoveConfirmation(row.id, row.sec_user_model.name)}
                                    >
                                      Keluarkan
                                    </Button>
                                  </div>
                                )}
                              </Grid>
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Container>
          {/* modal add member */}
          <Modal isOpen={schoolState.addMemberModal.show} centered>
            <ModalHeader toggle={() => onChangeAddMember('show', false)}>
              <strong>Tambah anggota</strong>
            </ModalHeader>
            <ValidatorForm onSubmit={addMember}>
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
                    onChange={e => onChangeAddMember(e.target.id, e.target.value)}
                    onBlur={this.validateEmail}
                    error={!this.state.isEmailValid}
                    helperText={this.state.emailErrorText}
                    value={schoolState.addMemberModal.email}
                    validators={['required']}
                    errorMessages={['masukkan email']}
                  />
                </div>

                <Collapse in={schoolState.addMemberModal.error}>
                  <Alert
                    severity='error'
                    action={
                      <IconButton
                        aria-label='close'
                        color='inherit'
                        size='small'
                        onClick={() => onChangeAddMember('error', false)}
                      >
                        <CloseIcon fontSize='inherit' />
                      </IconButton>
                    }
                  >
                    {schoolState.addMemberModal.errormsg}
                  </Alert>
                </Collapse>
              </ModalBody>
              <ModalFooter>
                <div>
                  <Button
                    style={{ textTransform: 'none' }}
                    color='default'
                    variant='contained'
                    disableElevation
                    onClick={() => onChangeAddMember('show', false)}
                  >
                    Batal
                  </Button>
                </div>
                <div>
                  <Button style={{ textTransform: 'none' }} color='primary' variant='contained' disableElevation type='submit'>
                    Kirim
                  </Button>
                </div>
              </ModalFooter>
            </ValidatorForm>
          </Modal>
          {/* Modal confirmation change owner */}
          <Modal isOpen={this.state.ownerConfirmation} centered>
            <ModalBody>
              <Grid container direction='col' spacing={1} justify='center' alignItems='center'>
                <Grid item>
                  Apakah Anda sudah yakin akan mengganti <strong>{this.state.ownerTargetName}</strong> menjadi koordinator
                  sekolah?
                </Grid>
                <Grid item container justify='space-around'>
                  <Grid item>
                    <Button
                      style={{ textTransform: 'none' }}
                      color='default'
                      variant='contained'
                      disableElevation
                      onClick={this.closeOwnerConfirmation}
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
                      onClick={this.handleChangeOwner}
                    >
                      Ya, sudah yakin
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </ModalBody>
          </Modal>
          {/* Modal confirmation change owner */}
          <Modal isOpen={this.state.removeConfirmation} centered>
            <ModalBody>
              <Grid container direction='col' spacing={1} justify='center' alignItems='center'>
                <Grid item>
                  Apakah Anda sudah yakin akan menghapus <strong>{this.state.removeTargetName}</strong> dari sekolah?
                </Grid>
                <Grid item container justify='space-around'>
                  <Grid item>
                    <Button
                      style={{ textTransform: 'none' }}
                      color='default'
                      variant='contained'
                      disableElevation
                      onClick={this.closeRemoveConfirmation}
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
                      onClick={this.handleRemoveMember}
                    >
                      Ya, sudah yakin
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </ModalBody>
          </Modal>

          {/* Success modal  */}
          <Modal isOpen={schoolState.successModal.show} centered>
            <ModalBody>
              <Grid container direction='col' spacing={2} justify='center' alignItems='center'>
                <Grid item>
                  <strong>{schoolState.successModal.message}</strong>
                </Grid>
                <Grid container justify='center'>
                  <Grid item>
                    <Button
                      style={{ textTransform: 'none' }}
                      color='primary'
                      variant='contained'
                      disableElevation
                      onClick={closeSuccessModal}
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
  getSchoolMembers,
  getSchool,
  changeOwner,
  removeMember,
  onChangeAddMember,
  closeSuccessModal,
  addMember
})(SchoolMember);
