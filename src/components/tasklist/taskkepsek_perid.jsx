import React, {Component} from 'react';
import { connect } from "react-redux";
import { withTranslate } from "react-redux-multilingual";
import BlockUi from "react-block-ui";
import { Link, NavLink } from "react-router-dom";
import { 
    Button, FormGroup, Modal, ModalHeader, 
    ModalBody, ModalFooter, Col, Row, Label, Input, InputGroup } from "reactstrap";
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
import Breadcrumb from "../common/breadcrumb";

class TaskKepsekPerId extends Component {

    constructor (props) {
        super (props)
        //console.log('vrovs',props)
        this.state = {
            columns: [
                {
                    name:"status",
                    label:"status",
                    options:{
                        display:false
                    }                    
                },
                {
                    name:"student_no",
                    label:"No"
                },
                {
                    name: 'student_name',
                    label: 'Nama Siswa / Email',
                },
                {
                    name: 'task_progress',
                    label: 'Task Progress',
                    options: {
                        filter: false,
                        sort: false,
                        customBodyRender: (value, tableMeta, updateValue) => {
                            if(tableMeta.rowData[0] == 4){
                                return (
                                <div>
                                    <p style={{color:"yellow"}}><span style={{backgroundColor:"green"}}>Sudah Submit</span></p>
                                </div>
                                );
                            }
                            else{
                                return (
                                    <div>
                                        <p style={{color:"red"}}><span style={{backgroundColor:"yellow"}}>Belum Submit</span></p>
                                    </div>
                                );
                            }
                        }
                    }
                },
                {
                    name: "submitted_date",
                    label: "Last Submit",
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
                            if(tableMeta.rowData[0] == 4){
                                return (
                                    <div>
                                        <Button color="primary" size="sm" onClick={() => this.openModal(value)}>OPEN</Button>
                                    </div>
                                );
                            }
                            else{
                                return (
                                    <div>
                                        <Button disabled color="primary" size="sm">OPEN</Button>
                                    </div>
                                );
                            }
                        }
                      }
                },
            ], 
            isDetail:false,
        }
        this.getList = this.getList.bind(this);
        this.onClickSignOut = this.onClickSignOut.bind(this);
        this.validator = new SimpleReactValidator();
        this.handleMultiChange = this.handleMultiChange.bind(this);
        this.openModal = this.openModal.bind(this);
        this.modalToggle = this.modalToggle.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
        this.downloadFiles = this.downloadFiles.bind(this);
    }

    componentDidMount(){
        let {setUrlPath, kepsekGetTaskCollectionList} =this.props;
        // document.getElementById('sticky').style.display = "none"
        setUrlPath(this.props.match.params.id);
        kepsekGetTaskCollectionList();
    }
    
    modalToggle() {
        const { taskKepsekState, setModal } = this.props;
        setModal("show", !taskKepsekState.modal.show)
    }

    getList(){
        let { kepsekGetTaskList } = this.props;
        kepsekGetTaskList();
    }

    openModal(value){
        let { kepsekGetUploadedCollectionList, setStateModalFormUploadedCollection, setModal, taskKepsekState } = this.props;
        console.log('openmodal', value)
        setStateModalFormUploadedCollection("task_collection_id", value);
        kepsekGetUploadedCollectionList();
        console.log('fgfg', taskKepsekState)
        setModal("type", "download")
        setModal("title", "Uploaded Files")
        setModal("buttonText", "Download All")
        setModal("show", true)
        this.setState(prevState => ({
            ...prevState,
            isDetail: true,
        })
        );
    }

    downloadFiles() {
        const { taskKepsekState, setStateModalFormUploadedCollection, kepsekDownloadCollection } = this.props;
        if(taskKepsekState.dataUploadedCollection.files != null || taskKepsekState.dataUploadedCollection.files != undefined){
            for(let i=0;i<taskKepsekState.dataUploadedCollection.files.length;i++){
                setStateModalFormUploadedCollection("task_collection_file_id", taskKepsekState.dataUploadedCollection.files[i].task_collection_file_id);
                setStateModalFormUploadedCollection("filename", taskKepsekState.dataUploadedCollection.files[i].filename);
                setStateModalFormUploadedCollection("mime_type", taskKepsekState.dataUploadedCollection.files[i].mime_type);
                kepsekDownloadCollection();
            }
        }
    }

    downloadFile(task_collection_file_id, filename, mime_type) {
        const { guruDownloadCollection, setStateModalFormUploadedCollection } = this.props;
        setStateModalFormUploadedCollection("task_collection_file_id", task_collection_file_id);
        setStateModalFormUploadedCollection("filename", filename);
        setStateModalFormUploadedCollection("mime_type", mime_type);
        guruDownloadCollection();
    }

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
            viewColumns:false,
            selectableRows:false,
        };

        //menampilkan file/s untuk di download(modal download)
        let listOfFile = [];
        if(taskKepsekState.dataUploadedCollection.files != null || taskKepsekState.dataUploadedCollection.files != undefined){
            for(let i=0;i<taskKepsekState.dataUploadedCollection.files.length;i++){
                listOfFile.push(
                    <InputGroup style={{marginBottom:"5px"}}>
                            <Input
                            type="text"
                            className="form-control"
                            value={taskKepsekState.dataUploadedCollection.files[i].filename}
                            readOnly
                            />
                            <Button 
                            inline={true}
                            color="primary" size="xs" 
                            onClick={() => { 
                                this.downloadFile(taskKepsekState.dataUploadedCollection.files[i].task_collection_file_id,
                                    taskKepsekState.dataUploadedCollection.files[i].filename,
                                    taskKepsekState.dataUploadedCollection.files[i].mime_type); 
                                }}
                            >Download</Button>
                    </InputGroup>
                )   
            }
        }

        return (
            <div>
                <Breadcrumb title={<Link to={`${process.env.PUBLIC_URL}/taskkepsek/`}>Back</Link>}/>
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
                                        data={taskKepsekState.dataCollection}
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
                            {this.state.isDetail &&
                                <Formik
                                enableReinitialize={true}
                                initialValues={taskKepsekState.taskDetail}
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
                                            <div>
                                                {listOfFile}
                                            </div>
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
                        {taskKepsekState.modal.type == "download" &&
                            <Button 
                            size="sm" color="primary"
                            onClick={() => this.downloadFiles()}
                            >{taskKepsekState.modal.buttonText}</Button>
                        }
                        </ModalFooter>
                    </Modal>
                </section>

            </div>
        )
    }

    render() {

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
)(withTranslate(TaskKepsekPerId))