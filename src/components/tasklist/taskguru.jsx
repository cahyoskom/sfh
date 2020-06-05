import React, {Component} from 'react';
import { connect } from "react-redux";
import { withTranslate } from "react-redux-multilingual";
import BlockUi from "react-block-ui";
import { Link, NavLink } from "react-router-dom";
import { 
    Button, FormGroup, Modal, ModalHeader, 
    ModalBody, ModalFooter, Col, Row, Label, Input } from "reactstrap";
import CustomFooterGuru from "../common/customFooterGuru";
// import Select from "../common/Select";
import 'react-widgets/dist/css/react-widgets.css';
import DateTimePicker from "../common/DatePicker";
// import Input from "../common/Input";
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
import zIndex from '@material-ui/core/styles/zIndex';

class TaskGuru extends Component {

    constructor (props) {
        super (props)

        this.state = {
            columns: [
                {
                    name: 'status',
                    label: 'Status',
                    options: {
                        filter: false,
                        sort: false,
                        print: false,
                        download: false,
                        customBodyRender: (value, tableMeta, updateValue) => {
                            if(value == 1){
                                return (
                                    <div>
                                        <i className="fa fa-check-circle" title="Submitted" style={{ color: "green" }}/>
                                    </div>
                                )
                            }else{
                                return (
                                    <div>
                                        <i className="fa fa-window-close" title="Belum Submit" style={{ color: "red" }}/>
                                    </div>
                                )
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
                            if(tableMeta.rowData[0] == true){
                                return (
                                <div>
                                    <p>{value}</p><br/>
                                    <p>{console.log('tblmt',tableMeta)}</p>
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
                        // empty: true,
                        filter: false,
                        sort: false,
                        print: false,
                        download: false,
                        customBodyRender: (value, tableMeta, updateValue) => {
                            if(tableMeta.rowData[0] == true){
                                return (
                                <div>
                                    <Button title="Detail Task" color="primary" size="sm">Detail</Button>&nbsp;
                                    <Button title="Arsipkan Task" color="secondary" size="sm">Arsipkan</Button>&nbsp;
                                    <Button title="Edit Task" color="info" style={{ color: "#fff" }} onClick={() => this.editTask()} size="sm">Edit</Button>&nbsp;
                                    <Button title="Delete Task" color="danger" style={{ color: "#fff" }} onClick={() => this.deleteTask(tableMeta)} size="sm">Delete</Button>
                                </div>
                                );
                            }
                            // else{                
                            //     return (
                            //     <div>
                            //         <Button title="Download" color="info" style={{ color: "#fff" }}>Download</Button>&nbsp;
                            //         <Button title="Upload" color="primary" style={{ color: "#fff" }} onClick={() => this.uploadTask(tableMeta, value)}>Upload</Button>
                            //     </div>
                            //     );
                            // }
                        }
                      }
                },
            ],               
            options : {
                 filterType: 'checkbox',
            },
            status:"all",
            isAddNew:false,
            isEdit:false
        }
        this.getList = this.getList.bind(this);
        this.uploadTask = this.uploadTask.bind(this);
        this.editTask = this.editTask.bind(this);
        this.modalToggle = this.modalToggle.bind(this);
        this.openFileBrowser = this.openFileBrowser.bind(this);
        this.fileInput = React.createRef();
        this.onClickSignOut = this.onClickSignOut.bind(this);
        this.validator = new SimpleReactValidator();
        this.save = this.save.bind(this);
        // this.update = this.update.bind(this);
    }

    componentDidMount(){
        this.getList();
        let {taskGuruState, getClassList, getSubjectList} =this.props;
        getClassList();
        getSubjectList();
        console.log("detaaa", taskGuruState);
    }
    

    getList(){
        let { getTaskGuruList } = this.props;
        getTaskGuruList();
    }

    uploadTask(tableMeta, value){
        let { getSubjectList, getClassList, setModal } = this.props;
        getSubjectList();
        getClassList();

        setModal("type", "add")
        setModal("title", "Upload Task")
        setModal("buttonText", "Upload")
        setModal("show", true)
        this.setState( prevState => ({
            ...prevState,
            isAddNew:true
        })
        );
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

    editTask(tableMeta, value){
        console.log(tableMeta,'asa');
        // console.log(value,'nasa');
        let {setModal} = this.props;
        setModal("type", "edit")
        setModal("title", "Edit Task")
        setModal("buttonText", "Update")
        setModal("show", true)
    }

    deleteTask(tableMeta) {
        const { deleteTask } = this.props;
        console.log('tabelmeta',tableMeta);
        let ids = [];
        ids.push(tableMeta.rowData[2]);
        messageBox.confirmDelete(ids, deleteTask);
    }

    modalToggle() {
        const { taskGuruState, setModal } = this.props;
        setModal("show", !taskGuruState.modal.show)
    }

    openFileBrowser = () => {
        this.fileInput.current.click();
    };

    // fileHandler = event => {
    //     let { setLoader, setOCRFile } = this.props;
    //     this.setState({
    //       dataLoaded: false
    //     });
    //     if (event.target.files.length) {
    //       let fileObj = event.target.files[0];
    //       let fileName = fileObj.name;
    //       let extension = fileName.slice(fileName.lastIndexOf(".") + 1);
    
    //       if(this.props.ocr.upload.acceptedFileType.includes(extension)){
    //         if(fileObj.size >= 500000){
    //           this.setState({
    //             isFormInvalid: true,
    //             uploadedFileName: "",
    //             errorMessage: "File too large. Maximum file size 500 KB."
    //           });
    //           setOCRFile(null);
    //         }else{
    //           this.setState({
    //             uploadedFileName: fileName,
    //             isFormInvalid: false,
    //             errorMessage: ""
    //           });
    //           setOCRFile(fileObj);
    //         }
    //       }else{
    //         this.setState({
    //           isFormInvalid: true,
    //           uploadedFileName: "",
    //           errorMessage: "Please select a "+ this.props.ocr.upload.acceptedFileType +" file only."
    //         });
    //         setOCRFile(null);
    //       }
    //     }
    //   };

    onClickSignOut(){
        localStorage.clear()
        window.location.href = process.env.PUBLIC_URL
	}

    renderView (){
        let { taskGuruState, setStateTaskListFilter, setStateModalForm, getTaskGuruList } = this.props;

        const options = {
            responsive:"scroll",
            filterType: 'checkbox',
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
                    <h3><i className="mdi mdi-table-edit"/>Task List Guru</h3>
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
                                    <div className="row">
                                        <div className="col-lg-3">
                                        <Label for="">Kelas</Label>
                                        <Select
                                            // className={"col-md-3"}
                                            style={{position:"absolute"}}
                                            id="class" 
                                            name="class" 
                                            defaultValue={taskGuruState.filter.class_id}
                                            options={taskGuruState.dataSourceClass} 
                                            onChange= { 
                                                (e) => setStateTaskListFilter("class_id", e.value)
                                                // getTaskGuruList
                                            }
                                            
                                        />
                                        <Label for="">Mata Pelajaran</Label>
                                        <Select
                                            // className={"col-md-3"}
                                            style={{position:"absolute"}}
                                            id="subject" 
                                            name="subject" 
                                            defaultValue={taskGuruState.filter.subject_id}
                                            options={taskGuruState.dataSourceSubject} 
                                            onChange= { 
                                                (e) => setStateTaskListFilter("subject_id", e.value)
                                                // getTaskGuruList
                                            }
                                            
                                        />
                                        </div>
                                        <div  className="col-md-4">
                                        <Label for="subject">mulai</Label>
                                        <DateTimePicker 
                                            min={new Date()}
                                            isInline={true}
                                            colLabel={"col-md-1"}
                                            onChange={(a,b)=>{
                                                setStateTaskListFilter("start_date", a);
                                            }}
                                            format={"DD/MMM/YYYY"}
                                            value={taskGuruState.filter.start_date}
                                        />
                                        <label>sampai</label>
                                        <DateTimePicker 
                                            min={new Date()}
                                            isInline={true}
                                            colLabel={"col-md-1"}
                                            onChange={(a,b)=>{
                                                setStateTaskListFilter("end_date", a);
                                            }}
                                            format={"DD/MMM/YYYY"}
                                            value={taskGuruState.filter.end_date}
                                        />
                                        </div>
                                        <div className="col-md-2">
                                            <Button onClick={getTaskGuruList}>Filter</Button>
                                        </div>
                                    </div>


                                    <MuiThemeProvider>
                                    <MUIDataTable
                                        // title={<div><Button onClick={this.submitTask}><i className="mdi mdi-plus"></i>&nbsp;Submit Selected Task</Button></div>}
                                        data={taskGuruState.data}
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
                            {/* {taskSiswaState} */}
                            {/* <AsyncPage page={"master-area-form"} fallback={<FormLoader/>} validator={this.validator} ref={this.formArea} /> */}
                            {this.state.isAddNew &&
                                <Formik
                                enableReinitialize={true}
                                initialValues={taskGuruState.taskDetail}
                                // validationSchema={add_editSchema}
                                onSubmit={values => {
                                    // same shape as initial values
                                    console.log(values)
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
                                                        // label='Mata Pelajaran'
                                                        // onChange={ (a, b)  => {
                                                        // setFieldValue(field.name,  b);
                                                        // handleStateUpdateMenu(field.name,  b);
                                                        // }}
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
                                                        id={"subject"}
                                                        options={taskGuruState.dataSourceSubject}
                                                        onChange= { (e) => setStateModalForm("subject_id", e.value)}
                                                        // label='Mata Pelajaran'
                                                        // onChange={ (a, b)  => {
                                                        // setFieldValue(field.name,  b);
                                                        // handleStateUpdateMenu(field.name,  b);
                                                        // }}
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
                                                    // defaultValue={areaState.master.form.area_description}
                                                    // onBlur={e => setStateMasterAreaForm(e.target.id, e.target.value)}
                                                />
                                                {/* {validator.message(
                                                    "area_description",
                                                    areaState.master.form.area_description,
                                                    "required"
                                                )} */}
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="file">File Upload</Label>
                                                <Input
                                                    type="file"
                                                    name="file"
                                                    id="file"
                                                    // defaultValue={areaState.master.form.area_description}
                                                    // onBlur={e => setStateMasterAreaForm(e.target.id, e.target.value)}
                                                />
                                                {/* {validator.message(
                                                    "area_description",
                                                    areaState.master.form.area_description,
                                                    "required"
                                                )} */}
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
                        {/* <Button 
                            color="primary" 
                            onClick={this.openFileBrowser.bind(this)}
                        >Add/Browse</Button> */}
                        <input
                            type="file"
                            hidden
                            // accept={ocr.upload.acceptedFileType}
                            // onChange={this.fileHandler.bind(this)}
                            ref={this.fileInput}
                            // onClick={event => {
                            //     event.target.value = null;
                            // }}
                            // style={{ padding: "10px" }}
                        />
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
console.log('block render')
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
    taskGuruState: state.taskGuru
});

export default connect(
    mapStateToProps,
    {...actions}
)(withTranslate(TaskGuru))