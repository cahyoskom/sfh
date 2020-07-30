import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';
import BlockUi from 'react-block-ui';
import { Link, NavLink } from 'react-router-dom';
import { Button, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Label, Input, InputGroup } from 'reactstrap';
import 'react-widgets/dist/css/react-widgets.css';
import DateTimePicker from '../common/DatePicker';
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
import Breadcrumb from '../common/breadcrumb';

class TaskGuruPerId extends Component {
  constructor(props) {
    super(props);
    //console.log('vrovs',props)
    this.state = {
      columns: [
        {
          name: 'status',
          label: 'status',
          options: {
            display: false
          }
        },
        {
          name: 'student_no',
          label: 'No'
        },
        {
          name: 'student_name',
          label: 'Nama Siswa / Email'
        },
        {
          name: 'task_progress',
          label: 'Task Progress',
          options: {
            filter: false,
            sort: false,
            customBodyRender: (value, tableMeta, updateValue) => {
              if (tableMeta.rowData[0] == 4) {
                return (
                  <div>
                    <p style={{ color: 'yellow' }}>
                      <span style={{ backgroundColor: 'green' }}>Sudah Submit</span>
                    </p>
                  </div>
                );
              } else {
                return (
                  <div>
                    <p style={{ color: 'red' }}>
                      <span style={{ backgroundColor: 'yellow' }}>Belum Submit</span>
                    </p>
                  </div>
                );
              }
            }
          }
        },
        {
          name: 'submitted_date',
          label: 'Last Submit',
          options: {
            customBodyRender: value => {
              if (value != null || value != undefined) {
                return <div>{moment(value).format('dddd YYYY-MM-DD').toString()}</div>;
              } else {
                return <div>{''}</div>;
              }
            }
          }
        },
        {
          name: 'task_collection_id',
          label: 'Upload Folder',
          options: {
            filter: false,
            sort: false,
            print: false,
            download: false,
            customBodyRender: (value, tableMeta, updateValue) => {
              if (tableMeta.rowData[0] == 4) {
                return (
                  <div>
                    <Button color='primary' size='sm' onClick={() => this.openModal(value)}>
                      OPEN
                    </Button>
                  </div>
                );
              } else {
                return (
                  <div>
                    <Button disabled color='primary' size='sm'>
                      OPEN
                    </Button>
                  </div>
                );
              }
            }
          }
        }
      ],
      options: {
        filterType: 'checkbox'
      },
      isDetail: false
    };
    this.modalToggle = this.modalToggle.bind(this);
    this.onClickSignOut = this.onClickSignOut.bind(this);
    this.openModal = this.openModal.bind(this);
    this.downloadFile = this.downloadFile.bind(this);
    this.downloadFiles = this.downloadFiles.bind(this);
  }

  componentDidMount() {
    let { setUrlPath, guruGetTaskCollectionList } = this.props;
    setUrlPath(this.props.match.params.id);
    guruGetTaskCollectionList();
    // console.log("url",this.props.match.params.id);
  }

  modalToggle() {
    const { taskGuruState, setModal } = this.props;
    setModal('show', !taskGuruState.modal.show);
  }

  openModal(value) {
    let { guruGetUploadedCollectionList, setStateModalFormUploadedCollection, setModal, taskGuruState } = this.props;
    console.log('openmodal', value);
    setStateModalFormUploadedCollection('task_collection_id', value);
    guruGetUploadedCollectionList();
    console.log('fgfg', taskGuruState);
    setModal('type', 'download');
    setModal('title', 'Uploaded Files');
    setModal('buttonText', 'Download All');
    setModal('show', true);
    this.setState(prevState => ({
      ...prevState,
      isDetail: true
    }));
  }

  downloadFiles() {
    const { taskGuruState, setStateModalFormUploadedCollection, guruDownloadCollection } = this.props;
    if (taskGuruState.dataUploadedCollection.files != null || taskGuruState.dataUploadedCollection.files != undefined) {
      for (let i = 0; i < taskGuruState.dataUploadedCollection.files.length; i++) {
        setStateModalFormUploadedCollection(
          'task_collection_file_id',
          taskGuruState.dataUploadedCollection.files[i].task_collection_file_id
        );
        setStateModalFormUploadedCollection('filename', taskGuruState.dataUploadedCollection.files[i].filename);
        setStateModalFormUploadedCollection('mime_type', taskGuruState.dataUploadedCollection.files[i].mime_type);
        guruDownloadCollection();
      }
    }
  }

