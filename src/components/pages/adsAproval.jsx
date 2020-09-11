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



class AdsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: {
        maxWidth: 200
      }
    };
  }


  // componentDidMount() {
  //   const { getDataClassInfo, onChangeStateClassInfo, getDataClassMembers } = this.props;
  //   onChangeStateClassInfo('id', this.props.match.params.id);
  //   getDataClassMembers();
  //   getDataClassInfo();
  // }

  render() {
    // const useStyles = makeStyles((theme) => ({
    //   root: {
    //     flexGrow: 1,
    //   },
    //   paper: {
    //     padding: theme.spacing(2),
    //     margin: 'auto',
    //     maxWidth: 500,
    //   },
    //   image: {
    //     width: 128,
    //     height: 128,
    //   },
    //   img: {
    //     margin: 'auto',
    //     display: 'block',
    //     maxWidth: '100%',
    //     maxHeight: '100%',
    //   },
    // }));

    const { classState, postAddMember, onChangeStateAddMember } = this.props;
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
          <Paper elevated={3} variant="outlined" square style={{
            margin: 'auto',
            maxWidth: 500,
            padding: '20px',
          }}>
            <Grid container spacing={1} name="Grid Main Container" justify="center" alignItem="center">

              <Grid container item spacing={3} xs={12} name="Grid Container 1" >
                <Grid item><Paper xs={4} style={{ padding: '20px' }}>Iklan Bawah 1</Paper></Grid>
                <Grid item><Paper xs={4} style={{ padding: '20px' }}>Iklan Bawah 2</Paper></Grid>
                <Grid item><Paper xs={4} style={{ padding: '20px' }}>Iklan Bawah 3</Paper></Grid>
              </Grid>

              <Grid container item spacing={3} xs={12} name="Grid Container 2" >
                <Grid item><Paper xs={4} style={{ padding: '20px' }}>Iklan Bawah 1</Paper></Grid>
                <Grid item><Paper xs={4} style={{ padding: '20px' }}>Iklan Bawah 2</Paper></Grid>
                <Grid item><Paper xs={4} style={{ padding: '20px' }}>Iklan Bawah 3</Paper></Grid>
              </Grid>

              <Grid container item spacing={3} xs={12} name="Grid Container 3" >
                <Grid item><Paper xs={4} style={{ padding: '20px' }}>Iklan Bawah 1</Paper></Grid>
                <Grid item><Paper xs={4} style={{ padding: '20px' }}>Iklan Bawah 2</Paper></Grid>
                <Grid item><Paper xs={4} style={{ padding: '20px' }}>Iklan Bawah 3</Paper></Grid>
              </Grid>

            </Grid>



          </Paper>

        </div >
        <div>&nbsp;</div>
      </>
    );
  }
}


export default connect(/* mapStateToProps, mapDispatchToProps */)(AdsList);

// <Grid item xs={10} sm={10} md={10} lg={10} xl={12} spacing={1}>
//   <div className="h5 font-weight-bold pb-3">Pratinjau</div>
// </Grid>
//   <Grid></Grid>
//   <Paper
//     elevation={3}
//   style={{
//     margin: '0px 100px 16px 100px',
//     padding: '50px 0px 0px 0px',
//     maxWidth: '200',
//     backgroundImage: `url('${process.env.PUBLIC_URL}/assets/images/layout-bgcontainer-iklan.png')`,
//     backgroundRepeat: 'no-repeat',
//     backgroundSize: 'cover',
//   }}
//   >

//     <Grid
//       item
//       style={{
//         margin: '75px',
//         padding: '0px 0px 50px 0px ',
//       }}>
//        <img
//                     style={{
//                       margin: 'auto',
//                       display: 'block',
//                       maxWidth: '100%',
//                       maxHeight: '100%',
//                       width: '1200px',
//                     }}
//                     alt="bgcontainer"
//                     src={`${process.env.PUBLIC_URL}/assets/images/layout-bgcontainer-iklan.png`}
//                   />

//       <Grid container direction='col' spacing={1} justify='center' alignItems='center'>

//         <Grid direction='row' item alt="ads-left-position">
//           <img
//                           style={{
//                             margin: 'auto',
//                             display: 'block',
//                             maxWidth: '100%',
//                             maxHeight: '100%',
//                             width: '100px',

//                           }}
//                           alt="Ads Left"
//                           src={`${process.env.PUBLIC_URL}/assets/images/milo.jpg`}
//                         />
//         </Grid>
//         <img
//           style={{
//             margin: 'auto',
//             display: 'block',
//             maxWidth: '100%',
//             maxHeight: '100%',
//             height: '500px',
//           }}
//           alt="mainlayout"
//           src={`${process.env.PUBLIC_URL}/assets/images/layout-item-1-iklan.png`}
//         />
//         <Grid item alt="ads-right-position">
//           <img
//                           style={{
//                             margin: 'auto',
//                             display: 'block',
//                             maxWidth: '100%',
//                             maxHeight: '100%',
//                             width: '100px',

//                           }}
//                           alt="Ads Right"
//                           src={`${process.env.PUBLIC_URL}/assets/images/milo.jpg`}
//                         />
//         </Grid>
//         <Grid item alt="ads-bottom-position">
//           <img
//             style={{
//               margin: 'auto',
//               display: 'block',
//               maxWidth: '100%',
//               maxHeight: '100%',
//               width: '1000px',
//             }}
//             alt="Ads Bottom"
//             src={`${process.env.PUBLIC_URL}/assets/images/milo.jpg`}
//           />
//         </Grid>
//       </Grid>
//     </Grid>
//   </Paper>