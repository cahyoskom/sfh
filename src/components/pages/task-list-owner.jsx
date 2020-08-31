import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Paper,
  Button,
  Box,
  Collapse,
  TextField,
  IconButton,
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
  Typography,
  TablePagination,
  InputAdornment,
  OutlinedInput,
  InputLabel
} from '@material-ui/core';
import * as moment from 'moment';
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
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MUIDataTable from 'mui-datatables';
import {
  setFormAddTask,
  deleteAddTaskFile,
  addTaskLink,
  deleteAddTaskLink,
  addNewTask,
  getSubjectList,
  deleteTask,
  setTaskFilter,
  getTaskList,
  addNewTaskFile
} from '../../actions';

class TaskListOwner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,

      page: 0,
      rowsPerPage: 10,

      deleteConfirmation: false,
      targetDeleteId: null
    };
  }

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = event => {
    this.setState({
      rowsPerPage: event.target.value,
      page: 0
    });
  };

  closeMenu = () => {
    this.setState({
      anchorEl: null
    });
  };

  openMenu = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  openModalLink = () => {
    this.setState({
      anchorEl: null
    });
    this.props.setFormAddTask('modalLink', true);
  };

  checkStatus = obj => {
    var now = moment();
    var start = moment(obj.start_date);
    var end = moment(obj.finish_date);
    if (start > now) {
      return 1;
    } else {
      if (end > now) {
        return 0;
      }
      return -1;
    }
  };

  handleOpenAddTask = () => {
    this.props.getSubjectList();
    this.props.setFormAddTask('show', true);
  };

  handleUploadFile = e => {
    const uploaded = e.target.files;
    for (let i = 0; i < uploaded.length; i++) {
      this.props.addNewTaskFile(uploaded[i]);
    }
    this.closeMenu();
  };

  openDeleteConfirmation = id => {
    this.setState({ targetDeleteId: id, deleteConfirmation: true });
  };
  closeDeleteConfirmation = () => {
    this.setState({ deleteConfirmation: false });
  };
  handleDelete = () => {
    this.props.deleteTask(this.state.targetDeleteId);
    this.closeDeleteConfirmation();
  };

  render() {
    const {
      taskState,
      setFormAddTask,
      deleteAddTaskFile,
      addTaskLink,
      deleteAddTaskLink,
      addNewTask,
      setTaskFilter,
      getTaskList
    } = this.props;

    let taskListFiltered = taskState.taskList;
    if (taskState.filter.status !== '') {
      taskListFiltered = taskState.taskList.filter(task => task.taskStatus == taskState.filter.status);
    }
    return (
      <span>
        <Paper variant='outlined' width={1}>
          <Box p={2}>
            <Grid container justify='space-between' alignItems='flex-end' style={{ marginBottom: '10px' }}>
              <Grid item>
                <Button variant='contained' color='primary' startIcon={<AddIcon />} onClick={this.handleOpenAddTask}>
                  Tambah tugas
                </Button>
              </Grid>
              <Grid item lg={2}>
                <InputLabel htmlFor='status'>Status</InputLabel>
                <TextField
                  style={{ marginTop: '0', marginBottom: '0' }}
                  id='status'
                  select
                  fullWidth
                  margin='dense'
                  InputLabelProps={{
                    shrink: true
                  }}
                  variant='outlined'
                  value={taskState.filter.status}
                  onChange={e => setTaskFilter('status', e.target.value)}
                >
                  <MenuItem value='0'>Sedang berjalan</MenuItem>
                  <MenuItem value='1'>Akan datang</MenuItem>
                  <MenuItem value='-1'>Sudah lewat</MenuItem>
                  <MenuItem value=''>Semua</MenuItem>
                </TextField>
              </Grid>
              <Grid item>
                <InputLabel htmlFor='startDate'>Periode mulai</InputLabel>
                <OutlinedInput
                  id='startDate'
                  type='date'
                  margin='dense'
                  InputLabelProps={{
                    shrink: true
                  }}
                  value={taskState.filter.startDate}
                  onChange={e => setTaskFilter(e.target.id, e.target.value)}
                />
              </Grid>
              <Grid item>
                <InputLabel htmlFor='endDate'>Periode berakhir</InputLabel>
                <OutlinedInput
                  id='endDate'
                  type='date'
                  margin='dense'
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={e => setTaskFilter(e.target.id, e.target.value)}
                />
              </Grid>
              <Grid item lg={2}>
                <InputLabel htmlFor='search'>Cari</InputLabel>
                <OutlinedInput
                  id='search'
                  type='text'
                  InputLabelProps={{
                    shrink: true
                  }}
                  margin='dense'
                  placeholder='Cari tugas...'
                  value={taskState.filter.search}
                  onChange={e => setTaskFilter(e.target.id, e.target.value)}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton aria-label='search' onClick={getTaskList} edge='end'>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </Grid>
            </Grid>
            {/* <MUIDataTable data={data} columns={columns} options={options} />{' '} */}
            <Paper>
              <TableContainer>
                <Table aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <strong>Status</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Tugas</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Terkumpul</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Aksi</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {taskListFiltered
                      .slice(
                        this.state.page * this.state.rowsPerPage,
                        this.state.page * this.state.rowsPerPage + this.state.rowsPerPage
                      )
                      .map(row => (
                        <TableRow key={row.id}>
                          <TableCell component='th' scope='row'>
                            {row.taskStatus == 1 ? (
                              <span style={{ color: '#3475E0' }}>Akan datang</span>
                            ) : row.taskStatus == 0 ? (
                              <span style={{ color: '#FB3C3C' }}>Sedang berjalan</span>
                            ) : (
                              <span style={{ color: '#C4C4C4' }}>Sudah lewat</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <span>
                              <div style={{ fontSize: '17px' }}>
                                <strong>{row.title}</strong>
                              </div>
                              <div>Diposting: {row.publish_date}</div>
                              <div>Tenggat waktu: {row.finish_date}</div>
                              <div style={{ fontSize: '17px' }}>{row.notes}</div>
                            </span>
                          </TableCell>
                          <TableCell>{row.countSubmitted}</TableCell>
                          <TableCell>
                            <Grid container spacing={2}>
                              <Grid item>
                                <Button variant='contained' disableElevation color='primary' size='sm' onClick=''>
                                  Detail
                                </Button>
                              </Grid>
                              <Grid item>
                                <Button
                                  variant='contained'
                                  disableElevation
                                  style={{ background: '#15A3B8', color: 'white' }}
                                  size='sm'
                                >
                                  Edit
                                </Button>
                              </Grid>
                              <Grid item>
                                <Button
                                  variant='contained'
                                  disableElevation
                                  color='secondary'
                                  size='sm'
                                  onClick={() => this.openDeleteConfirmation(row.id)}
                                >
                                  Hapus
                                </Button>
                              </Grid>
                            </Grid>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 20, 100]}
                component='div'
                count={taskListFiltered.length}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
            </Paper>
          </Box>
        </Paper>

        {/* Modal form create task */}
        <Modal isOpen={taskState.formAddTask.show} centered>
          <ModalHeader toggle={() => setFormAddTask('show', false)}>
            <strong>Tambah Tugas</strong>
          </ModalHeader>
          <ValidatorForm onSubmit={addNewTask}>
            <ModalBody>
              <div className='form-group'>
                <TextValidator
                  id='name'
                  label='Nama tugas*'
                  type='text'
                  InputLabelProps={{
                    shrink: true
                  }}
                  margin='dense'
                  fullWidth
                  variant='outlined'
                  onChange={e => setFormAddTask(e.target.id, e.target.value)}
                  value={taskState.formAddTask.name}
                  validators={['required']}
                  errorMessages={['masukkan nama tugas']}
                />
              </div>
              <div className='form-group'>
                <TextField
                  id='description'
                  type='text'
                  label='Deskripsi tugas'
                  InputLabelProps={{
                    shrink: true
                  }}
                  margin='dense'
                  fullWidth
                  variant='outlined'
                  onChange={e => setFormAddTask(e.target.id, e.target.value)}
                  value={taskState.formAddTask.description}
                />
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  id='subject'
                  list='subjectList'
                  placeholder='Mata pelajaran'
                  value={taskState.formAddTask.subject}
                  onChange={e => setFormAddTask('subject', e.target.value)}
                  style={{
                    width: '100%',
                    borderRadius: '10px',
                    border: '1px solid #A8A8A8',
                    height: '1.1876em',
                    padding: '18.5px 14px'
                  }}
                />
                <datalist id='subjectList'>
                  {taskState.subjectList.map(obj => (
                    <option>{obj.name}</option>
                  ))}
                </datalist>
              </div>
              <Grid container justify='space-around'>
                <Grid item>
                  <div className='form-group'>
                    <TextValidator
                      id='startDate'
                      label='Periode mulai'
                      type='datetime-local'
                      variant='outlined'
                      margin='dense'
                      InputLabelProps={{
                        shrink: true
                      }}
                      value={taskState.formAddTask.startDate}
                      onChange={e => setFormAddTask(e.target.id, e.target.value)}
                      validators={['required']}
                      errorMessages={['masukkan periode mulai']}
                    />
                  </div>
                </Grid>
                <Grid item>
                  <div className='form-group'>
                    <TextValidator
                      id='endDate'
                      label='Periode berakhir'
                      type='datetime-local'
                      variant='outlined'
                      margin='dense'
                      InputLabelProps={{
                        shrink: true
                      }}
                      value={taskState.formAddTask.endDate}
                      onChange={e => setFormAddTask(e.target.id, e.target.value)}
                      validators={['required']}
                      errorMessages={['masukkan periode berakhir']}
                    />
                  </div>
                </Grid>
              </Grid>
              <div className='form-group'>
                <Button
                  variant='contained'
                  style={{ background: '#4AA0B5', color: 'white' }}
                  component='span'
                  startIcon={<CloudUploadIcon />}
                  onClick={this.openMenu}
                >
                  Tambah lampiran
                </Button>
                <Menu
                  anchorEl={this.state.anchorEl}
                  id='menu-list-grow'
                  keepMounted
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.closeMenu}
                >
                  <span>
                    <label htmlFor='upload-file'>
                      <MenuItem>File </MenuItem>
                    </label>
                    <input
                      type='file'
                      id='upload-file'
                      style={{ display: 'none' }}
                      multiple
                      name='file'
                      onChange={this.handleUploadFile}
                    />
                  </span>
                  <MenuItem onClick={this.openModalLink}>Tautan</MenuItem>
                </Menu>
              </div>
              <div className='form-group'>
                {taskState.formAddTask.files.map(file => (
                  <Grid container alignItems='center'>
                    <span>{file.name}</span>
                    <IconButton color='inherit' onClick={() => deleteAddTaskFile(file.name)}>
                      <CloseIcon />
                    </IconButton>
                  </Grid>
                ))}
                {taskState.formAddTask.link.map((link, index) => (
                  <Grid container alignItems='center'>
                    <span>{link}</span>
                    <IconButton color='inherit' onClick={() => deleteAddTaskLink(index)}>
                      <CloseIcon />
                    </IconButton>
                  </Grid>
                ))}
              </div>

              <Collapse in={taskState.formAddTask.error}>
                <Alert
                  severity='error'
                  action={
                    <IconButton aria-label='close' color='inherit' size='small' onClick={() => setFormAddTask('error', false)}>
                      <CloseIcon fontSize='inherit' />
                    </IconButton>
                  }
                >
                  {taskState.formAddTask.errormsg}
                </Alert>
              </Collapse>
            </ModalBody>
            <ModalFooter>
              <div>
                <Button color='default' variant='contained' disableElevation onClick={() => setFormAddTask('show', false)}>
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

        {/* Modal upload link */}
        <Modal isOpen={taskState.formAddTask.modalLink} centered>
          <ModalHeader toggle={() => setFormAddTask('modalLink', false)}>
            <strong>Tambah tautan</strong>
          </ModalHeader>
          <ValidatorForm onSubmit={addTaskLink}>
            <ModalBody>
              <div className='form-group'>
                <TextField
                  id='linkState'
                  type='text'
                  label='Tautan tugas'
                  InputLabelProps={{
                    shrink: true
                  }}
                  margin='dense'
                  fullWidth
                  variant='outlined'
                  onChange={e => setFormAddTask(e.target.id, e.target.value)}
                  value={taskState.formAddTask.linkState}
                  validators={['required']}
                  errorMessages={['masukkan periode berakhir']}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <div>
                <Button color='default' variant='contained' disableElevation onClick={() => setFormAddTask('modalLink', false)}>
                  Batal
                </Button>
              </div>
              <div>
                <Button color='primary' variant='contained' disableElevation type='submit'>
                  Simpan
                </Button>
              </div>
            </ModalFooter>
          </ValidatorForm>
        </Modal>

        {/* Delete Task confirmation dialog */}
        <Modal isOpen={this.state.deleteConfirmation} centered>
          <ModalBody>
            <Grid container direction='col' spacing={1} justify='center' alignItems='center'>
              <Grid item>Apakah kamu yakin ingin menghapus tugas?</Grid>
              <Grid item container justify='space-around'>
                <Grid item>
                  <Button color='default' variant='contained' disableElevation onClick={this.closeDeleteConfirmation}>
                    Batal
                  </Button>
                </Grid>
                <Grid item>
                  <Button color='primary' variant='contained' disableElevation onClick={this.handleDelete}>
                    Ya, sudah yakin
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </ModalBody>
        </Modal>
      </span>
    );
  }
}

const mapStateToProps = state => ({
  taskState: state.task
});
export default connect(mapStateToProps, {
  setFormAddTask,
  deleteAddTaskFile,
  addTaskLink,
  deleteAddTaskLink,
  addNewTask,
  getSubjectList,
  deleteTask,
  setTaskFilter,
  getTaskList,
  addNewTaskFile
})(TaskListOwner);