  downloadFile(task_collection_file_id, filename, mime_type) {
    const { guruDownloadCollection, setStateModalFormUploadedCollection } = this.props;
    setStateModalFormUploadedCollection('task_collection_file_id', task_collection_file_id);
    setStateModalFormUploadedCollection('filename', filename);
    setStateModalFormUploadedCollection('mime_type', mime_type);
    guruDownloadCollection();
  }

  onClickSignOut() {
    localStorage.clear();
    window.location.href = process.env.PUBLIC_URL;
  }

  renderView() {
    let { taskGuruState, setStateModalForm } = this.props;

    const options = {
      responsive: 'scroll',
      filter: false,
      search: false,
      download: false,
      print: false,
      viewColumns: false,
      selectableRows: 'none'
    };

    //menampilkan file/s untuk di download(modal download)
    let listOfFile = [];
    if (taskGuruState.dataUploadedCollection.files != null || taskGuruState.dataUploadedCollection.files != undefined) {
      for (let i = 0; i < taskGuruState.dataUploadedCollection.files.length; i++) {
        listOfFile.push(
          <InputGroup style={{ marginBottom: '5px' }}>
            <Input
              type='text'
              className='form-control'
              value={taskGuruState.dataUploadedCollection.files[i].filename}
              readOnly
            />
            <Button
              inline={true}
              color='primary'
              size='xs'
              onClick={() => {
                this.downloadFile(
                  taskGuruState.dataUploadedCollection.files[i].task_collection_file_id,
                  taskGuruState.dataUploadedCollection.files[i].filename,
                  taskGuruState.dataUploadedCollection.files[i].mime_type
                );
              }}
            >
              Download
            </Button>
          </InputGroup>
        );
      }
    }

    return (
      <div>
        <Breadcrumb title={<Link to={`${process.env.PUBLIC_URL}/taskguru/`}>Back</Link>} />
        <section className='login-page section-b-space'>
          <div className='container'>
            <h3 className='text-left'>
              <i className='mdi mdi-table-edit' />
              Task List Guru
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
                    <p>{moment(taskGuruState.now).format('dddd YYYY-MM-DD').toString()}</p>
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
                  <MuiThemeProvider>
                    <MUIDataTable
                      title={
                        <div>
                          Kelas <span style={{ backgroundColor: 'green' }}>SD 1</span>
                        </div>
                      }
                      data={taskGuruState.dataCollection}
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

          <Modal isOpen={taskGuruState.modal.show} fade={false} backdrop={'static'} toggle={this.modalToggle}>
            <ModalHeader toggle={this.modalToggle}>{taskGuruState.modal.title}</ModalHeader>
            <ModalBody>
              {this.state.isDetail && (
                <Formik
                  enableReinitialize={true}
                  initialValues={taskGuruState.taskDetail}
                  // validationSchema={add_editSchema}
                  onSubmit={values => {
                    // same shape as initial values
                    // this.uploadTask()
                  }}
                >
                  {({ errors, touched, setFieldValue }) => (
                    <div>
                      <Form>
                        <ModalBody>
                          <Row form={true}>
                            <Col md={12}>
                              <div>{listOfFile}</div>
                            </Col>
                          </Row>
                        </ModalBody>
                        <ModalFooter>
                          {/* <Button color="secondary" onClick={this.modalToggle} style={{color: "#fff"}}>Cancel</Button>
                                        <Button color="primary" type="submit">Add</Button> */}
                        </ModalFooter>
                      </Form>
                    </div>
                  )}
                </Formik>
              )}
            </ModalBody>
            <ModalFooter>
              <Button size='sm' color='secondary' onClick={this.modalToggle}>
                Cancel
              </Button>{' '}
              {taskGuruState.modal.type == 'download' && (
                <Button size='sm' color='primary' onClick={() => this.downloadFiles()}>
                  {taskGuruState.modal.buttonText}
                </Button>
              )}
            </ModalFooter>
          </Modal>
        </section>
      </div>
    );
  }

  render() {
    //console.log('block render')
    let { taskGuruState } = this.props;
    return (
      <BlockUi
        tag='div'
        blocking={taskGuruState.loader}
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
  taskGuruState: state.taskGuru,
  accountState: state.account
});

export default connect(mapStateToProps, { ...actions })(withTranslate(TaskGuruPerId));
