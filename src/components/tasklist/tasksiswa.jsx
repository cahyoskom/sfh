import React, {Component} from 'react';
import { connect } from "react-redux";
import { withTranslate } from "react-redux-multilingual";
import BlockUi from "react-block-ui";
import { Link, NavLink } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import CustomFooter from "../common/customFooter";
import 'react-widgets/dist/css/react-widgets.css';
import DateTimePicker from "../common/DatePicker";
import CustomInput from "../common/CostumInput";
import "react-datepicker/dist/react-datepicker.css";
import './tasksiswa.css';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import * as actions from "../../actions";
import moment from 'moment'

class TaskSiswa extends Component {

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
                                {/* <Button title="Delete Billing" color="danger" onClick={() => this.deleteBilling(tableMeta)}><i className="mdi mdi-close-outline"/></Button>&nbsp; */}
                                <Button title="Download" color="info" style={{ color: "#fff" }}>Download</Button>&nbsp;
                                {/* <Button title="Upload" color="primary" style={{ color: "#fff" }} onClick={() => this.uploadTask()}>Upload</Button> */}
                              </div>
                            );
                          }else{                
                            return (
                              <div>
                                <Button title="Download" color="info" style={{ color: "#fff" }}>Download</Button>&nbsp;
                                <Button title="Upload" color="primary" style={{ color: "#fff" }} onClick={() => this.uploadTask(tableMeta, value)}>Upload</Button>
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
            status:"all"
        }
        this.getList = this.getList.bind(this);
        this.uploadTask = this.uploadTask.bind(this);
        this.modalToggle = this.modalToggle.bind(this);
        this.openFileBrowser = this.openFileBrowser.bind(this);
        this.fileInput = React.createRef();
        this.onClickSignOut = this.onClickSignOut.bind(this);
        this.toggleStatus = this.toggleStatus.bind(this);
        this.toggleStatuss = this.toggleStatuss.bind(this);
    }

    componentDidMount(){
        this.getList();
        let {taskSiswaState} =this.props;
        console.log("detaaa", taskSiswaState);
    }

    getList(){
        let { getTaskSiswaList } = this.props;
        getTaskSiswaList();
    }

    uploadTask(tableMeta, value){
        console.log(tableMeta,'asa');
        // console.log(value,'nasa');
        let {setModal} = this.props;
        setModal("type", "add")
        setModal("title", "Upload Task")
        setModal("buttonText", "Uploadd")
        setModal("show", true)
    }

    modalToggle() {
        const { taskSiswaState, setModal } = this.props;
        setModal("show", !taskSiswaState.modal.show)
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

    toggleStatus = (event) => {
        console.log("55", event)
        // this.setState(prevState => ({
        //     status : event.target.value
        // }));
    }
    toggleStatuss = () => {
        alert("halo");
    }

    renderView (){
        let { taskSiswaState, setStateTaskListFilter } = this.props;

        const options = {
            responsive:"scroll",
            filterType: 'checkbox',
            filter:false,
            search:false,
            download:false,
            print:false,
            viewColumns:false,
            customFooter: () => {
                return (
                  <CustomFooter/>
                );
              }
          };

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
                                        <p>{moment(taskSiswaState.stardet).format("dddd YYYY-MM-DD").toString()}</p>
                                    </div><br/>
                                    <form className="theme-form">
                                        <div className="form-group">
                                            <label>Nama : Budi Wicaksono</label><br/>
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
                                        // title={<div><Button onClick={this.submitTask}><i className="mdi mdi-plus"></i>&nbsp;Submit Selected Task</Button></div>}
                                        title={<div className="row">
                                            <CustomInput type="radio" 
                                            value={"draft"} 
                                            // label="belum submit" 
                                            isInline={true}
                                            checked={this.state.status == "draft"} 
                                            onChange={this.toggleStatus} inline />
                                            <label>Belum Submit</label>

                                            <CustomInput type="radio" 
                                            value={"submited"} 
                                            // label="Submited" 
                                            isInline={true}
                                            checked={this.state.status == "submited"} 
                                            onChange={this.toggleStatus} inline />
                                            <label>Submited</label>

                                            <CustomInput type="radio" 
                                            value={"all"} 
                                            // label="Semua" 
                                            isInline={true}
                                            checked={this.state.status == "all"} 
                                            onChange={this.toggleStatus} inline />
                                            <label>Semua</label>

                                            <DateTimePicker 
                                                min={new Date()}
                                                isInline={true}
                                                // colInput={"col-md-4"}
                                                colLabel={"col-md-1"}
                                                onChange={(a,b)=>{
                                                    setStateTaskListFilter("taskDateFrom", a);
                                                }}
                                                format={"DD/MMM/YYYY"}
                                                value={taskSiswaState.dt.filter.taskDateFrom}
                                            />
                                            <label>sampai</label>
                                            <DateTimePicker 
                                                min={new Date()}
                                                isInline={true}
                                                colLabel={"col-md-1"}
                                                // colInput={"col-md-4"}
                                                onChange={(a,b)=>{
                                                    setStateTaskListFilter("taskDateTo", a);
                                                }}
                                                format={"DD/MMM/YYYY"}
                                                value={taskSiswaState.dt.filter.taskDateTo}
                                            />
                                            </div>}
                                        // title={''}
                                        data={taskSiswaState.data}
                                        columns={this.state.columns}
                                        options={options}
                                        />
                                    </MuiThemeProvider>
                                    
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
                        
                        </ModalBody>
                        <ModalFooter>
                        <Button color="secondary" onClick={this.modalToggle}>Cancel</Button>{' '}
                        <Button 
                            color="primary" 
                            onClick={this.openFileBrowser.bind(this)}
                        >Add/Browse</Button>
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
console.log('block render')
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
    taskSiswaState: state.taskSiswa
});

export default connect(
    mapStateToProps,
    {...actions}
)(withTranslate(TaskSiswa))