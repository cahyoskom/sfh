import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';
import BlockUi from 'react-block-ui';
import { Link, NavLink } from 'react-router-dom';
import { Button, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Label, Input } from 'reactstrap';
import CustomFooterGuru from '../common/customFooterGuru';
// import Select from "../common/Select";
import 'react-widgets/dist/css/react-widgets.css';
import DateTimePicker from '../common/DatePicker';
// import Input from "../common/Input";
import 'react-datepicker/dist/react-datepicker.css';
import './tasksiswa.css';
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import * as actions from '../../actions';
import moment from 'moment';
import * as messageBox from '../common/message-box';
import SimpleReactValidator from 'simple-react-validator';
import { Formik, Form, Field } from 'formik';
import Select from 'react-select';
// import Breadcrumb from "../common/breadcrumb";

class TaskKepsek extends Component {
  constructor(props) {
    super(props);
    //console.log('vrovs',props)
    this.state = {
      columns: [
        {
          name: 'status',
          label: 'Status',
          options: {
            display: false,
            filter: false,
            sort: false,
            print: false,
            download: false,
            customBodyRender: (value, tableMeta, updateValue) => {
              if (value) {
                return (
                  <div>
                    <i className='fa fa-check-circle' title='Submitted' style={{ color: 'green' }} />
                  </div>
                );
              } else {
                return (
                  <div>
                    <i className='fa fa-window-close' title='Belum Submit' style={{ color: 'red' }} />
                  </div>
                );
              }
            }
          }
        },
        {
          name: 'notes',
          label: 'Deskripsi',
          options: {
            filter: false,
            sort: false,
            customBodyRender: (value, tableMeta, updateValue) => {
              if (value) {
                return (
                  <div>
                    <p>{value}</p>
                    <p>
                      {tableMeta.rowData[3]}, {tableMeta.rowData[2]}
                    </p>
                  </div>
                );
              }
            }
          }
        },
        {
          name: 'class_name',
          label: 'Kelas',
          options: {
            display: false
          }
        },
        {
          name: 'subject_name',
          label: 'Mata Pelajaran',
          options: {
            display: false
          }
        },
        {
          name: 'title',
          label: 'Task',
          options: {
            display: false
          }
        },
        {
          name: 'start_date',
          label: 'Start',
          options: {
            display: false,
            customBodyRender: value => {
              if (value) {
                return (
                  <div>
                    <p>{moment(value).format('dddd YYYY-MM-DD').toString()}</p>
                  </div>
                );
              }
            }
          }
        },
        {
          name: 'finish_date',
          label: 'Finish',
          options: {
            display: false,
            customBodyRender: value => {
              if (value) {
                return (
                  <div>
                    <p>{moment(value).format('dddd YYYY-MM-DD').toString()}</p>
                  </div>
                );
              }
            }
          }
        },
        {
          name: 'task_id',
          label: 'Action',
          options: {
            filter: false,
            sort: false,
            print: false,
            download: false,
            customBodyRender: (value, tableMeta, updateValue) => {
              if (value) {
                return (
                  <div>
                    <Link to={`${process.env.PUBLIC_URL}/taskkepsek/` + value}>
                      <Button title='Detail Task' color='primary' size='sm'>
                        Detail
                      </Button>
                    </Link>
                  </div>
                );
              }
            }
          }
        },
        {
          name: 'class_id',
          label: 'class_id',
          options: {
            display: false
          }
        },
        {
          name: 'subject_id',
          label: 'subject_id',
          options: {
            display: false
          }
        }
      ],
      isAddNew: false,
      isEdit: false,
      isDetail: false,
      multiValueClass: [],
      dataSourceClass: this.props.taskKepsekState.dataSourceClass
    };
    this.getList = this.getList.bind(this);
    this.onClickSignOut = this.onClickSignOut.bind(this);
    this.validator = new SimpleReactValidator();
    this.handleMultiChange = this.handleMultiChange.bind(this);
  }

  componentDidMount() {
    let { kepsekGetClassList, kepsekGetSubjectList } = this.props;
    // document.getElementById('sticky').style.display = "none"
    this.getList();
    kepsekGetClassList();
    kepsekGetSubjectList();
  }

  getList() {
    let { kepsekGetTaskList } = this.props;
    kepsekGetTaskList();
  }

  onClickSignOut() {
    localStorage.clear();
    window.location.href = process.env.PUBLIC_URL;
  }

  handleMultiChange(option) {
    let { setStateTaskListFilter } = this.props;
    setStateTaskListFilter('class_id', option);
  }

