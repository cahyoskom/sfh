import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslate } from "react-redux-multilingual";
import BlockUi from "react-block-ui";
import { Link, NavLink } from "react-router-dom";
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
  CardTitle,
} from "reactstrap";
import CustomFooterGuru from "../common/customFooterGuru";
// import Select from "../common/Select";
import "react-widgets/dist/css/react-widgets.css";
import DateTimePicker from "../common/DatePicker";
// import Input from "../common/Input";
import "react-datepicker/dist/react-datepicker.css";
import "../tasklist/tasksiswa.css";
import MUIDataTable from "mui-datatables";
import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles,
} from "@material-ui/core/styles";
import * as actions from "../../actions";
import moment from "moment";
import * as messageBox from "../common/message-box";
import SimpleReactValidator from "simple-react-validator";
import { Formik, Form, Field } from "formik";
import Breadcrumb from "../common/breadcrumb";

class Subject extends Component {
  constructor(props) {
    super(props);
    //console.log('vrovs',props)
    this.state = {
      columns: [
        {
          name: "subject_name",
          label: "Subject Name",
        },
        {
          name: "subject_id",
          label: "Action",
          options: {
            filter: false,
            sort: false,
            print: false,
            download: false,
            display: false,
            // customBodyRender: (value, tableMeta, updateValue) => {
            //     return (
            //     <div>
            //         <Button color="secondary" size="sm">Edit</Button>&nbsp;
            //         <Button color="danger" size="sm">Delete</Button>&nbsp;
            //     </div>
            //     );
            // }
          },
        },
      ],
      isAddSubject: false,
    };
    this.onClickSignOut = this.onClickSignOut.bind(this);
    this.validator = new SimpleReactValidator();
    this.handleMultiChange = this.handleMultiChange.bind(this);
    this.addSubject = this.addSubject.bind(this);
    this.modalToggle = this.modalToggle.bind(this);
  }

  componentDidMount() {
    let { adminGetSubjectList } = this.props;
    // document.getElementById('sticky').style.display = "none"
    adminGetSubjectList();
  }

  addSubject() {
    let { setModal } = this.props;
    setModal("type", "addSubject");
    setModal("title", "Add Subject");
    setModal("buttonText", "Add");
    setModal("show", true);
    this.setState((prevState) => ({
      ...prevState,
      isAddSubject: true,
    }));
  }

  save() {
    const { adminCreateSubject } = this.props;
    // if (this.validator.allValid()) {
    adminCreateSubject();
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
    setStateTaskListFilter("class_id", option);
  }

  modalToggle() {
    const { adminState, setModal } = this.props;
    setModal("show", !adminState.modal.show);
  }

  renderView() {
    let { adminState, adminSetModalFormSubject, taskKepsekState } = this.props;

    const options = {
      responsive: "scroll",
      filter: false,
      search: false,
      download: false,
      print: false,
      viewColumns: false,
      selectableRows: false,
    };

    return (
      <div>
        <Breadcrumb
          title={
            <Link to={`${process.env.PUBLIC_URL}/usermanagement/`}>
              Back to User Management
            </Link>
          }
        />
        <section className="login-page section-b-space">
          <div className="container">
            <h3 className="text-left">
              <i className="mdi mdi-table-edit" />
              SUBJECT
            </h3>
            <div className="row">
              <div className="col-lg-3">
                <div className="theme-card">
                  <div className="collection-block">
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
                  <div className={"text-center"}>
                    <p>
                      {moment(taskKepsekState.now)
                        .format("dddd YYYY-MM-DD")
                        .toString()}
                    </p>
                  </div>
                  <br />
                  <form className="theme-form">
                    <div className="form-group">
                      <label>
                        Nama : {localStorage.name.replace(/"/g, "")}
                      </label>
                      <br />
                      <label>Kelas : SD 5</label>
                      <br />
                      <label>NIP : 011232001</label>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-9 right-login">
                <div className="theme-card authentication-right">
                  <div>{/* {card} */}</div>
                  <MuiThemeProvider>
                    <MUIDataTable
                      title={
                        <div>
                          List Subject{" "}
                          <Button
                            size="sm"
                            color="primary"
                            onClick={this.addSubject}
                          >
                            <i className="fa fa-plus"></i>&nbsp;Add Subject
                          </Button>
                        </div>
                      }
                      data={adminState.subject.dataSubject}
                      columns={this.state.columns}
                      options={options}
                    />
                  </MuiThemeProvider>
                  <br />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3">
                <a href="#">Pengaturan</a> |{" "}
                <a
                  href="#"
                  onClick={() => {
                    this.onClickSignOut();
                  }}
                >
                  Logout
                </a>
              </div>
            </div>
          </div>

          <Modal
            isOpen={adminState.modal.show}
            fade={false}
            backdrop={"static"}
            toggle={this.modalToggle}
          >
            <ModalHeader toggle={this.modalToggle}>
              {adminState.modal.title}
            </ModalHeader>
            <ModalBody>
              {this.state.isAddSubject && (
                <Formik
                  enableReinitialize={true}
                  initialValues={adminState.form}
                  // validationSchema={add_editSchema}
                  onSubmit={(values) => {
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
                                <Label for="subject_name">Subject Name</Label>
                                <Input
                                  name="subject_name"
                                  id="subject_name"
                                  defaultValue={
                                    adminState.subject.form.subject_name
                                  }
                                  onChange={(e) =>
                                    adminSetModalFormSubject(
                                      "subject_name",
                                      e.target.value
                                    )
                                  }
                                />
                                {/* {validator.message(
                                                "area_description",
                                                adminState.form.user_name,
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
              <Button color="secondary" onClick={this.modalToggle}>
                Cancel
              </Button>{" "}
              {adminState.modal.type == "addSubject" && (
                <Button color="primary" onClick={() => this.save()}>
                  {adminState.modal.buttonText}
                </Button>
              )}
              {adminState.modal.type == "edit" && (
                <Button color="primary" onClick={() => this.update()}>
                  {adminState.modal.buttonText}
                </Button>
              )}
            </ModalFooter>
          </Modal>
        </section>
      </div>

      // <div>
      //     <div className="container">
      //         <div className="row">
      //                 {card}
      //         </div>
      //     </div>
      // </div>
    );
  }

  render() {
    let { adminState, taskKepsekState } = this.props;
    return (
      <BlockUi
        tag="div"
        blocking={taskKepsekState.loader}
        message={
          <span>
            <div id="preloader">
              <div id="loader" />
            </div>
          </span>
        }
      >
        {this.renderView()}
      </BlockUi>
    );
  }
}

const mapStateToProps = (state) => ({
  taskKepsekState: state.taskKepsek,
  adminState: state.admin,
});

export default connect(mapStateToProps, { ...actions })(withTranslate(Subject));
