import React, {Component} from 'react';
import { connect } from "react-redux";
import { withTranslate } from "react-redux-multilingual";
import BlockUi from "react-block-ui";
import { Link, NavLink } from "react-router-dom";
import { Button, CustomInput, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ErrorBoundary from "../common/error-boundary";
import Breadcrumb from "../common/breadcrumb";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setDate } from '../../actions'
// import Input from './../../../../components/collection/Input';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { getTaskSiswaList, setModal } from "../../actions";

class TaskKepsek extends Component {

    constructor (props) {
        super (props)
console.log('block constructor', props)
        this.state = {
            columns: [
                {
                    name: 'Status',
                    label: 'Status',
                    options: {
                        filter: false,
                        sort: false,
                        print: false,
                        download: false,
                        customBodyRender: (value, tableMeta, updateValue) => {
                            if(value){
                                console.log('kolum', value)
                                return (
                                // <div>
                                //     <Button title="Submitted" color="info" style={{color: "#fff"}} ><i className="fa fa-check-circle"/></Button>&nbsp;
                                // </div>
                                    <div>
                                    <   i className="fa fa-check-circle" title="Submitted"/>
                                    </div>
                                )
                            }else{
                                return (
                                    <div>
                                        <i className="fa fa-ban" title="Belum Submit"/>
                                    </div>
                                )
                            }
                          
                        }
                    }
                },
                {
                    name: 'Deskripsi',
                    label: 'Deskripsi',
                    options: {
                        filter: true,
                        sort: true,
                    }
                },
                {
                    name: 'Id',
                    label: 'Action',
                    options: {
                        empty: true,
                        filter: false,
                        sort: false,
                        print: false,
                        download: false,
                        customBodyRender: (value, tableMeta, updateValue) => {
                          if(tableMeta.rowData[0] == true){
                            return (
                              <div>
                                {/* <Link to={`/admin/billing/`+ value} style={{color: "#fff"}}>
                                  <Button title="View Detail" color="info" style={{color: "#fff"}}><i className="mdi mdi-eye"/></Button>&nbsp;
                                </Link> */}
                                {/* <Button title="Delete Billing" color="danger" onClick={() => this.deleteBilling(tableMeta)}><i className="mdi mdi-close-outline"/></Button>&nbsp; */}
                                <Button title="Download" color="info" style={{ color: "#fff" }}>Download</Button>&nbsp;
                                <Button title="Upload" color="primary" style={{ color: "#fff" }} onClick={() => this.uploadTask()}>Upload</Button>
                              </div>
                            );
                          }else{                
                            return (
                              <div>
                                {/* <Link to={`/admin/billing/`+ value} style={{color: "#fff"}}>
                                  <Button title="View Detail" color="info" style={{color: "#fff"}}><i className="mdi mdi-eye"/></Button>&nbsp;
                                </Link> */}
                                <Button title="Download" color="info" style={{ color: "#fff" }}>Download</Button>&nbsp;
                                <Button title="Upload" color="primary" style={{ color: "#fff" }} onClick={() => this.uploadTask()}>Upload</Button>
                              </div>
                            );
                          }
                        }
                      }
                },
            ],               
            options : {
                 filterType: 'checkbox',
               }
        }
        this.getList = this.getList.bind(this);
        this.uploadTask = this.uploadTask.bind(this);
        this.modalToggle = this.modalToggle.bind(this);
    }

    componentDidMount(){
        let { getTaskSiswaList } = this.props;
        console.log('sss',this.props)
        this.getList();
    }

    getList(){
        let { getTaskSiswaList } = this.props;
        console.log('www',this.props)
        getTaskSiswaList();
    }

    uploadTask(){
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

    onClickSignOut(){
        localStorage.clear()
        window.location.href = process.env.PUBLIC_URL
	}

    renderView (){
        let { taskSiswaState } = this.props;
        console.log('block renderview', taskSiswaState)

        const options = {
            responsive:"scroll",
            filterType: 'checkbox',
            // filterOptions: ''
            // selectableRows: false,
            // setRowProps: (row) => {
            //   return {
            //     className: classnames(
            //       {
            //         [this.props.classes.UnreadRow]: row[7] === "UNREAD",[this.props.classes.readRow]: row[7] === "READ"
            //       }),
            //   };
            // }
          };

        return (
            <div>
                
                <section className="login-page section-b-space">
                    <div className="container">
                    <h3><i className="mdi mdi-table-edit"/>Kepala Sekolah</h3>
                        <div className="row">
                            <div className="col-lg-3">
                                
                                <div className="theme-card">
                                    <div className="brand-logo">
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
                                        <p>{taskSiswaState.stardet.toString()}</p>
                                    </div><br/>
                                    <form className="theme-form">
                                        <div className="form-group">
                                            <label>Nama : Mr. King</label>
                                            <label>Group : Kepala Sekolah</label>
                                            <label>NIP : 011232001</label>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-9 right-login">
                                {/* <h3>New Customer</h3> */}
                                <div className="theme-card authentication-right">
                                    
                                    <MuiThemeProvider>
                                    <MUIDataTable
                                        title={""}
                                        // data={this.state.data}
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
                            {/* <AsyncPage page={"master-area-form"} fallback={<FormLoader/>} validator={this.validator} ref={this.formArea} /> */}
                        
                        </ModalBody>
                        <ModalFooter>
                        <Button color="secondary" onClick={this.modalToggle}>Cancel</Button>{' '}
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
    {getTaskSiswaList, setModal}
)(withTranslate(TaskKepsek))