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
import MUIDataTable from 'mui-datatables';
import { onChangeStateClassInfo, getDataClassInfo } from '../../actions';

class TaskListOwner extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

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
    return <MUIDataTable data={data} columns={columns} options={options} />;
  }
}

const mapStateToProps = state => ({
  taskState: state.task
});
export default connect(mapStateToProps, {})(TaskListOwner);
