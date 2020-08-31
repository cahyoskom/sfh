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
import { onChangeStateClassInfo, getDataClassInfo, getTaskList } from '../../actions';

class TaskList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    const { getDataClassInfo, onChangeStateClassInfo, getTaskList } = this.props;
    onChangeStateClassInfo('id', this.props.match.params.id);
    getDataClassInfo();
    getTaskList();
  };

  render() {
    const { taskState, classState } = this.props;
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
                          <strong>{classState.classInfo.name}</strong>
                        </div>
                        <div>
                          <strong>{classState.classInfo.owner.name}</strong>
                        </div>
                        <div>{classState.classInfo.description}</div>
                        <div>
                          Kode kelas: <strong>{classState.classInfo.code}</strong>
                        </div>
                        {taskState.totalStudents !== -1 && <div>Jumlah peserta: {taskState.totalStudents}</div>}
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
            <Grid item xs={12} lg={10}>
              {classState.classInfo.hasAuthority && <TaskListOwner />}
            </Grid>
          </Grid>
        </section>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  taskState: state.task,
  classState: state.class
});
export default connect(mapStateToProps, { onChangeStateClassInfo, getDataClassInfo, getTaskList })(TaskList);
