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
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MUIDataTable from 'mui-datatables';
import { setFormAddTask } from '../../actions';

class TaskListOwner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null
    };
  }

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

  render() {
    const columns = [
      {
        name: 'Status',
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: 'Tugas',
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: 'Terkumpul',
        options: {
          filter: false,
          sort: false
        }
      },
      {
        name: 'Aksi',
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <Grid container spacing={2}>
                <Grid item>
                  <Button variant='contained' disableElevation color='primary' size='sm' onClick=''>
                    Detail
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant='contained' disableElevation style={{ background: '#15A3B8', color: 'white' }} size='sm'>
                    Edit
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant='contained' disableElevation color='secondary' size='sm'>
                    Delete
                  </Button>
                </Grid>
              </Grid>
            );
          }
        }
      }
    ];

    const data = [
      ['Joe James', 'Test Corp', 'Yonkers', 'NY'],
      ['John Walsh', 'Test Corp', 'Hartford', 'CT'],
      ['Bob Herm', 'Test Corp', 'Tampa', 'FL'],
      ['James Houston', 'Test Corp', 'Dallas', 'TX']
    ];

    const options = {
      download: false,
      filterType: 'textField',
      selectableRows: false,
      viewColumns: false,
      print: false
    };
    const { taskState, setFormAddTask } = this.props;
    return (
      <span>
        <Paper variant='outlined' width={1}>
          <Box p={2}>
            <div style={{ marginBottom: '10px' }}>
              <Button variant='contained' color='primary' startIcon={<AddIcon />} onClick=''>
                Tambah tugas
              </Button>
            </div>
            <MUIDataTable data={data} columns={columns} options={options} />{' '}
          </Box>
        </Paper>

        {/* Modal form create class */}
        <Modal isOpen='true' centered>
          <ModalHeader toggle={() => setFormAddTask('show', false)}>
            <strong>Tambah Tugas</strong>
          </ModalHeader>
          <ValidatorForm onSubmit=''>
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
                  onChange={e => setFormAddTask(e.target.id, e.target.value)}
                  style={{
                    width: '100%',
                    borderRadius: '10px',
                    border: '1px solid #A8A8A8',
                    height: '1.1876em',
                    padding: '18.5px 14px'
                  }}
                />
                <datalist id='subjectList'>
                  <option>Volvo</option>
                  <option>Saab</option>
                  <option>Mercedes</option>
                  <option>Audi</option>
                </datalist>
              </div>
              <Grid container justify='space-around'>
                <Grid item>
                  <div className='form-group'>
                    <TextField
                      id='startTime'
                      label='Periode mulai'
                      type='datetime-local'
                      value={taskState.formAddTask.startDate}
                      onChange={e => setFormAddTask(e.target.id, e.target.value)}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </div>
                </Grid>
                <Grid item>
                  <div className='form-group'>
                    <TextField
                      id='startTime'
                      label='Periode berakhir'
                      type='datetime-local'
                      value={taskState.formAddTask.EndDate}
                      onChange={e => setFormAddTask(e.target.id, e.target.value)}
                      InputLabelProps={{
                        shrink: true
                      }}
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
                    <input type='file' id='upload-file' style={{ display: 'none' }} multiple name='file' />
                  </span>
                  <MenuItem onClick={this.openModalLink}>Tautan</MenuItem>
                </Menu>
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
          <ValidatorForm onSubmit={''}>
            <ModalBody>
              <div className='form-group'>
                <TextField
                  id='link'
                  type='text'
                  label='Tautan tugas'
                  InputLabelProps={{
                    shrink: true
                  }}
                  margin='dense'
                  fullWidth
                  variant='outlined'
                  onChange={'e => setModalConnectClass(e.target.id, e.target.value)'}
                  value={'schoolState.connectClassModal.code'}
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
      </span>
    );
  }
}

const mapStateToProps = state => ({
  taskState: state.task
});
export default connect(mapStateToProps, { setFormAddTask })(TaskListOwner);
