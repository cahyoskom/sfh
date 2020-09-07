import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';
import BlockUi from 'react-block-ui';
import { Link, NavLink } from 'react-router-dom';
import { Button, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Label } from 'reactstrap';
import CustomFooterGuru from '../common/customFooterGuru';
// import Select from "../common/Select";
import 'react-widgets/dist/css/react-widgets.css';
import DateTimePicker from '../common/DatePicker';
// import Input from "../common/Input";
import 'react-datepicker/dist/react-datepicker.css';
import '../tasklist/tasksiswa.css';
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import * as actions from '../../actions';
import moment from 'moment';
import * as messageBox from '../common/message-box';
import SimpleReactValidator from 'simple-react-validator';
import { Formik, Form, Field } from 'formik';
import Breadcrumb from '../common/breadcrumb';

class Group extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let { adminGetGroupList, adminGetUserList } = this.props;
    // document.getElementById('sticky').style.display = "none"
    adminGetGroupList();
    // adminGetUserList();
  }

  addUser() {
    let { setModal } = this.props;
    setModal('type', 'addUser');
    setModal('title', 'Add User');
    setModal('buttonText', 'Add');
    setModal('show', true);
    this.setState(prevState => ({
      ...prevState,
      isAddUser: true,
      isAddGroup: false
    }));
  }

  addGroup() {
    let { setModal } = this.props;
    setModal('type', 'addGroup');
    setModal('title', 'Add Group');
    setModal('buttonText', 'Add');
    setModal('show', true);
    this.setState(prevState => ({
      ...prevState,
      isAddUser: false,
      isAddGroup: true
    }));
  }

  onClickSignOut() {
    localStorage.clear();
    window.location.href = process.env.PUBLIC_URL;
  }

  modalToggle() {
    const { adminState, setModal } = this.props;
    setModal('show', !adminState.modal.show);
  }

  renderView() {
    let { adminState, adminSetModalFormUser, setStateModalForm } = this.props;

    const options = {
      responsive: 'scroll',
      filter: false,
      search: false,
      download: false,
      print: false,
      viewColumns: false,
      selectableRows: false
    };

    return;
  }

  render() {
    let { adminState } = this.props;
    return (
      <BlockUi
        tag='div'
        message={
          <span>
            <div id='preloader'>
              <div id='loader' />
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
  adminState: state.admin
});

export default connect(mapStateToProps, { ...actions })(withTranslate(Group));
