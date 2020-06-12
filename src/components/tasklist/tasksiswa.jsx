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
import CustomInput from "../common/CostumInput";
import "react-datepicker/dist/react-datepicker.css";
import './tasksiswa.css';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import * as actions from "../../actions";
import moment from 'moment'
import Select from 'react-select'
import { Formik, Form, Field } from 'formik';
import { Checkbox } from '@material-ui/core';

class TaskSiswa extends Component {

    constructor (props) {
        super (props)

        this.state = {
            columns: [
                {
                    name: 'collection_status',
                    label: 'Status',
                    options: {
                        filter: false,
                        sort: false,
                        print: false,
                        download: false,
                        customBodyRender: (value, tableMeta, updateValue) => {
                            if(value == 4){
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
                        // empty: true,
                        filter: false,
                        sort: false,
                        print: false,
                        download: false,
                        customBodyRender: (value, tableMeta, updateValue) => {
                            return (
                              <div>
                                <Button title="Download" color="info" style={{ color: "#fff" }}>Download</Button>&nbsp;
                                <Button title="Upload" color="primary" style={{ color: "#fff" }} onClick={() => this.uploadTask(tableMeta)}>Upload</Button>
                              </div>
                            );
                        }
                      }
                },
                {
                    name: "task_collection_id",
                    label: "Task",
                    options: {
                        display: false
                    }
                },
                {
                    name:"checkbox",
                    label:"Select",
                    options: {
                        customBodyRender: (value, tableMeta, updateValue) => {
                            if(tableMeta.rowData[7] != 0){
                                return (                                
                                    <div>
                                      <Checkbox
                                      onChange={() => this.handleRowClick(tableMeta)}
                                      isChecked={value}
                                      />
                                    </div>
                                );       
                            }
                            else{
                                return (                                
                                    <div>
                                      <Checkbox
                                      disabled={true}
                                      />
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
            uploadedFileName:[],
            fileObj:[],
            task_collection_ids: [],
        }
        this.getList = this.getList.bind(this);
        this.uploadTask = this.uploadTask.bind(this);
        this.submitTask = this.submitTask.bind(this);
        this.modalToggle = this.modalToggle.bind(this);
        this.openFileBrowser = this.openFileBrowser.bind(this);
        this.fileInput = React.createRef();
        this.onClickSignOut = this.onClickSignOut.bind(this);
        this.save = this.save.bind(this);
        this.handleRowClick = this.handleRowClick.bind(this);
    }

    componentDidMount(){
        this.getList();
        let {taskSiswaState, accountState} =this.props;
    }

    getList(){
        let { getTaskSiswaList } = this.props;
        getTaskSiswaList();
    }

    save() {
        const { studentPutCollectionFiles } = this.props;
        // if (this.validator.allValid()) {
            studentPutCollectionFiles();
        // } else {
        //   this.validator.showMessages();
        //   this.formArea.current.forceUpdate();
        // }
    }

    uploadTask(tableMeta){
        let {setModal, setStateModalForm, studentPutCollection, taskSiswaState} = this.props;
        // if(taskSiswaState.form.task_collection_id == 0){
            if(tableMeta.rowData[7] == 0){
                setStateModalForm('task_id', tableMeta.rowData[6]);
                studentPutCollection();    
                console.log('create lembar jawaban');
            }
            else{
                setStateModalForm("task_id", tableMeta.rowData[6]);
                setStateModalForm("task_collection_id", tableMeta.rowData[7]);
                console.log('pakai lembar jawaban yg sudah dibuat');
            }
        // }
        // else{
        //     setStateModalForm("task_id", tableMeta.rowData[6]);
        //     setStateModalForm("task_collection_id", tableMeta.rowData[7]);
        //     console.log('pakai lembar jawaban yg sudah dibuat else');
        // }
        
        setModal("type", "add")
        setModal("title", "Upload Files")
        setModal("buttonText", "Upload")
        setModal("show", true)
        this.setState( prevState => ({
            ...prevState,
            isAddNew:true,
        })
        );
    }

    submitTask(){
        let { studentSubmitCollection, setStateModalForm } = this.props;
        setStateModalForm("task_collection_ids", this.state.task_collection_ids);
        studentSubmitCollection();
    }

    modalToggle() {
        const { taskSiswaState, setModal } = this.props;
        setModal("show", !taskSiswaState.modal.show)
    }

    openFileBrowser = () => {
        this.fileInput.current.click();
    };

    fileHandler = event => {
        let { setLoader, setStateModalForm ,taskSiswaState} = this.props;
        console.log('handel file', event.target.files);
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
        setStateModalForm('task_collection_id', taskSiswaState.form.task_collection_id);
        console.log('pailojek',fileObj);
        console.log('pailojeknem',fileName);
        }
    };

    onClickSignOut(){
        localStorage.clear()
        window.location.href = process.env.PUBLIC_URL
    }
    
    handleRowClick(tableMeta){
        let { setStateModalForm, taskSiswaState } = this.props;
        setStateModalForm("rows", tableMeta.rowData[7]);
        this.setState(prevState => ({
            task_collection_ids: [...prevState.task_collection_ids, tableMeta.rowData[7]]
        }));
    };

    renderView (){
        let { taskSiswaState, setStateTaskListFilter, getTaskSiswaList, accountState } = this.props;

        const options = {
            responsive:"scroll",
            // filterType: 'checkbox',
            pagination:false,
            filter:false,
            search:false,
            download:false,
            print:false,
            viewColumns:false,
            selectableRows:'none',
            // selectableRows:'multiple',
            // selectableRowsOnClick: true,
            // onRowClick: this.handleRowClick.bind(this),
            // isRowSelectable:this.handleRowClick.bind(this)
            // selectableRowsOnClick: true,
            // rowsSelected: this.state.rowsSelected,
            // onRowClick: (rowsSelected, allRows) => {
            //     if (this.state.selectableRows === 'multiple') {
            //         this.setState({ rowsSelected: allRows.map(row => row.dataIndex) });
            //         console.log('auuuuuu');
            //     }
            //     console.log('xxxauuuuuu', this.tableState);
            // }
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
                    value={this.state.uploadedFileName[i]}
                    readOnly
                    />
                )   
            }
        }

        return (
            <div>
                
                <section className="login-page section-b-space">
                    <div className="container">
                    <h3><i className="mdi mdi-table-edit"/>Task List Siswa</h3>
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
                                        {/* <p>{taskSiswaState.stardet.toString()}</p> */}
                                        <p>{moment(taskSiswaState.now).format("dddd YYYY-MM-DD").toString()}</p>
                                    </div><br/>
                                    <form className="theme-form">
                                        <div className="form-group">
                                        <label>Nama : {accountState.roles[0].student_name}</label><br/>
                                        <label>Kelas : {accountState.roles[0].class_name}</label><br/>
                                            <label>NIP : {accountState.roles[0].student_no}</label>
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
                                        style={{position:"absolute"}}
                                        id="class" 
                                        name="class" 
                                        placeholder="Pilih Status"
                                        defaultValue={taskSiswaState.dataSourceStatus.filter(option => option.value === taskSiswaState.filter.taskStatus)}
                                        options={taskSiswaState.dataSourceStatus} 
                                        closeMenuOnSelect={false}
                                        onChange= { 
                                            this.handleMultiChange
                                        }
                                        isMulti
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
                                            value={taskSiswaState.filter.start_date}
                                        />
                                    
                                    </div>
                                    <div className="col-md-4">
                                        <label>sampai</label>
                                        <DateTimePicker 
                                            min={new Date()}
                                            isInline={true}
                                            colLabel={"col-md-1"}
                                            onChange={(a,b)=>{
                                                setStateTaskListFilter("end_date", a);
                                            }}
                                            format={"DD/MMM/YYYY"}
                                            value={taskSiswaState.filter.end_date}
                                        />
                                    </div>
                                    
                                </div>
                                <div className="row">
                                    <div className="col-md-2">
                                        <Button color="primary" onClick={getTaskSiswaList}>Filter</Button>
                                    </div>
                                </div><br/>

                                    <MuiThemeProvider>
                                    <MUIDataTable
                                        key={taskSiswaState.data}
                                        data={taskSiswaState.data}
                                        columns={this.state.columns}
                                        options={options}
                                        />
                                    </MuiThemeProvider><br/>

                                    <div className="text-right">
                                        <Button size="sm" color="primary" onClick={this.submitTask}><i className="fa fa-plus"/> Submit Selected Task</Button>
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

                    <Modal isOpen={taskSiswaState.modal.show} fade={false} backdrop={'static'} toggle={this.modalToggle}>
                        <ModalHeader toggle={this.modalToggle}>{taskSiswaState.modal.title}</ModalHeader>
                        <ModalBody>
                            {/* {taskSiswaState} */}
                            {/* <AsyncPage page={"master-area-form"} fallback={<FormLoader/>} validator={this.validator} ref={this.formArea} /> */}
                            {this.state.isAddNew &&
                                <Formik
                                enableReinitialize={true}
                                initialValues={taskSiswaState.form}
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
                                                <Label for="file">File Upload </Label>
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
                                        </ModalFooter>
                                    </Form>
                                    </div>
                                )}
                                </Formik>
                            }
                        </ModalBody>
                        <ModalFooter>
                        <Button color="secondary" onClick={this.modalToggle}>Cancel</Button>{' '}
                        <Button 
                            accept={".jpg,.jpeg,.png"}
                            color="primary" 
                            onClick={this.openFileBrowser.bind(this)}
                        >Add/Browse</Button>

                        {' '}
                        {taskSiswaState.modal.type == "add" &&
                            <Button color="primary" onClick={() => this.save()}>{taskSiswaState.modal.buttonText}</Button>
                        }
                        {taskSiswaState.modal.type == "edit" &&
                            <Button color="primary" onClick={() => this.update()}>{taskSiswaState.modal.buttonText}</Button>
                        }
                        </ModalFooter>
                    </Modal>
                </section>

            </div>
        )
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

const mapStateToProps = state => ({
    taskSiswaState: state.taskSiswa,
    accountState: state.account
});

export default connect(
    mapStateToProps,
    {...actions}
)(withTranslate(TaskSiswa))