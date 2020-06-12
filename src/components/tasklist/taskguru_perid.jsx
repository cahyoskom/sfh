import React, {Component} from 'react';
import { connect } from "react-redux";
import { withTranslate } from "react-redux-multilingual";
import BlockUi from "react-block-ui";
import { Link, NavLink } from "react-router-dom";
import { 
    Button, FormGroup, Modal, ModalHeader, 
    ModalBody, ModalFooter, Col, Row, Label, Input } from "reactstrap";
import 'react-widgets/dist/css/react-widgets.css';
import DateTimePicker from "../common/DatePicker";
import "react-datepicker/dist/react-datepicker.css";
import './tasksiswa.css';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import * as actions from "../../actions";
import moment from 'moment'
import * as messageBox from "../common/message-box";
import SimpleReactValidator from "simple-react-validator";
import { Formik, Form, Field } from 'formik';
import Select from 'react-select'

class TaskGuruPerId extends Component {

    constructor (props) {
        super (props)
        //console.log('vrovs',props)
        this.state = {
            columns: [
                {
                    name:"no",
                    label:"No",
                    display:true
                },
                {
                    name: 'name',
                    label: 'Nama Siswa / Email',
                    options: {
                        filter: false,
                        sort: false,
                        print: false,
                        download: false,
                        customBodyRender: (value, tableMeta, updateValue) => {
                            return (
                                <div>
                                    {value + " / " + tableMeta.rowData[2]} 
                                </div>
                            )
                          
                        }
                    }
                },
                {
                    name: "email",
                    label: "email",
                    options: {
                        display: false
                    }
                },
                {
                    name: 'task_progress',
                    label: 'Task Progress',
                    options: {
                        filter: false,
                        sort: false,
                        customBodyRender: (value, tableMeta, updateValue) => {
                            if(value){
                                return (
                                <div>
                                    <p style={{color:"yellow"}}>{value}</p>
                                </div>
                                );
                            }
                        }
                    }
                },
                {
                    name: "last_submit",
                    label: "Last Submit",
                    options: {
                        display: true
                    }
                },
                {
                    name: 'task_id',
                    label: 'Upload Folder',
                    options: {
                        filter: false,
                        sort: false,
                        print: false,
                        download: false,
                        customBodyRender: (value, tableMeta, updateValue) => {
                            if(value){
                                return (
                                <div>
                                    <Button title="Detail Task" color="primary" size="sm" onClick={() => this.detailTask(tableMeta)}>Detail</Button>&nbsp;
                                    <Button title="Arsipkan Task" color="secondary" size="sm" onClick={() => this.archivedTask(tableMeta)}>Arsipkan</Button>&nbsp;
                                    <Button title="Edit Task" color="info" style={{ color: "#fff" }} onClick={() => this.editTask(tableMeta)} size="sm">Edit</Button>&nbsp;
                                    <Button title="Delete Task" color="danger" style={{ color: "#fff" }} onClick={() => this.deleteTask(tableMeta)} size="sm">Delete</Button>
                                </div>
                                );
                            }
                        }
                      }
                },
            ],         
            options : {
                 filterType: 'checkbox',
            },
            status:"all",
            isAddNew:false,
            isEdit:false,
            isDetail:false,
            multiValueClass: [],
            dataSourceClass:this.props.taskGuruState.dataSourceClass,
            uploadedFileName: [],
            isFormInvalid:false
        }
        this.getList = this.getList.bind(this);
        this.uploadTask = this.uploadTask.bind(this);
        this.editTask = this.editTask.bind(this);
        this.detailTask = this.detailTask.bind(this);
        this.modalToggle = this.modalToggle.bind(this);
        // this.openFileBrowser = this.openFileBrowser.bind(this);
        this.fileInput = React.createRef();
        this.onClickSignOut = this.onClickSignOut.bind(this);
        this.validator = new SimpleReactValidator();
        this.save = this.save.bind(this);
        this.handleMultiChange = this.handleMultiChange.bind(this);
        this.update = this.update.bind(this);
        this.clearModal = this.clearModal.bind(this);
    }

