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
import Breadcrumb from "../common/breadcrumb";

class User extends Component {

    constructor (props) {
        super (props)
        //console.log('vrovs',props)
        this.state = {
            userColumns: [
                {
                    name: 'no',
                    label: 'No',
                },
                {
                    name: 'user_name',
                    label: 'User Name',
                },
                {
                    name: "email",
                    label: "E-mail",
                },
                {
                    name: "status",
                    label: "status",
                    options: {
                        display: false
                    }
                },
                {
                    name: 'user_id',
                    label: 'Action',
                    options: {
                        filter: false,
                        sort: false,
                        print: false,
                        download: false,
                        // display: false,
                        customBodyRender: (value, tableMeta, updateValue) => {
                            return (
                            <div>
                                <Link to={`${process.env.PUBLIC_URL}/usermanagement/user/` + value}><Button title="Detail Task" color="primary" size="sm">Detail</Button></Link>
                                {/* <Button color="warning" size="sm" onClick={() => this.detailUser(value) }>Detail</Button>&nbsp;
                                <Button color="primary" size="sm" onClick={() => this.giveARole(value) }>Edit</Button>&nbsp; */}
                            </div>
                            );
                        }
                    }
                },
            ],
            isAddUser:false,
            isDetail:false,
            isGiveARole:false,
            isUploadCsv:false,
            uploadedFileName:[],
        }
        this.onClickSignOut = this.onClickSignOut.bind(this);
        this.validator = new SimpleReactValidator();
        this.handleMultiChange = this.handleMultiChange.bind(this);
        this.addUser = this.addUser.bind(this);
        this.uploadCsv = this.uploadCsv.bind(this);
        this.giveARole = this.giveARole.bind(this);
        this.detailUser = this.detailUser.bind(this);
        this.modalToggle = this.modalToggle.bind(this);
        this.openFileBrowser = this.openFileBrowser.bind(this);
        this.fileInput = React.createRef();
    }

    componentDidMount(){
        let { adminGetUserList, adminGetDataSourceClass, adminGetDataSourceSubject, adminGetDataSourceGroup, adminGetDataSourceStudent } =this.props;
        // document.getElementById('sticky').style.display = "none"
        adminGetUserList();
        adminGetDataSourceClass();
        adminGetDataSourceSubject();
        adminGetDataSourceGroup();
        adminGetDataSourceStudent();
    }

    addUser(){
        let{setModal}=this.props;
        setModal("type", "addUser")
        setModal("title", "Add User")
        setModal("buttonText", "Add")
        setModal("show", true)
        this.setState( prevState => ({
            ...prevState,
            isAddUser:true,
            isGiveARole:false,
            isUploadCsv:false,
        })
        );
    }

    uploadCsv(){
        let{setModal}=this.props;
        setModal("type", "uploadCsv")
        setModal("title", "Upload CSV")
        setModal("buttonText", "Upload")
        setModal("show", true)
        this.setState( prevState => ({
            ...prevState,
            isAddUser:false,
            isGiveARole:false,
            isUploadCsv:true,
        })
        );
    }

    giveARole(value){
        let{setModal, adminSetModalFormUserRole}=this.props;
        adminSetModalFormUserRole("user_id", value)
        setModal("type", "giveRole")
        setModal("title", "Give A Role")
        setModal("buttonText", "Submit")
        setModal("show", true)
        this.setState( prevState => ({
            ...prevState,
            isAddUser:false,
            isGiveARole:true,
            isUploadCsv:false,
        })
        );
    }

    detailUser(value){
        // let { adminGet } = this.props;
    }

    save() {
        const { adminCreateUser } = this.props;
        // if (this.validator.allValid()) {
            adminCreateUser();
        // } else {
        //   this.validator.showMessages();
        //   this.formArea.current.forceUpdate();
        // }
    }

    saveRole() {
        const { adminSignUserRole } = this.props;
        // if (this.validator.allValid()) {
            adminSignUserRole();
        // } else {
        //   this.validator.showMessages();
        //   this.formArea.current.forceUpdate();
        // }
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

    openFileBrowser = () => {
        this.fileInput.current.click();
    };

    fileHandler = event => {
        let { setLoader, setStateModalForm ,adminState} = this.props;
        // console.log('handel file', event.target.files);
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
        // console.log('pailojek',fileObj);
        // console.log('pailojeknem',fileName);
        }
    };
    
