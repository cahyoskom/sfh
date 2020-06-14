import React, {Component} from 'react';
import { connect } from "react-redux";
import { withTranslate } from "react-redux-multilingual";
import BlockUi from "react-block-ui";
import { Link, NavLink } from "react-router-dom";
import { 
    Button, FormGroup, Modal, ModalHeader, 
    ModalBody, ModalFooter, Col, Row, Label, Input,Card, CardImg, CardText, CardBody,
    CardTitle, } from "reactstrap";
import CustomFooterGuru from "../common/customFooterGuru";
// import Select from "../common/Select";
import 'react-widgets/dist/css/react-widgets.css';
import DateTimePicker from "../common/DatePicker";
// import Input from "../common/Input";
import "react-datepicker/dist/react-datepicker.css";
import '../tasklist/tasksiswa.css';
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
                        display:false,
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
                    name: 'group_name',
                    label: 'Group Name',
                },
                {
                    name: "created_date",
                    label: "created_date",
                    options: {
                        display: false
                    }
                },
                {
                    name: "created_by",
                    label: "Mata created_by",
                    options: {
                        display: false
                    }
                },
                {
                    name: "updated_date",
                    label: "updated_date",
                    options: {
                        display: false
                    }
                },
                {
                    name: "updated_by",
                    label: "updated_by",
                    options: {
                        display: false
                    }
                },
                {
                    name: 'group_id',
                    label: 'Action',
                    options: {
                        filter: false,
                        sort: false,
                        print: false,
                        download: false,
                        customBodyRender: (value, tableMeta, updateValue) => {
                            if(value == 1){
                                return (
                                <div>
                                    <Link to={`${process.env.PUBLIC_URL}/usermanagement/setting/admin/`}><Button color="primary" size="sm">Setting</Button></Link>&nbsp;
                                    <Button color="secondary" size="sm">Add</Button>&nbsp;
                                    <Button color="warning" size="sm">View</Button>&nbsp;
                                </div>
                                );
                            }
                            else if(value == 2){
                                return (
                                <div>
                                    <Link to={`${process.env.PUBLIC_URL}/usermanagement/setting/headmaster/` + value}><Button color="primary" size="sm">Setting</Button></Link>&nbsp;
                                    <Button color="secondary" size="sm">Add</Button>&nbsp;
                                    <Button color="warning" size="sm">View</Button>&nbsp;
                                </div>
                                );
                            }
                            else if(value == 3){
                                return (
                                <div>
                                    <Link to={`${process.env.PUBLIC_URL}/usermanagement/setting/hometeacher/` + value}><Button color="primary" size="sm">Setting</Button></Link>&nbsp;
                                    <Button color="secondary" size="sm">Add</Button>&nbsp;
                                    <Button color="warning" size="sm">View</Button>&nbsp;
                                </div>
                                );
                            }
                            else if(value == 4){
                                return (
                                <div>
                                    <Link to={`${process.env.PUBLIC_URL}/usermanagement/setting/teacher/` + value}><Button color="primary" size="sm">Setting</Button></Link>&nbsp;
                                    <Button color="secondary" size="sm">Add</Button>&nbsp;
                                    <Button color="warning" size="sm">View</Button>&nbsp;
                                </div>
                                );
                            }
                            else if(value == 5){
                                return (
                                <div>
                                    <Link to={`${process.env.PUBLIC_URL}/usermanagement/setting/guardian/` + value}><Button color="primary" size="sm">Setting</Button></Link>&nbsp;
                                    <Button color="secondary" size="sm">Add</Button>&nbsp;
                                    <Button color="warning" size="sm">View</Button>&nbsp;
                                </div>
                                );
                            }
                            else if(value == 6){
                                return (
                                <div>
                                    <Link to={`${process.env.PUBLIC_URL}/usermanagement/setting/student/` + value}><Button color="primary" size="sm">Setting</Button></Link>&nbsp;
                                    <Link to={`${process.env.PUBLIC_URL}/usermanagement/student` + value}></Link><Button color="secondary" size="sm">Add</Button>&nbsp;
                                    <Button color="warning" size="sm">View</Button>&nbsp;
                                </div>
                                );
                            }
                        }
                      }
                },
            ],
            isAddUser:false,
            isAddGroup:false,
            dataSourceClass:this.props.taskKepsekState.dataSourceClass,
        }
        this.onClickSignOut = this.onClickSignOut.bind(this);
        this.validator = new SimpleReactValidator();
        this.handleMultiChange = this.handleMultiChange.bind(this);
        this.addUser = this.addUser.bind(this);
        this.addGroup = this.addGroup.bind(this);
        this.modalToggle = this.modalToggle.bind(this);
    }

    componentDidMount(){
        let {adminGetGroupList} =this.props;
        // document.getElementById('sticky').style.display = "none"
        adminGetGroupList();
    }

    addUser(){
        let{setModal}=this.props;
        setModal("type", "add")
        setModal("title", "Add User")
        setModal("buttonText", "Add")
        setModal("show", true)
        this.setState( prevState => ({
            ...prevState,
            isAddUser:true,
            isAddGroup:false,
        })
        );
    }

    addGroup(){
        let{setModal}=this.props;
        setModal("type", "add")
        setModal("title", "Add Group")
        setModal("buttonText", "Add")
        setModal("show", true)
        this.setState( prevState => ({
            ...prevState,
            isAddUser:false,
            isAddGroup:true,
        })
        );
    }

    onClickSignOut(){
        localStorage.clear()
        window.location.href = process.env.PUBLIC_URL
    }

    handleMultiChange(option) {
        let { setStateTaskListFilter } = this.props;
        setStateTaskListFilter("class_id", option);
    }

    modalToggle() {
        const { adminState, setModal } = this.props;
        setModal("show", !adminState.modal.show)
    }
    
    renderView (){
        let { adminState, taskKepsekState, setStateTaskListFilter, setStateModalForm, kepsekGetTaskList } = this.props;

        const options = {
            responsive:"scroll",
            filter:false,
            search:false,
            download:false,
            print:false,
            viewColumns:false,
            selectableRows:false,
        };

        // let dataGroup = adminState.group.dataGroup;
        // let filePreviews = null;
        // let card = [];
        // if(dataGroup.length != 0){
        //     for(let i=0;i<dataGroup.length;i++){
        //         card.push(                    
        //             <div className="row">
        //             <div className="col-md">
        //                 <Card>
        //                     <CardTitle className="text-center"><h4>{dataGroup[i].group_name}</h4></CardTitle>
        //                     <CardImg 
        //                     center 
        //                     width="50%" 
        //                     style={{backgroundColor:"white"}}
        //                     src={`${
        //                     process.env.PUBLIC_URL
        //                     }/assets/images/icon/icon_user.png`} 
        //                     alt="Card image cap" 
        //                     />
        //                     <CardBody>                            
        //                     <div className="row">
        //                         <div className="col">
        //                             <Button>Setting</Button>
        //                         </div>
        //                         <div className="col">
        //                             <Button>Add</Button>
        //                         </div>
        //                         <div className="col">
        //                             <Button>View</Button>
        //                         </div>
        //                         <div className="col">
        //                             <img 
        //                             width="100%"
        //                             src={`${
        //                             process.env.PUBLIC_URL
        //                             }/assets/images/icon/3dot.png`}/>
        //                         </div>
        //                     </div>
        //                     </CardBody>
        //                 </Card>
        //             </div>
        //             </div>
        //         )   
        //     }
        // }

        return (
            <div>
                
                <section className="login-page section-b-space">
                    <div className="container">
                    <h3 className="text-left"><i className="mdi mdi-table-edit"/>User Management</h3>
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
                                    <div>
                                    {/* {card} */}
                                    </div>
                                    <MuiThemeProvider>
                                    <MUIDataTable
                                        title={<div><Button size="sm" color="primary" onClick={this.addUser}><i className="fa fa-plus"></i>&nbsp;Add User</Button>&nbsp;<Button size="sm" color="warning" onClick={this.addGroup}><i className="fa fa-plus"></i>&nbsp;Add Group</Button></div>}
                                        data={adminState.group.dataGroup}
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

                    <Modal isOpen={adminState.modal.show} fade={false} backdrop={'static'} toggle={this.modalToggle}>
                        <ModalHeader toggle={this.modalToggle}>{adminState.modal.title}</ModalHeader>
                        <ModalBody>
                            {this.state.isAddUser &&
                                <Formik
                                enableReinitialize={true}
                                initialValues={adminState.form}
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
                                            <FormGroup>
                                                <Label for="file">File Upload </Label>
                                                
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
                            {this.state.isAddGroup &&
                                <Formik
                                enableReinitialize={true}
                                initialValues={adminState.form}
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
                                            <FormGroup>
                                                <Label for="file">File Upload </Label>
                                                
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
                        <Button color="secondary" onClick={this.modalToggle}>Cancel</Button>

                        {' '}
                        {adminState.modal.type == "add" &&
                            <Button color="primary" onClick={() => this.save()}>{adminState.modal.buttonText}</Button>
                        }
                        {adminState.modal.type == "edit" &&
                            <Button color="primary" onClick={() => this.update()}>{adminState.modal.buttonText}</Button>
                        }
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
        )
    }

    render() {

        let { adminState,taskKepsekState } = this.props;
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
    taskKepsekState: state.taskKepsek,
    adminState:state.admin
});

export default connect(
    mapStateToProps,
    {...actions}
)(withTranslate(Admin))