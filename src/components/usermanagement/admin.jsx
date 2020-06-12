import React, {Component} from 'react';
import { connect } from "react-redux";
import { withTranslate } from "react-redux-multilingual";
import BlockUi from "react-block-ui";
import { Link, NavLink } from "react-router-dom";
import { 
    Button, FormGroup, Modal, ModalHeader, 
    ModalBody, ModalFooter, Col, Row, Label, Input, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle } from "reactstrap";
import CustomFooterGuru from "../common/customFooterGuru";
// import Select from "../common/Select";
import 'react-widgets/dist/css/react-widgets.css';
import DateTimePicker from "../common/DatePicker";
// import Input from "../common/Input";
import "react-datepicker/dist/react-datepicker.css";
// import './tasksiswa.css';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import * as actions from "../../actions";
import moment from 'moment'
import * as messageBox from "../common/message-box";
import SimpleReactValidator from "simple-react-validator";
import { Formik, Form, Field } from 'formik';
import Select from 'react-select'
import zIndex from '@material-ui/core/styles/zIndex';

class Admin extends Component {

    constructor (props) {
        super (props)
        //console.log('vrovs',props)
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
                                    {/* <Button title="Detail Task" color="primary" size="sm" onClick={() => this.detailTask(tableMeta)}>Detail</Button>&nbsp;
                                    <Button title="Arsipkan Task" color="secondary" size="sm">Arsipkan</Button>&nbsp;
                                    <Button title="Edit Task" color="info" style={{ color: "#fff" }} onClick={() => this.editTask(tableMeta)} size="sm">Edit</Button>&nbsp;
                                    <Button title="Delete Task" color="danger" style={{ color: "#fff" }} onClick={() => this.deleteTask(tableMeta)} size="sm">Delete</Button> */}
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
            dataSourceClass:this.props.taskGuruState.dataSourceClass,
            uploadedFileName: "",
            isFormInvalid:false
        }
        this.onClickSignOut = this.onClickSignOut.bind(this);
    }

    componentDidMount(){
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
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                        <Card>
                            <CardTitle className="text-center"><h4>KEPALA SEKOLAH</h4></CardTitle>
                            <CardImg 
                            center 
                            width="50%" 
                            style={{backgroundColor:"white"}}
                            src={`${
                            process.env.PUBLIC_URL
                            }/assets/images/icon/icon_user.png`} 
                            alt="Card image cap" 
                            />
                            <CardBody>                            
                            <div className="row">
                                <div className="col">
                                    <Button>Setting</Button>
                                </div>
                                <div className="col">
                                    <Button>Add</Button>
                                </div>
                                <div className="col">
                                    <Button>View</Button>
                                </div>
                                <div className="col">
                                    <img 
                                    width="100%"
                                    src={`${
                                    process.env.PUBLIC_URL
                                    }/assets/images/icon/3dot.png`}/>
                                </div>
                            </div>
                            </CardBody>
                        </Card>
                        </div>
                        <div className="col-md-4">
                        <Card>
                            <CardTitle className="text-center"><h4>WALI KELAS</h4></CardTitle>
                            <CardImg 
                            center 
                            width="50%" 
                            style={{backgroundColor:"white"}}
                            src={`${
                            process.env.PUBLIC_URL
                            }/assets/images/icon/icon_user.png`} 
                            alt="Card image cap" 
                            />
                            <CardBody>                            
                            <div className="row">
                                <div className="col">
                                    <Button>Setting</Button>
                                </div>
                                <div className="col">
                                    <Button>Add</Button>
                                </div>
                                <div className="col">
                                    <Button>View</Button>
                                </div>
                                <div className="col">
                                    <img 
                                    width="100%"
                                    src={`${
                                    process.env.PUBLIC_URL
                                    }/assets/images/icon/3dot.png`}/>
                                </div>
                            </div>
                            </CardBody>
                        </Card>
                        </div>
                        <div className="col-md-4">
                        <Card>
                            <CardTitle className="text-center"><h4>GURU</h4></CardTitle>
                            <CardImg 
                            center 
                            width="50%" 
                            style={{backgroundColor:"white"}}
                            src={`${
                            process.env.PUBLIC_URL
                            }/assets/images/icon/icon_user.png`} 
                            alt="Card image cap" 
                            />
                            <CardBody>                            
                            <div className="row">
                                <div className="col">
                                    <Button>Setting</Button>
                                </div>
                                <div className="col">
                                    <Button>Add</Button>
                                </div>
                                <div className="col">
                                    <Button>View</Button>
                                </div>
                                <div className="col">
                                    <img 
                                    width="100%"
                                    src={`${
                                    process.env.PUBLIC_URL
                                    }/assets/images/icon/3dot.png`}/>
                                </div>
                            </div>
                            </CardBody>
                        </Card>
                        </div>                      
                    </div><br/>
                    <div className="row">
                        <div className="col-md-4">
                        <Card>
                            <CardTitle className="text-center"><h4>SISWA</h4></CardTitle>
                            <CardImg 
                            center 
                            width="50%" 
                            style={{backgroundColor:"white"}}
                            src={`${
                            process.env.PUBLIC_URL
                            }/assets/images/icon/icon_user.png`} 
                            alt="Card image cap" 
                            />
                            <CardBody>                            
                            <div className="row">
                                <div className="col">
                                    <Button>Setting</Button>
                                </div>
                                <div className="col">
                                    <Button>Add</Button>
                                </div>
                                <div className="col">
                                    <Button>View</Button>
                                </div>
                                <div className="col">
                                    <img 
                                    width="100%"
                                    src={`${
                                    process.env.PUBLIC_URL
                                    }/assets/images/icon/3dot.png`}/>
                                </div>
                            </div>
                            </CardBody>
                        </Card>
                        </div>
                        <div className="col-md-4">
                        <Card>
                            <CardTitle className="text-center"><h4>WEB ADMIN</h4></CardTitle>
                            <CardImg 
                            center 
                            width="50%" 
                            style={{backgroundColor:"white"}}
                            src={`${
                            process.env.PUBLIC_URL
                            }/assets/images/icon/icon_user.png`} 
                            alt="Card image cap" 
                            />
                            <CardBody>                            
                            <div className="row">
                                <div className="col">
                                    <Button>Setting</Button>
                                </div>
                                <div className="col">
                                    <Button>Add</Button>
                                </div>
                                <div className="col">
                                    <Button>View</Button>
                                </div>
                                <div className="col">
                                    <img 
                                    width="100%"
                                    src={`${
                                    process.env.PUBLIC_URL
                                    }/assets/images/icon/3dot.png`}/>
                                </div>
                            </div>
                            </CardBody>
                        </Card>
                        </div>
                        <div className="col-md-4">
                        <Card>
                            <CardTitle className="text-center"><h4>+ ADD NEW</h4></CardTitle>
                            <CardImg 
                            center 
                            width="50%" 
                            style={{backgroundColor:"white"}}
                            src={`${
                            process.env.PUBLIC_URL
                            }/assets/images/icon/icon_user.png`} 
                            alt="Card image cap" 
                            />
                            <CardBody>                            
                            <div className="row">
                                <div className="col">
                                    <Button>Setting</Button>
                                </div>
                                <div className="col">
                                    <Button>Add</Button>
                                </div>
                                <div className="col">
                                    <Button>View</Button>
                                </div>
                                <div className="col">
                                    <img 
                                    width="100%"
                                    src={`${
                                    process.env.PUBLIC_URL
                                    }/assets/images/icon/3dot.png`}/>
                                </div>
                            </div>
                            </CardBody>
                        </Card>
                        </div>                      
                    </div>
                </div>
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
    taskGuruState: state.taskGuru
});

export default connect(
    mapStateToProps,
    {...actions}
)(withTranslate(Admin))