    renderView (){
        let { adminState, adminSetModalFormUser, adminSetModalFormUserRole, setStateModalForm } = this.props;

        const options = {
            responsive:"scroll",
            filter:false,
            search:false,
            download:false,
            print:false,
            viewColumns:false,
            selectableRows:false,
        };

        //menampilkan file/s yang dipilih untuk di upload(modal upload)
        let filesToUpload = this.state.uploadedFileName;
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

        return (
            <div>
                <Breadcrumb title={<Link to={`${process.env.PUBLIC_URL}/usermanagement/`}>Back to User Management</Link>}/>
                <section className="login-page section-b-space">
                    <div className="container">
                    <h3 className="text-left"><i className="mdi mdi-table-edit"/>USER</h3>
                        <div className="row">
                            {/* <div className="col-lg-3">
                                
                                <div className="theme-card">
                                    <div className="collection-block">
                                    </div>
                                    <div className={"text-center"}>
                                        <p>{moment(adminState.now).format("dddd YYYY-MM-DD").toString()}</p>
                                    </div><br/>
                                    <form className="theme-form">
                                        <div className="form-group">
                                            <label>Nama : {localStorage.name.replace(/"/g,'')}</label><br/>
                                        </div>
                                    </form>
                                </div>
                            </div> */}
                            <div className="col-lg-12">
                                <div className="theme-card authentication-right">
                                    <div>
                                    {/* {card} */}
                                    </div>
                                    <MuiThemeProvider>
                                    <MUIDataTable
                                        title={
                                        <div>List User 
                                            <Button size="sm" color="primary" onClick={this.addUser}><i className="fa fa-plus"></i>&nbsp;Add User</Button>&nbsp;
                                            <Button size="sm" color="secondary" onClick={this.uploadCsv}><i className="fa fa-plus"></i>&nbsp;Upload CSV</Button></div>}
                                        data={adminState.user.dataUser}
                                        columns={this.state.userColumns}
                                        options={options}
                                        key={adminState.key}
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
                                            <Label for="user_name">User Name</Label>
                                            <Input
                                                name="user_name"
                                                id="user_name"
                                                defaultValue={adminState.user.form.user_name}
                                                onChange= { (e) => adminSetModalFormUser("user_name", e.target.value)}
                                            />
                                            {/* {validator.message(
                                                "area_description",
                                                adminState.form.user_name,
                                                "required"
                                            )} */}
                                            </FormGroup>
                                            <FormGroup>
                                            <Label for="email">E-mail</Label>
                                            <Input
                                                name="email"
                                                id="email"
                                                defaultValue={adminState.user.form.email}
                                                onChange= { (e) => adminSetModalFormUser("email", e.target.value)}
                                            />
                                            {/* {validator.message(
                                                "area_description",
                                                adminState.form.email,
                                                "required"
                                            )} */}
                                            </FormGroup>
                                            <FormGroup>
                                            <Label for="password">Password</Label>
                                            <Input
                                                type="password"
                                                name="password"
                                                id="password"
                                                defaultValue={adminState.user.form.password}
                                                onChange= { (e) => adminSetModalFormUser("password", e.target.value)}
                                            />
                                            {/* {validator.message(
                                                "area_description",
                                                adminState.form.password,
                                                "required"
                                            )} */}
                                            </FormGroup>
                                            <FormGroup>
                                            <Label for="password">Re-Password</Label>
                                            <Input
                                                type="password"
                                                name="repassword"
                                                id="repassword"
                                                defaultValue={adminState.user.form.repassword}
                                                onChange= { (e) => adminSetModalFormUser("repassword", e.target.value)}
                                            />
                                            {/* {validator.message(
                                                "area_description",
                                                adminState.user.form.repassword,
                                                "required"
                                            )} */}
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

                            {this.state.isGiveARole &&
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
                                            <Label for="group_id">Group</Label>
                                            <Select
                                                name="group_id"
                                                id="group_id"
                                                options={adminState.group.dataSourceGroup}
                                                onChange= { (e) => adminSetModalFormUserRole("group_id", e.value)}
                                            />
                                            {/* {validator.message(
                                                "area_description",
                                                adminState.user.form.repassword,
                                                "required"
                                            )} */}
                                            </FormGroup>
                                            <Label>*Fill these input below if you wanna assign user as a student, leave it blanks if you don't</Label>
                                            <FormGroup>
                                            <Label for="class_id">Class</Label>
                                            <Select
                                                name="class_id"
                                                id="class_id"
                                                options={adminState.class.dataSourceClass}
                                                onChange= { (e) => adminSetModalFormUserRole("class_id", e.value)}
                                            />
                                            {/* {validator.message(
                                                "area_description",
                                                adminState.user.form.repassword,
                                                "required"
                                            )} */}
                                            </FormGroup>
                                            <FormGroup>
                                            <Label for="subject_id">Subject</Label>
                                            <Select
                                                name="subject_id"
                                                id="subject_id"
                                                options={adminState.subject.dataSourceSubject}
                                                onChange= { (e) => adminSetModalFormUserRole("subject_id", e.value)}
                                            />
                                            {/* {validator.message(
                                                "area_description",
                                                adminState.user.form.repassword,
                                                "required"
                                            )} */}
                                            </FormGroup>
                                            <FormGroup>
                                            <Label for="student_id">Student</Label>
                                            <Select
                                                name="student_id"
                                                id="student_id"
                                                options={adminState.student.dataSourceStudent}
                                                onChange= { (e) => adminSetModalFormUserRole("student_id", e.value)}
                                            />
                                            {/* {validator.message(
                                                "area_description",
                                                adminState.user.form.repassword,
                                                "required"
                                            )} */}
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

                            {this.state.isUploadCsv &&
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
                        <Button color="secondary" onClick={this.modalToggle}>Cancel</Button>

                        {' '}
                        {adminState.modal.type == "addUser" &&
                            <Button color="primary" onClick={() => this.save()}>{adminState.modal.buttonText}</Button>
                        }
                        {adminState.modal.type == "giveRole" &&
                            <Button color="primary" onClick={() => this.saveRole()}>{adminState.modal.buttonText}</Button>
                        }
                        {adminState.modal.type == "uploadCsv" &&
                        <Button 
                            accept={".csv"}
                            color="primary" 
                            onClick={this.openFileBrowser.bind(this)}
                        >Add/Browse</Button>
                        }
                        {adminState.modal.type == "uploadCsv" &&
                            <Button color="primary" >{adminState.modal.buttonText}</Button>
                        }
                        </ModalFooter>
                    </Modal>
                </section>

            </div>
        )
    }

    render() {

        let { adminState } = this.props;
        return (
          <BlockUi
            tag="div"
            blocking={adminState.loader}
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
    adminState:state.admin
});

export default connect(
    mapStateToProps,
    {...actions}
)(withTranslate(User))