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
  InputBase,
  Menu,
  MenuItem,
  Breadcrumbs,
  Typography
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { default as MaterialLink } from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Image } from 'react-bootstrap';
import AddIcon from '@material-ui/icons/Add';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import SearchIcon from '@material-ui/icons/Search';
import CheckSharpIcon from '@material-ui/icons/CheckSharp';
import CloseIcon from '@material-ui/icons/Close';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
  getSchoolClass,
  schoolConnectClass,
  setModalConnectClass,
  setModalCreateSchoolClass,
  schoolCreateClass,
  getSchool,
  closeModalConnectClass,
  changeLinkStatus,
  closeSuccessModal,
  searchClass,
  setFilter
} from '../../actions';

class SchoolClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      declineConfirmation: false,
      idDecline: null,
      valueDecline: null,

      anchorEl: null
    };
  }

  componentDidMount = () => {
    this.props.getSchool(this.props.match.params.id);
    this.props.getSchoolClass(this.props.match.params.id);
  };

  openDeclineConfirmation = (id, value) => {
    this.setState({
      idDecline: id,
      valueDecline: value,
      declineConfirmation: true
    });
  };
  closeDeclineConfirmation = () => {
    this.setState({ declineConfirmation: false });
  };

  handleDecline = () => {
    this.setState({ declineConfirmation: false });
    this.props.changeLinkStatus(this.state.idDecline, this.state.valueDecline);
  };

  handleMore = e => {
    this.setState({ anchorEl: e.currentTarget });
  };
  handleCloseMore = () => {
    this.setState({ anchorEl: null });
  };
  handleDisconnect = id => {
    this.handleCloseMore();
    this.openDeclineConfirmation(id, -1);
  };

  render() {
    const {
      schoolState,
      schoolConnectClass,
      setModalConnectClass,
      setModalCreateSchoolClass,
      schoolCreateClass,
      closeModalConnectClass,
      changeLinkStatus,
      closeSuccessModal,
      searchClass,
      setFilter
    } = this.props;
    return (
      <div>
        <Container>
          <Breadcrumbs separator={<NavigateNextIcon fontSize='small' />} aria-label='breadcrumb'>
            <MaterialLink color='inherit' href={`${process.env.PUBLIC_URL}/`}>
              Beranda
            </MaterialLink>
            <Typography color='textPrimary'>{schoolState.data.name}</Typography>
          </Breadcrumbs>
          <section className='school-member-page section-b-space'>
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
                              Kode sekolah: <strong>{schoolState.data.code}</strong>
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
                <Grid item container direction='row' spacing={2} lg={8}>
                  <Grid item>
                    {schoolState.userHasAuthority && (
                      <Button
                        variant='contained'
                        color='primary'
                        startIcon={<ShareOutlinedIcon />}
                        onClick={() => setModalConnectClass('show', true)}
                      >
                        Sambungkan kelas
                      </Button>
                    )}
                  </Grid>
                  <Grid item>
                    {schoolState.userHasAuthority && (
                      <Button
                        variant='contained'
                        color='primary'
                        startIcon={<AddIcon />}
                        onClick={() => setModalCreateSchoolClass('show', true)}
                      >
                        Buat kelas
                      </Button>
                    )}
                  </Grid>
                </Grid>
                <Grid item>
                  <Paper variant='outlined' style={{ paddingLeft: '10px' }}>
                    <InputBase
                      placeholder='Cari kelas...'
                      onChange={e => setFilter(e.target.value)}
                      value={schoolState.filter}
                    />
                    <IconButton type='submit' onClick={searchClass} aria-label='search'>
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                </Grid>
              </Grid>
              <Grid item container xs={12} lg={8}>
                <TableContainer component={Paper}>
                  <Table aria-label='simple table' size='small'>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <strong>Status</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Nama</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Pemilik</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Jumlah peserta</strong>
                        </TableCell>
                        {schoolState.userHasAuthority && <TableCell></TableCell>}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {schoolState.filteredClassList.map(row => (
                        <TableRow key={row.id}>
                          <TableCell component='th' scope='row'>
                            {row.link_status == 0 ? (
                              <span style={{ color: '#3475E0', fontWeight: 'bold' }}>Terhubung</span>
                            ) : row.link_status == 1 ? (
                              <span style={{ color: '#F4A31E', fontWeight: 'bold' }}>Menunggu persetujuan</span>
                            ) : (
                              <span style={{ color: '#15A3B8', fontWeight: 'bold' }}>Menunggu persetujuan pemilik kelas</span>
                            )}
                          </TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.ownerName}</TableCell>
                          <TableCell>{row.countMembers}</TableCell>
                          {schoolState.userHasAuthority && (
                            <TableCell align='right'>
                              {row.link_status === 1 ? (
                                <Grid container>
                                  <div style={{ marginRight: '3px' }}>
                                    <IconButton color='inherit' onClick={() => changeLinkStatus(row.id, 1)}>
                                      <CheckSharpIcon />
                                    </IconButton>
                                  </div>
                                  <div>
                                    <IconButton color='inherit' onClick={() => this.openDeclineConfirmation(row.id, 0)}>
                                      <CloseIcon />
                                    </IconButton>
                                  </div>
                                </Grid>
                              ) : (
                                <div>
                                  <IconButton
                                    aria-label='more'
                                    aria-controls='menu'
                                    aria-haspopup='true'
                                    color='inherit'
                                    onClick={this.handleMore}
                                  >
                                    <MoreVertIcon />
                                  </IconButton>
                                  <Menu
                                    id='menu'
                                    anchorEl={this.state.anchorEl}
                                    keepMounted
                                    open={Boolean(this.state.anchorEl)}
                                    onClose={this.handleCloseMore}
                                  >
                                    <MenuItem onClick={() => this.handleDisconnect(row.id)}>Putuskan</MenuItem>
                                  </Menu>
                                </div>
                              )}
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>

            {/* Modal connect class */}
            <Modal isOpen={schoolState.connectClassModal.show} centered>
              <ModalHeader toggle={closeModalConnectClass}>
                <strong>Sambungkan Kelas</strong>
              </ModalHeader>
              <ValidatorForm onSubmit={schoolConnectClass}>
                <ModalBody>
                  <div className='form-group'>
                    <TextValidator
                      id='code'
                      type='text'
                      label='Kode kelas'
                      InputLabelProps={{
                        shrink: true
                      }}
                      margin='dense'
                      fullWidth
                      variant='outlined'
                      onChange={e => setModalConnectClass(e.target.id, e.target.value)}
                      value={schoolState.connectClassModal.code}
                      validators={['required']}
                      errorMessages={['masukkan kode kelas']}
                    />
                  </div>

                  <Collapse in={schoolState.connectClassModal.error}>
                    <Alert
                      severity='error'
                      action={
                        <IconButton
                          aria-label='close'
                          color='inherit'
                          size='small'
                          onClick={() => setModalConnectClass('error', false)}
                        >
                          <CloseIcon fontSize='inherit' />
                        </IconButton>
                      }
                    >
                      {schoolState.connectClassModal.errormsg}
                    </Alert>
                  </Collapse>
                </ModalBody>
                <ModalFooter>
                  <div>
                    <Button color='default' variant='contained' disableElevation onClick={closeModalConnectClass}>
                      Batal
                    </Button>
                  </div>
                  <div>
                    <Button color='primary' variant='contained' disableElevation type='submit'>
                      Sambungkan
                    </Button>
                  </div>
                </ModalFooter>
              </ValidatorForm>
            </Modal>

            {/* Modal form create class */}
            <Modal isOpen={schoolState.createClassModal.show} centered>
              <ModalHeader toggle={() => setModalCreateSchoolClass('show', false)}>
                <strong>Buat Kelas</strong>
              </ModalHeader>
              <ValidatorForm onSubmit={schoolCreateClass}>
                <ModalBody>
                  <div className='form-group'>
                    <span>Nama kelas*</span>

                    <TextValidator
                      id='name'
                      type='text'
                      InputLabelProps={{
                        shrink: true
                      }}
                      placeholder='Contoh: Kelas 1B'
                      margin='dense'
                      fullWidth
                      variant='outlined'
                      onChange={e => setModalCreateSchoolClass(e.target.id, e.target.value)}
                      value={schoolState.createClassModal.name}
                      validators={['required']}
                      errorMessages={['masukkan nama kelas']}
                    />
                  </div>
                  <div className='form-group'>
                    <span>Deskripsi</span>

                    <TextField
                      id='description'
                      type='text'
                      InputLabelProps={{
                        shrink: true
                      }}
                      placeholder='Masukkan deskripsi kelas'
                      margin='dense'
                      fullWidth
                      variant='outlined'
                      onChange={e => setModalCreateSchoolClass(e.target.id, e.target.value)}
                      value={schoolState.createClassModal.description}
                    />
                  </div>

                  <Collapse in={schoolState.createClassModal.error}>
                    <Alert
                      severity='error'
                      action={
                        <IconButton
                          aria-label='close'
                          color='inherit'
                          size='small'
                          onClick={() => setModalCreateSchoolClass('error', false)}
                        >
                          <CloseIcon fontSize='inherit' />
                        </IconButton>
                      }
                    >
                      {schoolState.createClassModal.errormsg}
                    </Alert>
                  </Collapse>
                </ModalBody>
                <ModalFooter>
                  <div>
                    <Button
                      color='default'
                      variant='contained'
                      disableElevation
                      onClick={() => setModalCreateSchoolClass('show', false)}
                    >
                      Batal
                    </Button>
                  </div>
                  <div>
                    <Button color='primary' variant='contained' disableElevation type='submit'>
                      Buat
                    </Button>
                  </div>
                </ModalFooter>
              </ValidatorForm>
            </Modal>

            {/* Success modal */}
            <Modal isOpen={schoolState.successModal.show} centered>
              <ModalBody>
                <Grid container direction='col' spacing={2} justify='center' alignItems='center'>
                  <Grid item>
                    <strong>{schoolState.successModal.message}</strong>
                  </Grid>
                  <Grid container justify='center'>
                    <Grid item>
                      <Button color='primary' variant='contained' disableElevation onClick={closeSuccessModal}>
                        Oke
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </ModalBody>
            </Modal>

            {/* Decline join school confirmation dialog */}
            <Modal isOpen={this.state.declineConfirmation} centered>
              <ModalBody>
                <Grid container direction='col' spacing={1} justify='center' alignItems='center'>
                  <Grid item>Apakah kamu yakin ingin memutuskankan sambungan kelas?</Grid>
                  <Grid item container justify='space-around'>
                    <Grid item>
                      <Button color='default' variant='contained' disableElevation onClick={this.closeDeclineConfirmation}>
                        Batal
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button color='primary' variant='contained' disableElevation onClick={this.handleDecline}>
                        Ya, sudah yakin
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </ModalBody>
            </Modal>
          </section>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  schoolState: state.school
});
export default connect(mapStateToProps, {
  getSchoolClass,
  schoolConnectClass,
  setModalConnectClass,
  setModalCreateSchoolClass,
  schoolCreateClass,
  getSchool,
  closeModalConnectClass,
  changeLinkStatus,
  closeSuccessModal,
  searchClass,
  setFilter
})(SchoolClass);