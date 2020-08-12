import React, { Component } from 'react';

import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getDataClassMembers, getDataClassInfo, onChangeStateClassInfo } from '../../actions';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import { Grid, Box } from '@material-ui/core';

class ClassMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: {
        maxWidth: 200
      }
    };
  }
  componentDidMount() {
    const { getDataClassInfo, onChangeStateClassInfo, getDataClassMembers } = this.props;
    onChangeStateClassInfo('id', this.props.match.params.id);
    getDataClassMembers();
    getDataClassInfo();
  }

  render() {
    const { classState } = this.props;
    let students = [];
    let teachers = [];
    if (classState.members.data != '') {
      students = classState.members.data.students; //
      // students = JSON.parse(classState.members.data).students;
      teachers = classState.members.data.teachers; //
      // teachers = JSON.parse(classState.members.data).teachers;
    }
    return (
      <section className='home-page section-b-space'>
        <Grid container direction='column' justify='center' alignItems='center'>
          <Grid item xs={12} lg={12}>
            <Box maxWidth={1300}>
              <Card variant='outlined'>
                <CardContent>
                  <Grid container direction='row' justify='center' alignItems='stretch' spacing={2}>
                    <Grid container direction='row' justify='center' alignItems='flex-start' m={2}>
                      <Grid item xs={12} lg={4}>
                        <h4>
                          <strong>Nama kelas</strong>
                        </h4>
                      </Grid>
                      <Grid item xs={12} lg={8}>
                        {classState.classInfo.name}
                      </Grid>
                    </Grid>
                    <Grid container direction='row' justify='center' alignItems='flex-start' m={2}>
                      <Grid item xs={12} lg={4}>
                        <h4>
                          <strong>Deskripsi</strong>
                        </h4>
                      </Grid>
                      <Grid item xs={12} lg={8}>
                        {classState.classInfo.description}
                      </Grid>
                    </Grid>
                    <Grid container direction='row' justify='center' alignItems='flex-start'>
                      <Grid item xs={12} lg={4}>
                        <h4>
                          <strong>Kode kelas</strong>
                        </h4>
                      </Grid>
                      <Grid item xs={12} lg={8}>
                        {classState.classInfo.code}
                      </Grid>
                    </Grid>
                    <Grid container direction='row' justify='center' alignItems='flex-start'>
                      <Grid item xs={12} lg={4}>
                        <h4>
                          <strong>Catatan kelas</strong>
                        </h4>
                      </Grid>
                      <Grid item xs={12} lg={8}>
                        {classState.classInfo.note == '' && <p>Belum mengisi catatan kelas</p>}
                        {!classState.classInfo.note == '' && classState.classInfo.note}
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <Grid container direction='row' justify='space-between' alignItems='center'>
                <Grid item>
                  <h3>Pengajar</h3>
                </Grid>
                <Grid item>
                  <Button color='primary' variant='contained'>
                    tambah pengajar +
                  </Button>
                </Grid>
              </Grid>
              <TableContainer component={Paper}>
                <Table className='tableMember' aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      {classState.members.data.hasAuthority && <TableCell>Status</TableCell>}
                      <TableCell>Nama</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {teachers.map(row => (
                      <TableRow key={row.name}>
                        {classState.members.data.hasAuthority && <TableCell>{row.link_status}</TableCell>}
                        <TableCell component='th' scope='row'>
                          {row.name}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Grid container direction='row' justify='space-between' alignItems='center'>
                <Grid item>
                  <h3>Pelajar</h3>
                </Grid>
                <Grid item>
                  <Button color='primary' variant='contained'>
                    tambah pelajar +
                  </Button>
                </Grid>
              </Grid>
              <TableContainer component={Paper}>
                <Table className='tableMember' aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      {classState.members.data.hasAuthority && <TableCell>Status</TableCell>}
                      <TableCell>Nama</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students.map(row => (
                      <TableRow key={row.name}>
                        {classState.members.data.hasAuthority && <TableCell>{row.link_status}</TableCell>}
                        <TableCell component='th' scope='row'>
                          {row.name}
                        </TableCell>
                        {classState.members.data.hasAuthority && row.link_status == 'Disetujui' && (
                          <TableCell>
                            <Button color='secondary' variant='contained'>
                              Nonaktifkan
                            </Button>
                            <Button variant='contained'>Keluarkan</Button>
                          </TableCell>
                        )}
                        {classState.members.data.hasAuthority && row.link_status == 'Menunggu persetujuan' && (
                          <TableCell>
                            <Button color='secondary' variant='contained'>
                              Tolak
                            </Button>
                            <Button color='primary' variant='contained'>
                              Setujui
                            </Button>
                          </TableCell>
                        )}
                        {classState.members.data.hasAuthority && row.link_status == 'Dinonaktifkan' && (
                          <TableCell>
                            <Button color='secondary' variant='contained'>
                              Keluarkan
                            </Button>
                            <Button color='primary' variant='contained'>
                              Aktifkan
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        </Grid>
      </section>
    );
  }
}
const mapStateToProps = state => ({
  // accountState: state.account,
  classState: state.class
});

// export default ClassInfo;
export default connect(mapStateToProps, {
  getDataClassInfo,
  getDataClassMembers,
  onChangeStateClassInfo
})(ClassMember);
