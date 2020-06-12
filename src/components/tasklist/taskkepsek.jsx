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

class TaskKepsek extends Component {

    constructor (props) {
        super (props)
        //console.log('vrovs',props)
        this.state = {
            columns: [
                {
                    name: 'status',
                    label: 'Status',
                    options: {
                        display:false,
                        filter: false,
                        sort: false,
                        print: false,
                        download: false,
                        customBodyRender: (value, tableMeta, updateValue) => {
                            if(value){
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
                    label: 'Notes',
                    options: {
                        filter: false,
                        sort: false,
                        customBodyRender: (value, tableMeta, updateValue) => {
                            if(value){
                                return (
                                <div>
                                    <p>{value}</p>
                                    <p>{tableMeta.rowData[3]}, {tableMeta.rowData[2]}</p>
                                </div>
                                );
                            }
                        }
                    }
                },
                {
                    name: "class_name",
                    label: "Kelas",
                    options: {
                        display: false
                    }
                },
                {
                    name: "subject_name",
                    label: "Mata Pelajaran",
                    options: {
                        display: false
                    }
                },
                {
                    name: "title",
                    label: "Task",
                    options: {
                        display: false
                    }
                },
                {
                    name: "start_date",
                    label: "Start",
                    options: {
                        display: false,
                        customBodyRender: (value) => {
                            if(value){
                                return (
                                    <div>
                                        <p>{moment(value).format("dddd YYYY-MM-DD").toString()}</p>
                                    </div>
                                );
                            }
                        }
                    }
                },
                {
                    name: "finish_date",
                    label: "Finish",
                    options: {
                        display: false,
                        customBodyRender: (value) => {
                            if(value){
                                return (
                                    <div>
                                        <p>{moment(value).format("dddd YYYY-MM-DD").toString()}</p>
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
                            if(value){
                                return (
                                <div>
                                    <Button title="Detail Task" color="primary" size="sm" onClick={() => this.detailTask(tableMeta)}>Detail</Button>&nbsp;
                                </div>
                                );
                            }
                        }
                      }
                },
                {
                    name: "class_id",
                    label: "class_id",
                    options: {
                        display: false
                    }
                },
                {
                    name: "subject_id",
                    label: "subject_id",
                    options: {
                        display: false
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
            dataSourceClass:this.props.taskKepsekState.dataSourceClass,
        }
        this.getList = this.getList.bind(this);
        this.uploadTask = this.uploadTask.bind(this);
        this.editTask = this.editTask.bind(this);
        this.detailTask = this.detailTask.bind(this);
        this.modalToggle = this.modalToggle.bind(this);
        this.openFileBrowser = this.openFileBrowser.bind(this);
        this.fileInput = React.createRef();
        this.onClickSignOut = this.onClickSignOut.bind(this);
        this.validator = new SimpleReactValidator();
        this.save = this.save.bind(this);
        this.handleMultiChange = this.handleMultiChange.bind(this);
        // this.update = this.update.bind(this);
    }

    componentDidMount(){
        let {kepsekGetClassList, kepsekGetSubjectList} =this.props;
        // document.getElementById('sticky').style.display = "none"
        this.getList();        
        kepsekGetClassList();
        kepsekGetSubjectList();
    }
    

    getList(){
        let { kepsekGetTaskList } = this.props;
        kepsekGetTaskList();
    }

    uploadTask(tableMeta, value){
        let { kepsekGetSubjectList, kepsekGetClassList, setModal } = this.props;
        kepsekGetClassList();
        kepsekGetSubjectList();

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
        let { kepsekGetSubjectList, kepsekGetClassList, setModal } = this.props;
        kepsekGetClassList();
        kepsekGetSubjectList();

        // setStateModalForm("class_id", data.rowData[8])
        // setStateModalForm("subject_id", data.rowData[9])
        // setStateModalForm("title", data.rowData[4])
        // setStateModalForm("notes", data.rowData[1])
        // setStateModalForm("start_date", data.rowData[5])
        // setStateModalForm("finish_date", data.rowData[6])

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
        let { kepsekGetSubjectList, kepsekGetClassList, setModal } = this.props;
        kepsekGetClassList();
        kepsekGetSubjectList();

        // setStateModalForm("class_id", data.rowData[8])
        // setStateModalForm("subject_id", data.rowData[9])
        // setStateModalForm("title", data.rowData[4])
        // setStateModalForm("notes", data.rowData[1])
        // setStateModalForm("start_date", data.rowData[5])
        // setStateModalForm("finish_date", data.rowData[6])
        
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
        const { deleteTask } = this.props;
        let ids = [];
        ids.push(tableMeta.rowData[2]);
        messageBox.confirmDelete(ids, deleteTask);
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
        const { putArea } = this.props;
        // if (this.validator.allValid()) {
            putArea();
        // } else {
        //     this.validator.showMessages();
        //     this.formArea.current.forceUpdate();
        // }
    }  

    modalToggle() {
        const { taskKepsekState, setModal } = this.props;
        setModal("show", !taskKepsekState.modal.show)
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
    
    handleMultiChange(option) {
        let { setStateTaskListFilter } = this.props;
        setStateTaskListFilter("class_id", option);
    }

    renderView (){
        let { taskKepsekState, setStateTaskListFilter, setStateModalForm, kepsekGetTaskList } = this.props;

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
                    <h3 className="text-left"><i className="mdi mdi-table-edit"/>Kepala Sekolah</h3>
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
                                        <p>{moment(taskKepsekState.now).format("dddd YYYY-MM-DD").toString()}</p>
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
                                        <div className="col-lg-4">
                                        <Label for="">Kelas</Label>
                                        <Select
                                            // className={"col-md-3"}
                                            style={{position:"absolute"}}
                                            id="class" 
                                            name="class" 
                                            placeholder="Pilih Kelas"
                                            // defaultValue={taskKepsekState.filter.class_id}
                                            defaultValue={taskKepsekState.dataSourceClass.filter(option => option.value === taskKepsekState.filter.class_id)}
                                            options={taskKepsekState.dataSourceClass} 
                                            closeMenuOnSelect={false}
                                            onChange= { 
                                                // (e) => setStateTaskListFilter("class_id", e.value)
                                                this.handleMultiChange
                                                // kepsekGetTaskList
                                            }
                                            isMulti
                                        /><br/>
                                        <Label for="">Mata Pelajaran</Label>
                                        <Select
                                            // className={"col-md-3"}
                                            style={{position:"absolute"}}
                                            id="subject" 
                                            name="subject" 
                                            defaultValue={taskKepsekState.filter.subject_id}
                                            options={taskKepsekState.dataSourceSubject} 
                                            onChange= { 
                                                (e) => setStateTaskListFilter("subject_id", e.value)
                                                // kepsekGetTaskList
                                            }
                                            multi
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
                                            value={taskKepsekState.filter.start_date}
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
                                            value={taskKepsekState.filter.end_date}
                                        />
                                        </div>
                                        <div className="col-md-2">
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
                                    </MuiThemeProvider><br/>

                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-3">
                                <a href="#">Pengaturan</a> | <a href="#" onClick={() => { this.onClickSignOut() }}>Logout</a>
                            </div>
                        </div>
                    </div>

                    <Modal isOpen={taskKepsekState.modal.show} fade={false} backdrop={'static'} toggle={this.modalToggle}>
                        <ModalHeader toggle={this.modalToggle}>{taskKepsekState.modal.title}</ModalHeader>
                        <ModalBody>
                            {/* {taskSiswaState} */}
                            {/* <AsyncPage page={"master-area-form"} fallback={<FormLoader/>} validator={this.validator} ref={this.formArea} /> */}
                            {this.state.isAddNew &&
                                <Formik
                                enableReinitialize={true}
                                initialValues={taskKepsekState.taskDetail}
                                // validationSchema={add_editSchema}
                                onSubmit={values => {
                                    // same shape as initial values
                                    //console.log(values)
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
                                                        options={taskKepsekState.dataSourceClass}
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
                                                        // id={"subject"}
                                                        options={taskKepsekState.dataSourceSubject}
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
                                                    defaultValue={taskKepsekState.form.title}
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
                                                <Label for="">Periode Task</Label>
                                                <DateTimePicker 
                                                    min={new Date()}
                                                    isInline={true}
                                                    colLabel={"col-md-1"}
                                                    onChange={(a,b)=>{
                                                        setStateModalForm("start_date", a);
                                                    }}
                                                    format={"DD/MMM/YYYY"}
                                                    value={taskKepsekState.form.start_date}
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
                                                    value={taskKepsekState.form.finish_date}
                                                />
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

                            {this.state.isEdit &&
                                <Formik
                                enableReinitialize={true}
                                initialValues={taskKepsekState.taskDetail}
                                // validationSchema={add_editSchema}
                                onSubmit={values => {
                                    // same shape as initial values
                                    //console.log(values)
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
                                                name="class_id"
                                                render={({ field }) => (
                                                    <div>
                                                    <Label for="kelas">Assign to</Label>
                                                    <Select
                                                        {...field}
                                                        id={"kelas"}
                                                        value={taskKepsekState.dataSourceClass.filter(option => option.value === taskKepsekState.form.class_id)}
                                                        options={taskKepsekState.dataSourceClass}
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
                                                name="subject_id"
                                                render={({ field }) => (
                                                    <div>
                                                    <Label for="subject">Mata Pelajaran</Label>
                                                    <Select
                                                        {...field}
                                                        // id={"subject"}
                                                        value={taskKepsekState.dataSourceSubject.filter(option => option.value === taskKepsekState.form.subject_id)}
                                                        options={taskKepsekState.dataSourceSubject}
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
                                                    defaultValue={taskKepsekState.form.title}
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
                                                    value={taskKepsekState.form.notes}
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
                                                <Label for="">Periode Task</Label>
                                                <DateTimePicker 
                                                    min={new Date()}
                                                    isInline={true}
                                                    colLabel={"col-md-1"}
                                                    onChange={(a,b)=>{
                                                        setStateModalForm("start_date", a);
                                                    }}
                                                    format={"DD/MMM/YYYY"}
                                                    value={taskKepsekState.form.start_date}
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
                                                    value={taskKepsekState.form.finish_date}
                                                />
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

                            {this.state.isDetail &&
                                <Formik
                                enableReinitialize={true}
                                initialValues={taskKepsekState.taskDetail}
                                onSubmit={values => {
                                    // same shape as initial values
                                    //console.log(values)
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
                                                        options={taskKepsekState.dataSourceClass}
                                                        value={taskKepsekState.dataSourceClass.filter(option => option.value === taskKepsekState.form.class_id)}
                                                        isDisabled={true}
                                                    />
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
                                                        options={taskKepsekState.dataSourceSubject}
                                                        value={taskKepsekState.dataSourceSubject.filter(option => option.value === taskKepsekState.form.subject_id)}
                                                        isDisabled={true}
                                                    />
                                                    </div>
                                                )}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="title">Nama Task</Label>
                                                <Input
                                                    name="title"
                                                    id="title"
                                                    defaultValue={taskKepsekState.form.title}
                                                    disabled={true}
                                                />
                                                </FormGroup>
                                            <FormGroup>
                                                <Label for="notes">Notes</Label>
                                                <Input
                                                    type="textarea"
                                                    name="notes"
                                                    id="notes"
                                                    value={taskKepsekState.form.notes}
                                                    disabled={true}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="">Periode Task</Label>
                                                <DateTimePicker 
                                                    isInline={true}
                                                    colLabel={"col-md-1"}
                                                    format={"DD/MMM/YYYY"}
                                                    value={taskKepsekState.form.start_date}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="">Sampai</Label>
                                                <DateTimePicker 
                                                    isInline={true}
                                                    colLabel={"col-md-1"}
                                                    format={"DD/MMM/YYYY"}
                                                    value={taskKepsekState.form.finish_date}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="file">File</Label>                                                
                                            </FormGroup>
                                        </Col>  
                                        </Row>
                                                                        
                                        </ModalBody>
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
                        {taskKepsekState.modal.type == "edit" &&
                            <Button size="sm" color="primary" onClick={() => this.update()}>{taskKepsekState.modal.buttonText}</Button>
                        }
                        {taskKepsekState.modal.type == "add" &&
                            <Button size="sm" color="primary" onClick={() => this.save()}>{taskKepsekState.modal.buttonText}</Button>
                        }
                        {taskKepsekState.modal.type == "detail" &&
                            <Button size="sm" color="primary" onClick={() => this.editTask()}>{taskKepsekState.modal.buttonText}</Button>
                        }
                        </ModalFooter>
                    </Modal>
                </section>

            </div>
        )
    }

    render() {
//console.log('block render')
        let { taskKepsekState } = this.props;
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

const mapStateToProps = state => ({
    taskKepsekState: state.taskKepsek
});

export default connect(
    mapStateToProps,
    {...actions}
)(withTranslate(TaskKepsek))