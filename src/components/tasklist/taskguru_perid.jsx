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
                            return (
                                <div>
                                    <Button color="primary" size="sm" onClick={() => this.OpenModal()}>OPEN</Button>
                                </div>
                            );
                        }
                      }
                },
            ],         
            options : {
                 filterType: 'checkbox',
            },
            isDetail:false,
        }
        this.modalToggle = this.modalToggle.bind(this);
        this.onClickSignOut = this.onClickSignOut.bind(this);
    }

    componentDidMount(){
        let {setUrlPath, guruGetTaskCollectionList} =this.props;
        setUrlPath(this.props.match.params.id);
        guruGetTaskCollectionList();
        // console.log("url",this.props.match.params.id);
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
            viewColumns:false,
            selectableRows:'none',
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
                                        title={<div>Kelas <span style={{backgroundColor:"green"}}>SD 1</span></div>}
                                        data={taskGuruState.dataCollection}
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

                    <Modal isOpen={taskGuruState.modal.show} fade={false} backdrop={'static'} toggle={this.modalToggle}>
                        <ModalHeader toggle={this.modalToggle}>{taskGuruState.modal.title}</ModalHeader>
                        <ModalBody>
                            {this.state.isDetail &&
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
                                                    // value={taskGuruState.form.start_date}
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
                                                    // value={taskGuruState.form.finish_date}
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
                            <Button size="sm" color="primary">{taskGuruState.modal.buttonText}</Button>
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