    componentDidMount(){
        let {getClassList, getSubjectList, accountState} =this.props;
        // document.getElementById('sticky').style.display = "none"
        this.getList();        
        getClassList();
        getSubjectList();
        this.clearModal();
        console.log("acc state",accountState);
    }

    clearModal(){
        let {setStateModalForm} =this.props;
        setStateModalForm("task_id", "")
        setStateModalForm("class_id", "")
        setStateModalForm("subject_id", "")
        setStateModalForm("assignor_id", "")
        setStateModalForm("title", "")
        setStateModalForm("notes", "")
        setStateModalForm("start_date", new Date())
        setStateModalForm("finish_date", new Date())
        setStateModalForm("files", null)
    }

    getList(){
        let { getTaskGuruList } = this.props;
        getTaskGuruList();
    }

    uploadTask(){
        let { getSubjectList, getClassList, setModal } = this.props;
        this.clearModal();
        getSubjectList();
        getClassList();

        setModal("type", "add")
        setModal("title", "Upload Task")
        setModal("buttonText", "Upload")
        setModal("show", true)
        this.setState( prevState => ({
            ...prevState,
            isAddNew:true,
            isEdit:false,
            isDetail:false,
        })
        );
    }

    detailTask(data){
        let { getSubjectList, getClassList, setModal, setStateModalForm } = this.props;
        getSubjectList();
        getClassList();

        setStateModalForm("class_id", data.rowData[8])
        setStateModalForm("subject_id", data.rowData[9])
        setStateModalForm("title", data.rowData[4])
        setStateModalForm("notes", data.rowData[1])
        setStateModalForm("start_date", data.rowData[5])
        setStateModalForm("finish_date", data.rowData[6])

        setModal("type", "detail")
        setModal("title", "Detail Task")
        // setModal("buttonText", "Upload")
        setModal("show", true)
        this.setState( prevState => ({
            ...prevState,
            isAddNew:false,
            isEdit:false,
            isDetail:true,
        })
        );
    }

    editTask(data){
        let { getSubjectList, getClassList, setModal, setStateModalForm } = this.props;
        getSubjectList();
        getClassList();

        setStateModalForm("task_id", data.rowData[7])
        setStateModalForm("class_id", data.rowData[8])
        setStateModalForm("subject_id", data.rowData[9])
        setStateModalForm("assignor_id", data.rowData[10])
        setStateModalForm("title", data.rowData[4])
        setStateModalForm("notes", data.rowData[1])
        setStateModalForm("start_date", data.rowData[5])
        setStateModalForm("finish_date", data.rowData[6])
        
        setModal("type", "edit")
        setModal("title", "Edit Task")
        setModal("buttonText", "Update")
        setModal("show", true)
        this.setState( prevState => ({
            ...prevState,
            isAddNew:false,
            isEdit:true,
            isDetail:false,
        })
        );
    }

    deleteTask(tableMeta) {
        const { deleteTask, setStateModalForm, taskGuruState } = this.props;
        setStateModalForm("task_id",tableMeta.rowData[7]);
        messageBox.confirmDelete(taskGuruState.form.task_id, deleteTask);
    }

    archivedTask(tableMeta) {
        const { archivedTask, setStateModalForm, taskGuruState } = this.props;
        setStateModalForm("task_id",tableMeta.rowData[7]);
        messageBox.confirmArchive(taskGuruState.form.task_id, archivedTask);
    }

    save() {
        const { postTask } = this.props;
        // if (this.validator.allValid()) {
            postTask();
        // } else {
        //   this.validator.showMessages();
        //   this.formArea.current.forceUpdate();
        // }
    }

    update() {
        const { updateTask } = this.props;
        // if (this.validator.allValid()) {
            updateTask();
        // } else {
        //     this.validator.showMessages();
        //     this.formArea.current.forceUpdate();
        // }
    }  

