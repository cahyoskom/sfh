import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';
import BlockUi from 'react-block-ui';
import { Link, NavLink } from 'react-router-dom';
import {
  Button,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Row,
  Label,
  Input,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle
} from 'reactstrap';
import CustomFooterGuru from '../common/customFooterGuru';
// import Select from "../common/Select";
import 'react-widgets/dist/css/react-widgets.css';
import DateTimePicker from '../common/DatePicker';
// import Input from "../common/Input";
import 'react-datepicker/dist/react-datepicker.css';
import '../tasklist/tasksiswa.css';
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import * as actions from '../../actions';
import moment from 'moment';
import * as messageBox from '../common/message-box';
import SimpleReactValidator from 'simple-react-validator';
import { Formik, Form, Field } from 'formik';
import Select from 'react-select';
import Breadcrumb from '../common/breadcrumb';

class Role extends Component {
  constructor(props) {
    super(props);
    //console.log('vrovs',props)
    this.state = {
      columns: [
        {
          name: 'no',
          label: 'No'
        },
        {
          name: 'user_id',
          label: 'User',
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              let { adminSetModalFormUserRole, adminState } = props;
              return (
                <div>
                  <Select
                    // value={adminState.dataSourceUser.filter(option => option.value === value)}
                    // options={adminState.user.dataSourceUser}
                    onChange={e => adminSetModalFormUserRole('group_id', e.value)}
                  />
                </div>
              );
            }
          }
        },
        {
          name: 'group_id',
          label: 'Group',
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              let { adminSetModalFormUserRole, adminState } = props;
              return (
                <div>
                  <Select
                    // value={adminState.dataSourceGroup.filter(option => option.value === value)}
                    options={adminState.group.dataSourceGroup}
                    onChange={e => adminSetModalFormUserRole('group_id', e.value)}
                  />
                </div>
              );
            }
          }
        },
        {
          name: 'class_id',
          label: 'Class',
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              let { adminSetModalFormUserRole, adminState } = props;
              return (
                <div>
                  <Select
                    // value={adminState.dataSourceClass.filter(option => option.value === value)}
                    options={adminState.class.dataSourceClass}
                    onChange={e => adminSetModalFormUserRole('group_id', e.value)}
                  />
                </div>
              );
            }
          }
        },
        {
          name: 'subject_id',
          label: 'status',
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              let { adminSetModalFormUserRole, adminState } = props;
              return (
                <div>
                  <Select
                    // value={adminState.dataSourceSubject.filter(option => option.value === value)}
                    options={adminState.subject.dataSourceSubject}
                    onChange={e => adminSetModalFormUserRole('group_id', e.value)}
                  />
                </div>
              );
            }
          }
        },
        {
          name: 'student_id',
          label: 'Student',
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              let { adminSetModalFormUserRole, adminState } = props;
              return (
                <div>
                  <Select
                    // value={adminState.dataSourceStudent.filter(option => option.value === value)}
                    options={adminState.student.dataSourceStudent}
                    onChange={e => adminSetModalFormUserRole('group_id', e.value)}
                  />
                </div>
              );
            }
          }
        },
        {
          name: 'status',
          label: 'status',
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              if (value == 1) {
                return <div>Active</div>;
              } else {
                return <div>Not Active</div>;
              }
            }
          }
        },
        {
          name: 'user_role_id',
          label: 'Action',
          options: {
            filter: false,
            sort: false,
            print: false,
            download: false,
            // display: false,
            customBodyRender: (value, tableMeta, updateValue) => {
              return (
                <div>
                  <Button color='primary' size='sm' onClick={() => this.giveARole(value)}>
                    Give a role
                  </Button>
                  &nbsp;
                  {/* <Button color="danger" size="sm">Delete</Button>&nbsp; */}
                </div>
              );
            }
          }
        }
      ],
      isAddUser: false,
      isGiveARole: false
    };
    this.onClickSignOut = this.onClickSignOut.bind(this);
    this.validator = new SimpleReactValidator();
    this.handleMultiChange = this.handleMultiChange.bind(this);
    this.addUser = this.addUser.bind(this);
    this.giveARole = this.giveARole.bind(this);
    this.modalToggle = this.modalToggle.bind(this);
  }

  componentDidMount() {
    let {
      adminGetUserList,
      adminGetRoleList,
      adminGetDataSourceClass,
      adminGetDataSourceSubject,
      adminGetDataSourceGroup,
      adminGetDataSourceStudent
    } = this.props;
    // document.getElementById('sticky').style.display = "none"
    adminGetDataSourceClass();
    adminGetDataSourceSubject();
    adminGetDataSourceGroup();
    adminGetDataSourceStudent();
    adminGetUserList();
    adminGetRoleList();
  }

  addUser() {
    let { setModal } = this.props;
    setModal('type', 'addUser');
    setModal('title', 'Add User');
    setModal('buttonText', 'Add');
    setModal('show', true);
    this.setState(prevState => ({
      ...prevState,
      isAddUser: true,
      isGiveARole: false
    }));
  }

  giveARole(value) {
    let { setModal, adminSetModalFormUserRole } = this.props;
    adminSetModalFormUserRole('user_id', value);
    setModal('type', 'giveRole');
    setModal('title', 'Give A Role');
    setModal('buttonText', 'Submit');
    setModal('show', true);
    this.setState(prevState => ({
      ...prevState,
      isAddUser: false,
      isGiveARole: true
    }));
  }

  save() {
    const { adminCreateUser } = this.props;
    // if (this.validator.allValid()) {
    adminCreateUser();
    // } else {
    //   this.validator.showMessages();
    //   this.formArea.current.forceUpdate();
    // }
  }

  saveRole() {
    const { adminSignUserRole } = this.props;
    // if (this.validator.allValid()) {
    adminSignUserRole();
    // } else {
    //   this.validator.showMessages();
    //   this.formArea.current.forceUpdate();
    // }
  }

  onClickSignOut() {
    localStorage.clear();
    window.location.href = process.env.PUBLIC_URL;
  }

  handleMultiChange(option) {
    let { setStateTaskListFilter } = this.props;
    setStateTaskListFilter('class_id', option);
  }

  modalToggle() {
    const { adminState, setModal } = this.props;
    setModal('show', !adminState.modal.show);
  }

  renderView() {
    let { adminState, adminSetModalFormUser, adminSetModalFormUserRole, setStateModalForm } = this.props;

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
        <Breadcrumb title={<Link to={`${process.env.PUBLIC_URL}/usermanagement/`}>Back to User Management</Link>} />
        <section className='login-page section-b-space'>
          <div className='container'>
            <h3 className='text-left'>
              <i className='mdi mdi-table-edit' />
              ROLE
            </h3>
            <div className='row'>
              <div className='col-lg-3'>
                <div className='theme-card'>
                  <div className='collection-block'>
                    {/* <Link to={`${process.env.PUBLIC_URL}/`}>
                                        <img
                                            src={`${
                                            process.env.PUBLIC_URL
                                            }/assets/images/icon/tes.png`}
                                            className="img-fluid"
                                            alt=""
                                        />
                                        </Link> */}
                  </div>
                  <div className={'text-center'}>
                    <p>{moment(adminState.now).format('dddd YYYY-MM-DD').toString()}</p>
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
                  <div>{/* {card} */}</div>
                  <MuiThemeProvider>
                    <MUIDataTable
                      title={
                        <div>
                          List Role
                          {/* <Button size="sm" color="primary" onClick={this.addUser}><i className="fa fa-plus"></i>&nbsp;Add User</Button> */}
                        </div>
                      }
                      data={adminState.role.dataRole}
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

          <Modal isOpen={adminState.modal.show} fade={false} backdrop={'static'} toggle={this.modalToggle}>
            <ModalHeader toggle={this.modalToggle}>{adminState.modal.title}</ModalHeader>
            <ModalBody>
              {this.state.isAddUser && (
                <Formik
                  enableReinitialize={true}
                  initialValues={adminState.form}
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
                              <FormGroup>
                                <Label for='user_name'>User Name</Label>
                                <Input
                                  name='user_name'
                                  id='user_name'
                                  defaultValue={adminState.user.form.user_name}
                                  onChange={e => adminSetModalFormUser('user_name', e.target.value)}
                                />
                                {/* {validator.message(
                                                "area_description",
                                                adminState.form.user_name,
                                                "required"
                                            )} */}
                              </FormGroup>
                              <FormGroup>
                                <Label for='email'>E-mail</Label>
                                <Input
                                  name='email'
                                  id='email'
                                  defaultValue={adminState.user.form.email}
                                  onChange={e => adminSetModalFormUser('email', e.target.value)}
                                />
                                {/* {validator.message(
                                                "area_description",
                                                adminState.form.email,
                                                "required"
                                            )} */}
                              </FormGroup>
                              <FormGroup>
                                <Label for='password'>Password</Label>
                                <Input
                                  type='password'
                                  name='password'
                                  id='password'
                                  defaultValue={adminState.user.form.password}
                                  onChange={e => adminSetModalFormUser('password', e.target.value)}
                                />
                                {/* {validator.message(
                                                "area_description",
                                                adminState.form.password,
                                                "required"
                                            )} */}
                              </FormGroup>
                              <FormGroup>
                                <Label for='password'>Re-Password</Label>
                                <Input
                                  type='password'
                                  name='repassword'
                                  id='repassword'
                                  defaultValue={adminState.user.form.repassword}
                                  onChange={e => adminSetModalFormUser('repassword', e.target.value)}
                                />
                                {/* {validator.message(
                                                "area_description",
                                                adminState.user.form.repassword,
                                                "required"
                                            )} */}
                              </FormGroup>
                            </Col>
                          </Row>
                        </ModalBody>
                        <ModalFooter></ModalFooter>
                      </Form>
                    </div>
                  )}
                </Formik>
              )}

              {this.state.isGiveARole && (
                <Formik
                  enableReinitialize={true}
                  initialValues={adminState.form}
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
                              <FormGroup>
                                <Label for='group_id'>Group</Label>
                                <Select
                                  name='group_id'
                                  id='group_id'
                                  options={adminState.group.dataSourceGroup}
                                  onChange={e => adminSetModalFormUserRole('group_id', e.value)}
                                />
                                {/* {validator.message(
                                                "area_description",
                                                adminState.user.form.repassword,
                                                "required"
                                            )} */}
                              </FormGroup>
                              <Label>
                                *Fill these input below if you wanna assign user as a student, leave it blanks if you don't
                              </Label>
                              <FormGroup>
                                <Label for='class_id'>Class</Label>
                                <Select
                                  name='class_id'
                                  id='class_id'
                                  options={adminState.class.dataSourceClass}
                                  onChange={e => adminSetModalFormUserRole('class_id', e.value)}
                                />
                                {/* {validator.message(
                                                "area_description",
                                                adminState.user.form.repassword,
                                                "required"
                                            )} */}
                              </FormGroup>
                              <FormGroup>
                                <Label for='subject_id'>Subject</Label>
                                <Select
                                  name='subject_id'
                                  id='subject_id'
                                  options={adminState.subject.dataSourceSubject}
                                  onChange={e => adminSetModalFormUserRole('subject_id', e.value)}
                                />
                                {/* {validator.message(
                                                "area_description",
                                                adminState.user.form.repassword,
                                                "required"
                                            )} */}
                              </FormGroup>
                              <FormGroup>
                                <Label for='student_id'>Student</Label>
                                <Select
                                  name='student_id'
                                  id='student_id'
                                  options={adminState.student.dataSourceStudent}
                                  onChange={e => adminSetModalFormUserRole('student_id', e.value)}
                                />
                                {/* {validator.message(
                                                "area_description",
                                                adminState.user.form.repassword,
                                                "required"
                                            )} */}
                              </FormGroup>
                            </Col>
                          </Row>
                        </ModalBody>
                        <ModalFooter></ModalFooter>
                      </Form>
                    </div>
                  )}
                </Formik>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color='secondary' onClick={this.modalToggle}>
                Cancel
              </Button>{' '}
              {adminState.modal.type == 'addUser' && (
                <Button color='primary' onClick={() => this.save()}>
                  {adminState.modal.buttonText}
                </Button>
              )}
              {adminState.modal.type == 'giveRole' && (
                <Button color='primary' onClick={() => this.saveRole()}>
                  {adminState.modal.buttonText}
                </Button>
              )}
            </ModalFooter>
          </Modal>
        </section>
      </div>
    );
  }

  render() {
    let { adminState } = this.props;
    return (
      <BlockUi
        tag='div'
        blocking={adminState.loader}
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
  adminState: state.admin
});

export default connect(mapStateToProps, { ...actions })(withTranslate(Role));