  renderView() {
    let { taskKepsekState, setStateTaskListFilter, setStateModalForm, kepsekGetTaskList } = this.props;

    const options = {
      responsive: 'scroll',
      filter: false,
      search: false,
      download: false,
      print: false,
      viewColumns: false,
      selectableRows: false
    };

    return (
      <div>
        {/* <Breadcrumb title={<Link to={`${process.env.PUBLIC_URL}/usermanagement`}>User Management</Link>}/> */}
        <section className='login-page section-b-space'>
          <div className='container'>
            <h3 className='text-left'>
              <i className='mdi mdi-table-edit' />
              Kepala Sekolah
            </h3>
            <div className='row'>
              <div className='col-lg-3'>
                <div className='theme-card'>
                  <div className='collection-block'>
                    <Link to={`${process.env.PUBLIC_URL}/`}>
                      <img src={`${process.env.PUBLIC_URL}/assets/images/icon/tes.png`} className='img-fluid' alt='' />
                    </Link>
                  </div>
                  <div className={'text-center'}>
                    <p>{moment(taskKepsekState.now).format('dddd YYYY-MM-DD').toString()}</p>
                  </div>
                  <br />
                  <form className='theme-form'>
                    <div className='form-group'>
                      <label>Nama : {localStorage.name.replace(/"/g, '')}</label>
                      <br />
                      <label>Kelas : SD 5</label>
                      <br />
                      <label>NIP : 011232001</label>
                    </div>
                  </form>
                </div>
              </div>
              <div className='col-lg-9 right-login'>
                <div className='theme-card authentication-right'>
                  <div className='row'>
                    <div className='col-lg-4'>
                      <Label for=''>Kelas</Label>
                      <Select
                        // className={"col-md-3"}
                        style={{ position: 'absolute' }}
                        id='class'
                        name='class'
                        placeholder='Pilih Kelas'
                        // defaultValue={taskKepsekState.filter.class_id}
                        defaultValue={taskKepsekState.dataSourceClass.filter(
                          option => option.value === taskKepsekState.filter.class_id
                        )}
                        options={taskKepsekState.dataSourceClass}
                        closeMenuOnSelect={false}
                        onChange={
                          // (e) => setStateTaskListFilter("class_id", e.value)
                          this.handleMultiChange
                          // kepsekGetTaskList
                        }
                        isMulti
                      />
                      <br />
                      <Label for=''>Mata Pelajaran</Label>
                      <Select
                        // className={"col-md-3"}
                        style={{ position: 'absolute' }}
                        id='subject'
                        name='subject'
                        defaultValue={taskKepsekState.filter.subject_id}
                        options={taskKepsekState.dataSourceSubject}
                        onChange={
                          e => setStateTaskListFilter('subject_id', e.value)
                          // kepsekGetTaskList
                        }
                        multi
                      />
                    </div>
                    <div className='col-md-4'>
                      <Label for='subject'>mulai</Label>
                      <DateTimePicker
                        min={new Date()}
                        isInline={true}
                        colLabel={'col-md-1'}
                        onChange={(a, b) => {
                          setStateTaskListFilter('start_date', a);
                        }}
                        format={'DD/MMM/YYYY'}
                        value={taskKepsekState.filter.start_date}
                      />
                      <label>sampai</label>
                      <DateTimePicker
                        min={new Date()}
                        isInline={true}
                        colLabel={'col-md-1'}
                        onChange={(a, b) => {
                          setStateTaskListFilter('end_date', a);
                        }}
                        format={'DD/MMM/YYYY'}
                        value={taskKepsekState.filter.end_date}
                      />
                    </div>
                    <div className='col-md-2'>
                      <Button onClick={kepsekGetTaskList}>Filter</Button>
                    </div>
                  </div>

                  <MuiThemeProvider>
                    <MUIDataTable
                      // title={<div><Button onClick={this.submitTask}><i className="mdi mdi-plus"></i>&nbsp;Submit Selected Task</Button></div>}
                      data={taskKepsekState.data}
                      columns={this.state.columns}
                      options={options}
                    />
                  </MuiThemeProvider>
                  <br />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-3'>
                <a href='#'>Pengaturan</a> |{' '}
                <a
                  href='#'
                  onClick={() => {
                    this.onClickSignOut();
                  }}
                >
                  Logout
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  render() {
    let { taskKepsekState } = this.props;
    return (
      <BlockUi
        tag='div'
        blocking={taskKepsekState.loader}
        message={
          <span>
            <div id='preloader'>
              <div id='loader' />
            </div>
          </span>
        }
      >
        {this.renderView()}
      </BlockUi>
    );
  }
}

const mapStateToProps = state => ({
  taskKepsekState: state.taskKepsek
});

export default connect(mapStateToProps, { ...actions })(withTranslate(TaskKepsek));