    modalToggle() {
        const { taskGuruState, setModal } = this.props;
        setModal("show", !taskGuruState.modal.show)
    }

    onClickSignOut(){
        localStorage.clear()
        window.location.href = process.env.PUBLIC_URL
    }

    renderView (){
        let { taskGuruState, setStateTaskListFilter, setStateModalForm, getTaskGuruList } = this.props;

        const options = {
            responsive:"scroll",
            filter:false,
            search:false,
            download:false,
            print:false,
            viewColumns:false
        };

        return (
            <div>
                
                <section className="login-page section-b-space">
                    <div className="container">
                    <h3 className="text-left"><i className="mdi mdi-table-edit"/>Task List Guru</h3>
                        <div className="row">
                            <div className="col-lg-3">
                                
                                <div className="theme-card">
                                    <div className="collection-block">
                                        <Link to={`${process.env.PUBLIC_URL}/`}>
                                        <img
                                            src={`${
                                            process.env.PUBLIC_URL
                                            }/assets/images/icon/tes.png`}
                                            className="img-fluid"
                                            alt=""
                                        />
                                        </Link>
                                    </div>
                                    <div className={"text-center"}>
                                        <p>{moment(taskGuruState.now).format("dddd YYYY-MM-DD").toString()}</p>
                                    </div><br/>
                                    <form className="theme-form">
                                        <div className="form-group">
                                            <label>Nama : {localStorage.name.replace(/"/g,'')}</label><br/>
                                            <label>Kelas : SD 5</label><br/>
                                            <label>NIP : 011232001</label>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-9 right-login">
                                <div className="theme-card authentication-right">
                                    <MuiThemeProvider>
                                    <MUIDataTable
                                        data={taskGuruState.dataCollection}
                                        columns={this.state.columns}
                                        options={options}
                                        />
                                    </MuiThemeProvider><br/>

                                    <div className="text-right">
                                        <Button size="sm" color="primary" onClick={this.uploadTask}><i className="fa fa-plus"/> Add New Task</Button>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-3">
                                <a href="#">Pengaturan</a> | <a href="#" onClick={() => { this.onClickSignOut() }}>Logout</a>
                            </div>
                        </div>
                    </div>

                    <Modal isOpen={taskGuruState.modal.show} fade={false} backdrop={'static'} toggle={this.modalToggle}>
                        <ModalHeader toggle={this.modalToggle}>{taskGuruState.modal.title}</ModalHeader>
                        <ModalBody>
                            {this.state.isAddNew &&
                                <Formik
                                enableReinitialize={true}
                                initialValues={taskGuruState.taskDetail}
                                // validationSchema={add_editSchema}
                                onSubmit={values => {
                                    // same shape as initial values
                                    this.uploadTask()
                                }}
                                >
                                {({ errors, touched, setFieldValue }) => (
                                    <div>
                                    <Form>
                                        <ModalBody>
                                        <Row form={true}>
                                        <Col md={12}>
                                            <FormGroup>
                                                <Field
                                                name="Mata Pelajaran"
                                                render={({ field }) => (
                                                    <div>
                                                    <Label for="kelas">Assign to</Label>
                                                    <Select
                                                        {...field}
                                                        id={"kelas"}
                                                        options={taskGuruState.dataSourceClass}
                                                        onChange= { (e) => setStateModalForm("class_id", e.value)}
                                                    />
                                                    {errors[field.name] && touched[field.name] ? (
                                                        <div className="form-error">{errors[field.name]}</div>
                                                    ) : null}
                                                    </div>
                                                )}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Field
                                                name="Mata Pelajaran"
                                                render={({ field }) => (
                                                    <div>
                                                    <Label for="subject">Mata Pelajaran</Label>
                                                    <Select
                                                        {...field}
                                                        // id={"subject"}
                                                        options={taskGuruState.dataSourceSubject}
                                                        onChange= { (e) => setStateModalForm("subject_id", e.value)}
                                                    />
                                                    {errors[field.name] && touched[field.name] ? (
                                                        <div className="form-error">{errors[field.name]}</div>
                                                    ) : null}
                                                    </div>
                                                )}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="title">Nama Task</Label>
                                                <Input
                                                    name="title"
                                                    id="title"
                                                    defaultValue={taskGuruState.form.title}
                                                    onChange= { (e) => setStateModalForm("title", e.target.value)}
                                                />
                                                {/* {validator.message(
                                                    "area_description",
                                                    areaState.master.form.area_description,
                                                    "required"
                                                )} */}
                                                </FormGroup>
                                            <FormGroup>
                                                <Label for="notes">Notes</Label>
                                                <Input
                                                    type="textarea"
                                                    name="notes"
                                                    id="notes"
                                                    onChange= { (e) => setStateModalForm("notes", e.target.value)}
                                                />
                                                {/* {validator.message(
                                                    "area_description",
                                                    areaState.master.form.area_description,
                                                    "required"
                                                )} */}
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="">Periode Task</Label>
                                                <DateTimePicker 
                                                    min={new Date()}
                                                    isInline={true}
                                                    colLabel={"col-md-1"}
                                                    onChange={(a,b)=>{
                                                        setStateModalForm("start_date", a);
                                                    }}
                                                    format={"DD/MMM/YYYY"}
                                                    value={taskGuruState.form.start_date}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="">Sampai</Label>
                                                <DateTimePicker 
                                                    min={new Date()}
                                                    isInline={true}
                                                    colLabel={"col-md-1"}
                                                    onChange={(a,b)=>{
                                                        setStateModalForm("finish_date", a);
                                                    }}
                                                    format={"DD/MMM/YYYY"}
                                                    value={taskGuruState.form.finish_date}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="file">File Upload </Label>
                                                {/* <Input
                                                    type="file"
                                                    name="file"
                                                    id="file"
                                                    multiple="true"
                                                /> */}
                                                {/* {validator.message(
                                                    "area_description",
                                                    areaState.master.form.area_description,
                                                    "required"
                                                )} */}
                                                <Input
                                                type="text"
                                                className="form-control"
                                                value={this.state.uploadedFileName}
                                                readOnly
                                                invalid={this.state.isFormInvalid}
                                                />
                                                <Button 
                                                    accept={".jpg,.jpeg,.png"}
                                                    onClick={this.openFileBrowser.bind(this)}
                                                >
                                                    {/* {translate('upload_pallet_and_wooden_box')} */}
                                                    Browse
                                                </Button>
                                                <input
                                                    type="file"
                                                    hidden
                                                    accept={".jpg,.jpeg,.png"}
                                                    onChange={this.fileHandler.bind(this)}
                                                    ref={this.fileInput}
                                                    onClick={event => {
                                                    event.target.value = null;
                                                    }}
                                                    style={{ padding: "10px" }}
                                                    multiple={true}
                                                />
                                            </FormGroup>
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
                            }
                        </ModalBody>
                        <ModalFooter>
                        <Button size="sm" color="secondary" onClick={this.modalToggle}>Cancel</Button>{' '}
                        
                        {' '}
                        {taskGuruState.modal.type == "edit" &&
                            <Button size="sm" color="primary" onClick={() => this.update()}>{taskGuruState.modal.buttonText}</Button>
                        }
                        {taskGuruState.modal.type == "add" &&
                            <Button size="sm" color="primary" onClick={() => this.save()}>{taskGuruState.modal.buttonText}</Button>
                        }
                        </ModalFooter>
                    </Modal>
                </section>

            </div>
        )
    }

    render() {
//console.log('block render')
        let { taskGuruState } = this.props;
        return (
          <BlockUi
            tag="div"
            blocking={taskGuruState.loader}
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

const mapStateToProps = state => ({
    taskGuruState: state.taskGuru,
    accountState: state.account
});

export default connect(
    mapStateToProps,
    {...actions}
)(withTranslate(TaskGuruPerId))