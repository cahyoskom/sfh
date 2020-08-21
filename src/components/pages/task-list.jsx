import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskListOwner from './task-list-owner';
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
  Typography,
  FormControl,
  Select,
  InputLabel
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
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
import MUIDataTable from 'mui-datatables';
import { onChangeStateClassInfo, getDataClassInfo, setFormAddTask, getTaskList } from '../../actions';
import { datastore_v1 } from 'googleapis';
import { datastore } from 'googleapis/build/src/apis/datastore';

class TaskList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    const { getDataClassInfo, onChangeStateClassInfo, getTaskList } = this.props;
    // onChangeStateClassInfo('id', this.props.match.params.id);
    // getDataClassInfo();
    // getTaskList(this.props.match.params.id);
  };

  render() {
    const { taskState, setFormAddTask } = this.props;
    return (
      <Container>
        <section className='school-member-page section-b-space'>
          <Grid container directions='col' spacing={2} justify='center' alignItems='center'>
            <Grid item xs={12} lg={10}>
              <Paper variant='outlined' width={1}>
                <Box p={2}>
                  <Grid item container direction='row' justify='space-between' alignItems='center'>
                    <Grid item lg={8}>
                      <div>
                        <div style={{ fontSize: '36px', color: '#0170E3' }}>
                          <strong>Kelas 1 B</strong>
                        </div>
                        <div>
                          <strong>Jane Doe</strong>
                        </div>
                        <div>Tahun ajaran 2020/2021</div>
                        <div>Kode kelas: abcdes</div>
                        <div>jumlah peserta: 88</div>
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
            <Grid item xs={12} lg={10}>
              <Paper variant='outlined' width={1}>
                <Box p={2}>
                  <div style={{ marginBottom: '10px' }}>
                    <Button variant='contained' color='primary' startIcon={<AddIcon />} onClick=''>
                      Tambah tugas
                    </Button>
                  </div>
                  <TaskListOwner />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </section>

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
                <FormControl variant='outlined' fullWidth>
                  <InputLabel id='demo-simple-select-outlined-label'>Mata pelajaran</InputLabel>
                  <Select
                    labelId='demo-simple-select-outlined-label'
                    id='demo-simple-select-outlined'
                    value={taskState.formAddTask.subject}
                    margin='dense'
                    onChange={e => setFormAddTask(e.target.id, e.target.value)}
                    label='Mata pelajaran'
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className='form-group'>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify='space-around'>
                    <KeyboardDatePicker
                      disableToolbar
                      variant='inline'
                      format='MM/dd/yyyy'
                      margin='normal'
                      id='startDate'
                      label='Periode mulai'
                      value={taskState.formAddTask.startDate}
                      onChange={e => setFormAddTask(e.target.id, e.target.value)}
                      KeyboardButtonProps={{
                        'aria-label': 'change date'
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
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
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  taskState: state.task,
  classState: state.class
});
export default connect(mapStateToProps, { onChangeStateClassInfo, getDataClassInfo, setFormAddTask, getTaskList })(TaskList);
