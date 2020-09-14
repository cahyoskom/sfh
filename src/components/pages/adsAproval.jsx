import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import { Image } from 'react-bootstrap';
import ButtonBase from '@material-ui/core/ButtonBase';

import {
  getDataClassMembers,
  getDataClassInfo,
  onChangeStateClassInfo,
  onChangeStateUpdateMember,
  postUpdateMember,
  onChangeStateAddMember,
  postAddMember
} from '../../actions';

import Alert from '@material-ui/lab/Alert';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Grid, GridList, Box, Collapse, IconButton, Container, Breadcrumbs, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { default as MaterialLink } from '@material-ui/core/Link';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';


class AdsAproval extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      msg: "",
      table: {
        maxWidth: 200
      }
    };
  }
  onSetujuiClick = (e) => {
    console.log(e);
    this.setState({
      msg: 'Apakah Anda sudah yakin akan menyetujui publikasi iklan Milo?',
      modal: true
    });
  };
  onTolakClick = () => {
    this.setState({
      msg: 'Apakah Anda sudah yakin akan tolak publikasi iklan Milo?',
      modal: true
    });
  };
  closeModal = () => {
    this.setState({ modal: false });
  };


  // componentDidMount() {
  //   const { getDataClassInfo, onChangeStateClassInfo, getDataClassMembers } = this.props;
  //   onChangeStateClassInfo('id', this.props.match.params.id);
  //   getDataClassMembers();
  //   getDataClassInfo();
  // }

  render() {

    const { buttonLabel, className, toggle, modal, closeModal } = this.props;

    let iklan = [
      {
        id: 1,
        nama: "Naster kering enak",
        pembuat: "ipul",
        dilihat: 0,
        periode: "01-08-2020 sampai 07-08-2020",
        status: "Menunggu Persetujuan",
        tarif: 5000
      }
    ];




    return (
      <>
        <div style={{ flexGrow: '1' }} name="rootpage">
          <Grid>
            <Paper
              className="h5 font-weight-bold pb-2"
              elevation={0}
              square
              style={{
                margin: 'auto',
                maxWidth: 800,
              }}>Pratinjau
            </Paper>
          </Grid>
          <Paper elevated={3} variant="outlined" square style={{
            margin: 'auto',
            maxWidth: 800,
            padding: '20px',
          }}>

            <Grid container spacing={1} name="Grid Main Container" justify="center" alignItem="center">
              <Grid container item spacing={3} xs={12} name="Grid Container 1" justify="center" alignItem="center">
                {/* <Grid item xs={12} ><Paper style={{ padding: '20px' }}>Iklan Atas</Paper></Grid> */}
              </Grid>

              <Grid container item spacing={0} xs={12} name="Grid Container 2" justify="center" alignItem="center">
                {/* <Grid item xs={2} ><Paper style={{ padding: '20px' }}>Iklan Kiri</Paper></Grid> */}
                <Grid item xs={12} ><Paper elevation={0} style={{ padding: '20px 20px 0px 20px' }}>
                  <img
                    style={{
                      margin: 'auto',
                      display: 'block',
                      maxWidth: '100%',
                      maxHeight: '100%',
                    }}
                    alt="Main Item Tengah"
                    src={`${process.env.PUBLIC_URL}/assets/images/layout-item-1-iklan.png`}
                  /></Paper></Grid>
                {/* <Grid item xs={2} ><Paper style={{ padding: '20px' }}>Iklan Kanan</Paper></Grid> */}
              </Grid>

              <Grid container item spacing={3} xs={12} name="Grid Container 3" justify="center" alignItem="center">
                <Grid item xs={12} ><Paper elevation={0} style={{ padding: '0px 15px 0px 15px' }}><img
                  style={{
                    margin: 'auto',
                    display: 'block',
                    maxWidth: '100%',
                    maxHeight: '100%',
                  }}
                  alt="Iklan Bawah"
                  src={`${process.env.PUBLIC_URL}/assets/images/milo.jpg`}
                /></Paper></Grid>
              </Grid>
            </Grid>
          </Paper>
          <Grid>
            <Paper
              elevation={0}
              square
              style={{
                margin: 'auto',
                maxWidth: 800,
                padding: '20px 0px 0px 0px',
              }}>
              <div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
                <div class="btn-group" role="group" aria-label="1st group">
                  <Link to={`${process.env.PUBLIC_URL}`}>
                    <Button size="small" variant="contained" className="">Kembali</Button>
                  </Link>
                </div>
                <div class="btn-group" role="group" aria-label="2nd group">
                  <Button size="small" variant="contained" color="primary" onClick={this.onSetujuiClick}>Setujui</Button>
                  <Button size="small" variant="contained" color="secondary" className="ml-3" onClick={this.onTolakClick}>Tolak</Button>
                </div>
              </div>
            </Paper>
          </Grid>
        </div >
        <div>&nbsp;</div>
        {/* modal Setujui Ads */}
        <Modal
          isOpen={this.state.modal}
          centered={true}
          style={{
            maxWidth: 400,
          }}>
          <ModalBody>
            <div className="text-center m-3">{this.state.msg}</div>
            <div className="text-center m-2 mt-3">
              <Button variant="contained" className="mr-3" onClick={this.closeModal}>Kembali</Button>
              <Button variant="contained" color="primary" onClick={this.closeModal}>Ya, sudah yakin</Button>{' '}
            </div>
          </ModalBody>
        </Modal>
      </>
    );
  }
}


export default connect(/* mapStateToProps, mapDispatchToProps */)(AdsAproval);