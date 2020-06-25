import React, {Component} from 'react';
import { connect } from "react-redux";
import { withTranslate } from "react-redux-multilingual";
import BlockUi from "react-block-ui";
import { Link, NavLink } from "react-router-dom";
import { 
    Button, FormGroup, Modal, ModalHeader, 
    ModalBody, ModalFooter, Col, Row, Label, Input, InputGroup } from "reactstrap";
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

class TaskGuru extends Component {

    constructor (props) {
        super (props)
        this.state = {
            columns: [
                {//0
                    name: 'status',
                    label: 'Status',
                    options: {
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
                {//1
                    name: 'notes',
                    label: 'Notes',
                    options: {
                        filter: false,
                        sort: false,
                        customBodyRender: (value, tableMeta, updateValue) => {
                            if(value){
                                return (
                                <div>
                                    <span style={{backgroundColor:"#5bb1e4", padding:"5px", borderRadius:"25px"}}>{tableMeta.rowData[3] + " - " + tableMeta.rowData[2]}</span>
                                    <p>{value}</p>
                                    <span style={{backgroundColor:"rgb(93, 228, 91)", padding:"5px", borderRadius:"25px"}}>
                                        {"Published : " + moment(tableMeta.rowData[11]).format("DD-MM-YYYY").toString()}
                                    </span><br/><br/>
                                    <span style={{backgroundColor:"#5bb1e4", padding:"5px", borderRadius:"25px"}}>
                                        {"Duration : " + moment(tableMeta.rowData[5]).format("DD-MM-YYYY").toString() + " - " + moment(tableMeta.rowData[6]).format("DD-MM-YYYY").toString()}
                                    </span>
                                </div>
                                );
                            }
                        }
                    }
                },
                {//2
                    name: "class_name",
                    label: "Kelas",
                    options: {
                        display: false
                    }
                },
                {//3
                    name: "subject_name",
                    label: "Mata Pelajaran",
                    options: {
                        display: false
                    }
                },
                {//4
                    name: "title",
                    label: "Task",
                    options: {
                        display: false
                    }
                },
                {//5
                    name: "start_date",
                    label: "Start",
                    options: {
                        display: false,
                    }
                },
                {//6
                    name: "finish_date",
                    label: "Finish",
                    options: {
                        display: false,
                    }
                },
                {//7
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
                                    {/* <Button title="Detail Task" color="primary" size="sm" 
                                    onClick={() => this.detailTask(tableMeta)}
                                    >Detail</Button>&nbsp; */}
                                    <Link to={`${process.env.PUBLIC_URL}/taskguru/` + value}><Button title="Detail Task" color="primary" size="sm">Detail</Button></Link>&nbsp;
                                    <Button title="Arsipkan Task" color="secondary" size="sm" onClick={() => this.archivedTask(tableMeta)}>Arsipkan</Button>&nbsp;
                                    <Button title="Edit Task" color="info" style={{ color: "#fff" }} onClick={() => this.editTask(tableMeta)} size="sm">Edit</Button>&nbsp;
                                    <Button title="Delete Task" color="danger" style={{ color: "#fff" }} onClick={() => this.deleteTask(tableMeta)} size="sm">Delete</Button>
                                </div>
                                );
                            }
                        }
                      }
                },
                {//8
                    name: "class_id",
                    label: "class_id",
                    options: {
                        display: false
                    }
                },
                {//9
                    name: "subject_id",
                    label: "subject_id",
                    options: {
                        display: false
                    }
                },               
                {//10
                    name: "assignor_id",
                    label: "assignor_id",
                    options: {
                        display: false
                    }
                },
                {//11
                    name: "publish_date",
                    label: "publish_date",
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
            dataSourceClass:this.props.taskGuruState.dataSourceClass,
            uploadedFileName: [],
            isFormInvalid:false,
            listOfFile: []
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
        this.deleteFile = this.deleteFile.bind(this);
        this.clearFilter = this.clearFilter.bind(this);
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

    clearFilter(){
        let { setStateTaskListFilter } = this.props;
        setStateTaskListFilter("class_id", "")
        setStateTaskListFilter("subject_id", "")
        setStateTaskListFilter("start_date", new Date())
        setStateTaskListFilter("finish_date", new Date())
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
        let { getSubjectList, getClassList, setModal, setStateModalForm, getTaskGuruById } = this.props;
        getSubjectList();
        getClassList();  
        setStateModalForm("task_id", data.rowData[7])   
        getTaskGuruById();   

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
        this.setState( state => ({
            ...state,
            uploadedFileName: []
        }))
    }

    openFileBrowser = () => {
        this.fileInput.current.click();
    };

    fileHandler = event => {
        let { setLoader, setStateModalForm,taskGuruState } = this.props;
        console.log('handel file', event.target.files);
        // console.log('fileeeesss', taskGuruState.form.files);
        if (event.target.files.length) {
            var fileObj = [];
            var fileName = [];
            var extension = [];
            // let i;
            if (event.target.files.length >= 1) {
                for(var i=0; i<event.target.files.length; i++){
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
        setStateModalForm('files', fileObj);
        console.log('pailojek',fileObj);
        console.log('pailojeknem',fileName);
        }
    };

    onClickSignOut(){
        localStorage.clear()
        window.location.href = process.env.PUBLIC_URL
    }
    
    handleMultiChange(option) {
        let { setStateTaskListFilter } = this.props;
        setStateTaskListFilter("class_id", option);
    }

    deleteFile(task_file_id){
        let { guruDeleteTaskFile, setStateModalForm } = this.props;
        setStateModalForm("deleteFileIds", task_file_id);
        guruDeleteTaskFile();
    }

    renderView(){
        let { taskGuruState, setStateTaskListFilter, setStateModalForm, getTaskGuruList } = this.props;

        const options = {
            responsive:"scroll",
            filter:false,
            search:false,
            download:false,
            print:false,
            viewColumns:false,
            selectableRows:'none',
        };

        let filesToUpload = this.state.uploadedFileName;
        let filePreviews = null;
        let filePreview = [];
        if(filesToUpload.length != 0){
            for(let i=0;i<filesToUpload.length;i++){
                filePreview.push(
                    <Input
                    type="text"
                    className="form-control"
                    style={{marginBottom:"5px"}}
                    value={this.state.uploadedFileName[i]}
                    readOnly
                    />
                )   
            }
        }

        console.log(taskGuruState.form.files);

        let listOfFile = [];
        if(taskGuruState.form.files != null || taskGuruState.form.files != undefined){
            for(let i=0;i<taskGuruState.form.files.length;i++){
                listOfFile.push(
                    <InputGroup style={{marginBottom:"5px"}}>
                        <Input
                        type="text"
                        className="form-control"
                        value={taskGuruState.form.files[i].filename}
                        readOnly
                        />                        
                        <Button 
                        color="danger" 
                        onClick={() => { this.deleteFile(taskGuruState.form.files[i].task_file_id); }}
                        >X</Button>
                    </InputGroup>
                )   
            }
        }

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
                                            {/* <label>Kelas : SD 5</label><br/>
                                            <label>NIP : 011232001</label> */}
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
                                            style={{position:"absolute"}}
                                            id="class" 
                                            name="class" 
                                            placeholder="Pilih Kelas"
                                            defaultValue={taskGuruState.dataSourceClass.filter(option => option.value === taskGuruState.filter.class_id)}
                                            options={taskGuruState.dataSourceClass} 
                                            closeMenuOnSelect={false}
                                            onChange= { 
                                                this.handleMultiChange
                                            }
                                            isMulti
                                        /><br/>
                                        <Label for="">Mata Pelajaran</Label>
                                        <Select
                                            style={{position:"absolute"}}
                                            id="subject" 
                                            name="subject" 
                                            defaultValue={taskGuruState.filter.subject_id}
                                            options={taskGuruState.dataSourceSubject} 
                                            onChange= { 
                                                (e) => setStateTaskListFilter("subject_id", e.value)
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
                                                setStateTaskListFilter("finish_date", a);
                                            }}
                                            format={"DD/MMM/YYYY"}
                                            value={taskGuruState.filter.finish_date}
                                        />
                                        </div>
                                        <div className="col-md-4">
                                            <Button color="primary" onClick={getTaskGuruList}>Filter</Button>&nbsp;
                                            {/* <Button color="warning" onClick={() => this.clearFilter()}>Reset</Button> */}
                                        </div>
                                    </div>


                                    <MuiThemeProvider>
                                    <MUIDataTable
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
                                                <Label for="file">File Upload </Label> {"  "}
                                                <Button 
                                                    accept={".jpg,.jpeg,.png"}
                                                    onClick={this.openFileBrowser.bind(this)}
                                                    size="sm"
                                                    color="info"
                                                >
                                                    Browse
                                                </Button>
                                                <div>
                                                {filePreview}
                                                </div>
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

                            {this.state.isEdit &&
                                <Formik
                                enableReinitialize={true}
                                initialValues={taskGuruState.taskDetail}
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
                                                        value={taskGuruState.dataSourceClass.filter(option => option.value === taskGuruState.form.class_id)}
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
                                                name="subject_id"
                                                render={({ field }) => (
                                                    <div>
                                                    <Label for="subject">Mata Pelajaran</Label>
                                                    <Select
                                                        {...field}
                                                        // id={"subject"}
                                                        value={taskGuruState.dataSourceSubject.filter(option => option.value === taskGuruState.form.subject_id)}
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
                                                    value={taskGuruState.form.notes}
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
                                                <Label for="file">File Upload</Label> {"  "}
                                                <Button 
                                                    accept={".jpg,.jpeg,.png"}
                                                    onClick={this.openFileBrowser.bind(this)}
                                                    size="sm"
                                                    color="info"
                                                >
                                                    Browse
                                                </Button>
                                                <div>
                                                {filePreview}
                                                </div>
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
                                                <Label>List of file</Label>
                                                <div>
                                                {listOfFile}
                                                {/* {console.log('www',taskGuruState.form.files)} */}
                                                </div>
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
                                initialValues={taskGuruState.taskDetail}
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
                                                        options={taskGuruState.dataSourceClass}
                                                        value={taskGuruState.dataSourceClass.filter(option => option.value === taskGuruState.form.class_id)}
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
                                                        options={taskGuruState.dataSourceSubject}
                                                        value={taskGuruState.dataSourceSubject.filter(option => option.value === taskGuruState.form.subject_id)}
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
                                                    defaultValue={taskGuruState.form.title}
                                                    disabled={true}
                                                />
                                                </FormGroup>
                                            <FormGroup>
                                                <Label for="notes">Notes</Label>
                                                <Input
                                                    type="textarea"
                                                    name="notes"
                                                    id="notes"
                                                    value={taskGuruState.form.notes}
                                                    disabled={true}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="">Periode Task</Label>
                                                <DateTimePicker 
                                                    isInline={true}
                                                    colLabel={"col-md-1"}
                                                    format={"DD/MMM/YYYY"}
                                                    value={taskGuruState.form.start_date}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="">Sampai</Label>
                                                <DateTimePicker 
                                                    isInline={true}
                                                    colLabel={"col-md-1"}
                                                    format={"DD/MMM/YYYY"}
                                                    value={taskGuruState.form.finish_date}
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

    render(){
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
)(withTranslate(TaskGuru))