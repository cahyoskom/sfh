import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslate } from "react-redux-multilingual";
import BlockUi from "react-block-ui";
import { Link, NavLink } from "react-router-dom";
import {
  Button,
  // Form,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Row,
  Label,
  Input,
  InputGroup,
} from "reactstrap";
import "react-widgets/dist/css/react-widgets.css";
import DateTimePicker from "../common/DatePicker";
import CustomInput from "../common/CostumInput";
import "react-datepicker/dist/react-datepicker.css";
import "./tasksiswa.css";
import MUIDataTable from "mui-datatables";
import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles,
} from "@material-ui/core/styles";
import * as actions from "../../actions";
import moment from "moment";
import Select from "react-select";
import { Formik, Form, Field } from "formik";
import { Checkbox } from "@material-ui/core";
import * as messageBox from "../common/message-box";
import SimpleReactValidator from "simple-react-validator";
// import * as Yup from 'yup';

// const uploadFilesSiswaSchema = Yup.object().shape({
//     files: Yup.string()
//             .required('Required')
// });

class TaskSiswa extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          //0
          name: "collection_status",
          label: "Status",
          options: {
            filter: false,
            sort: false,
            print: false,
            download: false,
            customBodyRender: (value, tableMeta, updateValue) => {
              if (value == 4) {
                return (
                  <div>
                    <i
                      className="fa fa-check-circle"
                      title="Submitted"
                      style={{ color: "green" }}
                    />
                  </div>
                );
              } else {
                return (
                  <div>
                    <i
                      className="fa fa-window-close"
                      title="Belum Submit"
                      style={{ color: "red" }}
                    />
                  </div>
                );
              }
            },
          },
        },
        {
          //1
          name: "notes",
          label: "Notes",
          options: {
            filter: false,
            sort: false,
            customBodyRender: (value, tableMeta, updateValue) => {
              if (value) {
                return (
                  <div>
                    <span
                      style={{
                        backgroundColor: "#5bb1e4",
                        padding: "5px",
                        borderRadius: "25px",
                      }}
                    >
                      {tableMeta.rowData[2] +
                        " - " +
                        this.props.accountState.roles[0].class_name}
                    </span>
                    <p>{value}</p>
                    <span
                      style={{
                        backgroundColor: "rgb(93, 228, 91)",
                        padding: "5px",
                        borderRadius: "25px",
                      }}
                    >
                      {"Published : " +
                        moment(tableMeta.rowData[4])
                          .format("DD-MM-YYYY")
                          .toString()}
                    </span>
                    <br />
                    <br />
                    <span
                      style={{
                        backgroundColor: "#5bb1e4",
                        padding: "5px",
                        borderRadius: "25px",
                      }}
                    >
                      {"Duration : " +
                        moment(tableMeta.rowData[4])
                          .format("DD-MM-YYYY")
                          .toString() +
                        " - " +
                        moment(tableMeta.rowData[5])
                          .format("DD-MM-YYYY")
                          .toString()}
                    </span>
                    {/* <p>{tableMeta.rowData[3]}, </p> */}
                  </div>
                );
              }
            },
          },
        },
        {
          //2
          name: "subject_name",
          label: "Mata Pelajaran",
          options: {
            display: false,
          },
        },
        {
          //3
          name: "title",
          label: "Task",
          options: {
            display: false,
          },
        },
        {
          //4
          name: "start_date",
          label: "Start",
          options: {
            display: false,
            customBodyRender: (value) => {
              if (value) {
                return (
                  <div>
                    <p>{moment(value).format("dddd YYYY-MM-DD").toString()}</p>
                  </div>
                );
              }
            },
          },
        },
        {
          //5
          name: "finish_date",
          label: "Finish",
          options: {
            display: false,
            customBodyRender: (value) => {
              if (value) {
                return (
                  <div>
                    <p>{moment(value).format("dddd YYYY-MM-DD").toString()}</p>
                  </div>
                );
              }
            },
          },
        },
        {
          //6
          name: "task_id",
          label: "Action",
          options: {
            // empty: true,
            filter: false,
            sort: false,
            print: false,
            download: false,
            customBodyRender: (value, tableMeta, updateValue) => {
              return (
                <div>
                  <Button
                    title="Download"
                    color="info"
                    style={{ color: "#fff" }}
                    onClick={() => this.downloadModal(value)}
                  >
                    Download
                  </Button>
                  &nbsp;
                  <Button
                    title="Upload"
                    color="primary"
                    style={{ color: "#fff" }}
                    onClick={() => this.uploadTask(tableMeta)}
                  >
                    Upload
                  </Button>
                </div>
              );
            },
          },
        },
        {
          //7
          name: "task_collection_id",
          label: "Task",
          options: {
            display: false,
          },
        },
        {
          //8
          name: "checkbox",
          label: "Select",
          options: {
            filter: false,
            sort: false,
            customBodyRender: (value, tableMeta, updateValue) => {
              if (tableMeta.rowData[7] != 0) {
                // console.log(value,'huh')
                return (
                  <div>
                    <Checkbox
                      onChange={(event) => {
                        this.handleRowClick(tableMeta, event.target.checked);
                      }}
                      checked={value}
                    />
                  </div>
                );
              } else {
                return (
                  <div>
                    <Checkbox
                      disabled={true}
                      title="Upload jawaban terlebih dahulu"
                    />
                  </div>
                );
              }
            },
          },
        },
        {
          //9
          name: "published_date",
          label: "published_date",
          options: {
            display: false,
          },
        },
        {
          //10
          name: "class_name",
          label: "class_name",
          options: {
            display: false,
          },
        },
      ],
      options: {
        filterType: "checkbox",
      },
      status: "all",
      isAddNew: false,
      isDownload: false,
      uploadedFileName: [],
      fileObj: [],
      task_collection_ids: [],
      isChecked: false,
    };
    this.getList = this.getList.bind(this);
    this.uploadTask = this.uploadTask.bind(this);
    this.downloadModal = this.downloadModal.bind(this);
    this.downloadFiles = this.downloadFiles.bind(this);
    this.downloadFile = this.downloadFile.bind(this);
    this.submitTask = this.submitTask.bind(this);
    this.modalToggle = this.modalToggle.bind(this);
    this.openFileBrowser = this.openFileBrowser.bind(this);
    this.fileInput = React.createRef();
    this.onClickSignOut = this.onClickSignOut.bind(this);
    this.save = this.save.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleMultiChange = this.handleMultiChange.bind(this);
    this.validator = new SimpleReactValidator();
  }

  componentDidMount() {
    this.getList();
  }

  getList() {
    let { studentGetTaskList } = this.props;
    studentGetTaskList();
  }

  save() {
    const { studentPutCollectionFiles } = this.props;
    if (this.validator.allValid()) {
      // studentPutCollectionFiles();
      console.log("all valid");
      // this.modalToggle();
    } else {
      this.validator.showMessages();
      //   this.fileInput.current.clear();
    }
  }

  downloadFiles() {
    const {
      taskSiswaState,
      setStateModalFormDownload,
      studentDownloadFile,
      setStateModalForm,
    } = this.props;
    if (
      taskSiswaState.dataTaskFile.files != null ||
      taskSiswaState.dataTaskFile.files != undefined
    ) {
      for (let i = 0; i < taskSiswaState.dataTaskFile.files.length; i++) {
        setStateModalForm(
          "task_id",
          taskSiswaState.dataTaskFile.files[i].task_file_id
        );
        setStateModalForm(
          "filename",
          taskSiswaState.dataTaskFile.files[i].filename
        );
        setStateModalForm(
          "mime_type",
          taskSiswaState.dataTaskFile.files[i].mime_type
        );
        studentDownloadFile();
      }
    }
  }

  downloadFile(task_file_id, filename, mime_type) {
    const { studentDownloadFile, setStateModalForm } = this.props;
    setStateModalForm("task_id", task_file_id);
    setStateModalForm("filename", filename);
    setStateModalForm("mime_type", mime_type);
    studentDownloadFile();
  }

  uploadTask(tableMeta) {
    let {
      setModal,
      setStateModalForm,
      studentPutCollection,
      taskSiswaState,
      studentGetUploadedFileList,
    } = this.props;
    if (taskSiswaState.form.task_collection_id == 0) {
      if (tableMeta.rowData[7] == 0) {
        setStateModalForm("task_id", tableMeta.rowData[6]);
        studentPutCollection();
        console.log("create lembar jawaban");
      } else {
        setStateModalForm("task_id", tableMeta.rowData[6]);
        setStateModalForm("task_collection_id", tableMeta.rowData[7]);
        studentGetUploadedFileList();
        console.log("pakai lembar jawaban yg sudah dibuat");
      }
    } else {
      setStateModalForm("task_id", tableMeta.rowData[6]);
      setStateModalForm("task_collection_id", tableMeta.rowData[7]);
      studentGetUploadedFileList();
      console.log("pakai lembar jawaban yg sudah dibuat else");
    }

    setModal("type", "add");
    setModal("title", "Upload Files");
    setModal("buttonText", "Upload");
    setModal("show", true);
    this.setState((prevState) => ({
      ...prevState,
      isAddNew: true,
      isDownload: false,
    }));
  }

  downloadModal(value) {
    let { studentGetTaskFileList, setModal, setStateModalForm } = this.props;
    setStateModalForm("task_id", value);
    studentGetTaskFileList();

    setModal("type", "download");
    setModal("title", "Download Files");
    setModal("buttonText", "Download All");
    setModal("show", true);
    this.setState((prevState) => ({
      ...prevState,
      isAddNew: false,
      isDownload: true,
    }));
  }

  submitTask() {
    let {
      studentSubmitCollection,
      setStateModalForm,
      taskSiswaState,
    } = this.props;
    setStateModalForm("task_collection_ids", this.state.task_collection_ids);
    messageBox.confirmSubmitCollection(
      this.state.task_collection_ids.length,
      studentSubmitCollection
    );
    // studentSubmitCollection();
  }

  modalToggle() {
    const { taskSiswaState, setModal } = this.props;
    setModal("show", !taskSiswaState.modal.show);
    this.setState((state) => ({
      ...state,
      uploadedFileName: [],
    }));
  }

  openFileBrowser = () => {
    this.fileInput.current.click();
  };

  fileHandler = (event) => {
    let { setLoader, setStateModalForm, taskSiswaState } = this.props;
    // console.log('handel file', event.target.files);
    if (event.target.files.length) {
      var fileObj = [];
      var fileName = [];
      var extension = [];
      // let i;
      if (event.target.files.length >= 1) {
        for (var i = 0; i < event.target.files.length; i++) {
          fileObj[i] = event.target.files[i];
          // console.log('heh', fileObj[1]);
          fileName[i] = event.target.files[i].name;
          // extension[i] = fileName[i].slice(fileName[i].lastIndexOf(".") + 1);
        }
        // fileObj.push(fileObj[i]);
        // fileName.push(fileName[i] + extension[i]);
      }
      // else{
      //       let fileObj = event.target.files[0];
      //       let fileName = fileObj.name;
      //       let extension = fileName.slice(fileName.lastIndexOf(".") + 1);
      // }
      // var fileName = fileObj.name;
      //   let fileObj = event.target.files[0];
      //   let fileName = fileObj.name;
      //   let extension = fileName.slice(fileName.lastIndexOf(".") + 1);

      //   if(this.props.ocr.upload.acceptedFileType.includes(extension)){
      //     if(fileObj.size >= 500000){
      //       this.setState({
      //         isFormInvalid: true,
      //         uploadedFileName: "",
      //         errorMessage: "File too large. Maximum file size 500 KB."
      //       });
      //       setOCRFile(null);
      //     }else{
      //       this.setState({
      //         uploadedFileName: fileName,
      //         isFormInvalid: false,
      //         errorMessage: ""
      //       });
      //       setOCRFile(fileObj);
      //     }
      //   }else{
      //     this.setState({
      //       isFormInvalid: true,
      //       uploadedFileName: "",
      //       errorMessage: "Please select a "+ this.props.ocr.upload.acceptedFileType +" file only."
      //     });
      //     setOCRFile(null);
      //   }
      this.setState({
        uploadedFileName: fileName,
      });
      setStateModalForm("files", fileObj);
      setStateModalForm(
        "task_collection_id",
        taskSiswaState.form.task_collection_id
      );
      // console.log('pailojek',fileObj);
      // console.log('pailojeknem',fileName);
    }
  };

  onClickSignOut() {
    localStorage.clear();
    window.location.href = process.env.PUBLIC_URL;
  }

  handleRowClick(tableMeta, val) {
    // console.log('metaa',tableMeta)
    let {
      setStateModalForm,
      taskSiswaState,
      setStateTaskSiswaList,
    } = this.props;
    let data = taskSiswaState.data;
    console.log(val, "click");
    data[
      data.findIndex((x) => x.task_id === tableMeta.rowData[6])
    ].checkbox = val;
    setStateTaskSiswaList("data", data);
    setStateModalForm("rows", tableMeta.rowData[7]);
    this.setState((prevState) => ({
      task_collection_ids: [
        ...prevState.task_collection_ids,
        tableMeta.rowData[7],
      ],
      // isChecked: !this.state.isChecked
    }));
  }

  handleMultiChange(option) {
    let { setStateTaskListFilter } = this.props;
    setStateTaskListFilter("taskStatus", option);
  }

  renderView() {
    let {
      taskSiswaState,
      setStateTaskListFilter,
      studentGetTaskList,
      accountState,
    } = this.props;

    const options = {
      responsive: "scroll",
      // filterType: 'checkbox',
      pagination: false,
      filter: false,
      search: false,
      download: false,
      print: false,
      viewColumns: false,
      selectableRows: "none",
    };

    //menampilkan file/s yang dipilih untuk di upload(modal upload)
    let filesToUpload = this.state.uploadedFileName;
    let filePreview = [];
    if (filesToUpload.length != 0) {
      for (let i = 0; i < filesToUpload.length; i++) {
        filePreview.push(
          <Input
            type="text"
            className="form-control"
            style={{ marginBottom: "5px" }}
            value={this.state.uploadedFileName[i]}
            readOnly
          />
        );
      }
    }

    //menampilkan file/s untuk di download(modal download)
    let listOfFile = [];
    if (
      taskSiswaState.dataTaskFile.files != null ||
      taskSiswaState.dataTaskFile.files != undefined
    ) {
      for (let i = 0; i < taskSiswaState.dataTaskFile.files.length; i++) {
        listOfFile.push(
          <InputGroup style={{ marginBottom: "5px" }}>
            <Input
              type="text"
              className="form-control"
              value={taskSiswaState.dataTaskFile.files[i].filename}
              readOnly
            />
            <Button
              inline
              color="primary"
              size="xs"
              onClick={() => {
                this.downloadFile(
                  taskSiswaState.dataTaskFile.files[i].task_file_id,
                  taskSiswaState.dataTaskFile.files[i].filename,
                  taskSiswaState.dataTaskFile.files[i].mime_type
                );
              }}
            >
              Download
            </Button>
          </InputGroup>
        );
      }
    }

    //menampilkan file/s yg sudah di upload. bisa delete(modal upload)
    let listOfUploadedFile = [];
    if (
      taskSiswaState.dataUploadedFile.files != null ||
      taskSiswaState.dataUploadedFile.files != undefined
    ) {
      for (let i = 0; i < taskSiswaState.dataUploadedFile.files.length; i++) {
        listOfUploadedFile.push(
          <InputGroup style={{ marginBottom: "5px" }}>
            <Input
              type="text"
              className="form-control"
              value={taskSiswaState.dataUploadedFile.files[i].filename}
              readOnly
            />
            <Button
              inline
              title="Delete Uploaded File"
              color="danger"
              size="xs"
            >
              X
            </Button>
          </InputGroup>
        );
      }
    }

    return (
      <div>
        <section className="login-page section-b-space">
          <div className="container">
            <h3>
              <i className="mdi mdi-table-edit" />
              Task List Siswa
            </h3>
            <div className="row">
              <div className="col-lg-3">
                <div className="theme-card">
                  <div className="collection-block">
                    <Link to={`${process.env.PUBLIC_URL}/`}>
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/images/icon/tes.png`}
                        className="img-fluid"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className={"text-center"}>
                    {/* <p>{taskSiswaState.stardet.toString()}</p> */}
                    <p>
                      {moment(taskSiswaState.now)
                        .format("dddd YYYY-MM-DD")
                        .toString()}
                    </p>
                  </div>
                  <br />
                  <form className="theme-form">
                    <div className="form-group">
                      <label>
                        Nama : {accountState.selectedRole[0].student_name}
                      </label>
                      <br />
                      <label>
                        Kelas : {accountState.selectedRole[0].class_name}
                      </label>
                      <br />
                      <label>
                        NIP : {accountState.selectedRole[0].student_no}
                      </label>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-9 right-login">
                <div className="theme-card authentication-right">
                  <div className="row">
                    <div className="col-lg-4">
                      <Label for="">Status</Label>
                      <Select
                        style={{ position: "absolute" }}
                        id="class"
                        name="class"
                        placeholder="Pilih Status"
                        defaultValue={taskSiswaState.dataSourceStatus.filter(
                          (option) =>
                            option.value === taskSiswaState.filter.taskStatus
                        )}
                        options={taskSiswaState.dataSourceStatus}
                        closeMenuOnSelect={true}
                        onChange={this.handleMultiChange}
                        // isMulti
                      />
                    </div>
                    <div className="col-md-4">
                      <Label for="subject">mulai</Label>
                      <DateTimePicker
                        min={new Date()}
                        isInline={true}
                        colLabel={"col-md-1"}
                        onChange={(a, b) => {
                          setStateTaskListFilter("startDate", a);
                        }}
                        format={"DD/MMM/YYYY"}
                        value={taskSiswaState.filter.startDate}
                      />
                    </div>
                    <div className="col-md-4">
                      <label>sampai</label>
                      <DateTimePicker
                        min={new Date()}
                        isInline={true}
                        colLabel={"col-md-1"}
                        onChange={(a, b) => {
                          setStateTaskListFilter("endDate", a);
                        }}
                        format={"DD/MMM/YYYY"}
                        value={taskSiswaState.filter.endDate}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-2">
                      <Button color="primary" onClick={studentGetTaskList}>
                        Filter
                      </Button>
                    </div>
                  </div>
                  <br />

                  <MuiThemeProvider>
                    <MUIDataTable
                      key={taskSiswaState.key}
                      data={taskSiswaState.data}
                      columns={this.state.columns}
                      options={options}
                    />
                  </MuiThemeProvider>
                  <br />

                  <div className="text-right">
                    <Button size="sm" color="primary" onClick={this.submitTask}>
                      <i className="fa fa-plus" /> Submit Selected Task
                    </Button>
                  </div>
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
            isOpen={taskSiswaState.modal.show}
            fade={false}
            backdrop={"static"}
            toggle={this.modalToggle}
          >
            <ModalHeader toggle={this.modalToggle}>
              {taskSiswaState.modal.title}
            </ModalHeader>
            <ModalBody>
              {/* {taskSiswaState} */}
              {/* <AsyncPage page={"master-area-form"} fallback={<FormLoader/>} validator={this.validator} ref={this.formArea} /> */}
              {this.state.isAddNew && (
                <Formik
                  enableReinitialize={true}
                  initialValues={taskSiswaState.form}
                  // validationSchema={uploadFilesSiswaSchema}
                  onSubmit={(values) => {
                    this.uploadTask();
                  }}
                >
                  {({ errors, touched, setFieldValue }) => (
                    <div>
                      <Form>
                        <ModalBody>
                          <Row form={true}>
                            <Col md={12}>
                              <FormGroup>
                                <Label for="file">File Upload </Label>
                                <div>{filePreview}</div>
                                <div>{listOfUploadedFile}</div>
                                <Field
                                  name="files"
                                  render={({ field }) => (
                                    <input
                                      type="file"
                                      hidden
                                      accept={".jpg,.jpeg,.png"}
                                      onChange={this.fileHandler.bind(this)}
                                      ref={this.fileInput}
                                      onClick={(event) => {
                                        event.target.value = null;
                                      }}
                                      style={{ padding: "10px" }}
                                      multiple={true}
                                    />
                                  )}
                                />
                                {errors.files && touched.files ? (
                                  <div className="form-error">
                                    {errors.files}
                                  </div>
                                ) : null}
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
              {this.state.isDownload && (
                <Formik
                  enableReinitialize={true}
                  initialValues={taskSiswaState.form}
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
                                <p>
                                  Deskripsi Task :{" "}
                                  {taskSiswaState.dataTaskFile.notes}
                                </p>
                                <div>{listOfFile}</div>
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
              {taskSiswaState.modal.type == "add" && (
                <Button
                  accept={".jpg,.jpeg,.png"}
                  color="primary"
                  onClick={this.openFileBrowser.bind(this)}
                >
                  Add/Browse
                </Button>
              )}{" "}
              {taskSiswaState.modal.type == "add" && (
                <Button
                  color="primary"
                  type="submit"
                  onClick={() => this.save()}
                >
                  {taskSiswaState.modal.buttonText}
                </Button>
              )}
              {taskSiswaState.modal.type == "download" && (
                <Button color="primary" onClick={() => this.downloadFiles()}>
                  {taskSiswaState.modal.buttonText}
                </Button>
              )}
            </ModalFooter>
          </Modal>
        </section>
      </div>
    );
  }

  render() {
    let { taskSiswaState } = this.props;
    return (
      <BlockUi
        tag="div"
        blocking={taskSiswaState.loader}
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
  taskSiswaState: state.taskSiswa,
  accountState: state.account,
});

export default connect(mapStateToProps, { ...actions })(
  withTranslate(TaskSiswa)
);
