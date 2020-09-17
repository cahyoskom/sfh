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
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import Moment from 'moment';
import {
  adminAprovalGetDataAds,
} from '../../actions';


import { Grid, Box, Collapse, IconButton, Container, Breadcrumbs, Typography, Button } from '@material-ui/core';

class AdsList extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { adminAprovalGetDataAds } = this.props;
    adminAprovalGetDataAds();
  }
  render() {
    return (
      <div>
        <Container>
          <section className='home-page pt-4'>
            <Grid container direction='col' spacing={2} justify='center' alignItems='center'>
              <Grid item xs={10} spacing={1}>

                <div className="h5 font-weight-bold pb-3">Dashboard Iklan</div>

              </Grid>

              <Grid item lg={10}>
                <TableContainer component={Paper} elevation={3}>
                  <Table className='tableMember'/*  aria-label='simple table' */ size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow style={{ height: '60px' }}>
                        <TableCell style={{ width: '165px' }}>
                          <strong>Nama Iklan</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Pembuat</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Dilihat</strong>
                        </TableCell>
                        <TableCell style={{ width: '170px' }}>
                          <strong>Periode</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Tarif</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Status</strong>
                        </TableCell>
                        <TableCell style={{ width: '150px' }}>
                          <strong>Aksi</strong>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Array.isArray(this.props.admListAdsState.data) &&
                        this.props.admListAdsState.data.map(row => (
                          <TableRow hover key={row.id}>
                            <TableCell style={{ color: '#000000' }}>{row.sec_user_model.email}</TableCell>
                            <TableCell style={{ color: '#000000' }}>{row.sec_user_model.name}</TableCell>
                            <TableCell style={{ color: '#000000' }}>{0}</TableCell>
                            <TableCell style={{
                              color: '#000000',
                              fontFamily: ''
                            }}>{Moment(row.periode_awal).format('DD-MM-YYYY') + ' sampai ' + Moment(row.periode_akhir).format('DD-MM-YYYY')}</TableCell>
                            <TableCell style={{ color: '#000000', align: 'right' }}>{'Rp. ' + new Intl.NumberFormat(['ban', 'id']).format(row.tarif)}</TableCell>
                            {row.status == '2' && (
                              <TableCell style={{ color: '#5FD855' }}>{'Dipubilkasikan'}</TableCell>
                            )}
                            {row.status == '1' && (
                              <TableCell style={{ color: '#F4A31E' }}>{'Menunggu Persetujuan'}</TableCell>
                            )}
                            <TableCell >
                              <Link to={`${process.env.PUBLIC_URL}/pratinjau/${row.id}`}>
                                <Button style={{ backgroundColor: '#15A3B8' }} className='btn text-white'>
                                  Pratinjau
                            </Button>
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>

                    <TableFooter>
                      <TableRow>
                        <TablePagination
                          style={{ padding: '0 115px 0 0' }}
                          rowsPerPageOptions={[3, 5, 25, 50, 100]}
                          colSpan={7}
                          count={5}
                          rowsPerPage={3}
                          page={0}
                          SelectProps={{
                            native: true
                          }}
                          onChangePage={this.handleChangePage}
                          onChangeRowsPerPage={this.handleChangeRowsPerPage}
                          onClick={this.onClickPage}
                        />
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </section>
        </Container>
        <div>&nbsp;</div>
      </div >

    );
  }
}


const mapStateToProps = state => {
  return {
    admListAdsState: state.admAdsAproval,
  };
};

export default connect(mapStateToProps, { adminAprovalGetDataAds })(AdsList);