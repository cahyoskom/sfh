import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import ClassIcon from '@material-ui/icons/Class';
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

//testing

class ManageUser extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     listClass: [
  //       {
  //         name: "Anto",
  //         email: "anto@gmail.com",
  //         role: "Student",
  //       },
  //       {
  //         name: "Beni",
  //         email: "beni@gmail.com",
  //         role: "Student",
  //       },
  //     ],

  //     listSchool: [
  //       {
  //         name: "SDN 1 Jakarta",
  //         deskripsi: "Jl. Kebayoran lama no.34",
  //       },
  //       {
  //         name: "SDN 2 Jakarta",
  //         deskripsi: "Jl. Mangga no.2",
  //       },
  //     ],
  //   };
  // }

  render() {
    const { userState } = this.props;
    let user = userState.members.data;
    //--
    return (
      <section className='home-page section-b-space'>
        <Container>
          <Grid container direction='column' justify='center' alignItems='stretch'>
            <Grid item xs={12} lg={12}>
              <Card variant='outlined'>
                <CardContent>
                  <Grid container direction='row' justify='center' alignItems='center'>
                    <Grid item xs={12} lg={2}>
                      <h4>
                        <Box fontWeight='fontWeightBold' m={0}>
                          Pengaturan pengguna
                        </Box>
                      </h4>
                    </Grid>

                    <Grid item xs={12} lg={2}>
                      <Button variant='contained' color='primary'>
                        Tambah user
                      </Button>
                    </Grid>

                    <Grid item xs={12} lg={6}></Grid>

                    <Grid item xs={12} lg={2}>
                      <TextField id='filled-basic' label='Cari pengguna' variant='filled' />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            {/* ------------------------------------------- */}
            <Grid item xs={12} lg={12}>
              <Card variant='outlined'>
                <CardContent>
                  <Grid container direction='row' justify='center' alignItems='center'>
                    <Grid item xs={12} lg={3}>
                      <h4>
                        <Box fontWeight='fontWeightBold' m={0}>
                          Nama lengkap
                        </Box>
                      </h4>
                    </Grid>

                    <Grid item xs={12} lg={3}>
                      <h4>
                        <Box fontWeight='fontWeightBold' m={0}>
                          Email
                        </Box>
                      </h4>
                    </Grid>

                    <Grid item xs={12} lg={3}>
                      <h4>
                        <Box fontWeight='fontWeightBold' m={0}>
                          Role
                        </Box>
                      </h4>
                    </Grid>

                    <Grid item xs={12} lg={3}>
                      <h4>
                        <Box fontWeight='fontWeightBold' m={0}>
                          Aksi
                        </Box>
                      </h4>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              {user.map((row, index) => (
                <Card variant='outlined'>
                  <CardContent>
                    <Grid container direction='row' justify='center' alignItems='center'>
                      <Grid item xs={12} lg={3}>
                        <h4>{row.name}</h4>
                      </Grid>

                      <Grid item xs={12} lg={3}>
                        <h4>{row.email}</h4>
                      </Grid>

                      <Grid item xs={12} lg={3}>
                        <h4>{row.role}</h4>
                      </Grid>

                      <Grid item xs={12} lg={3}>
                        <Grid container direction='row' justify='flex-start' alignItems='flex-start' spacing={1}>
                          <Grid item>
                            <Button variant='contained' size='medium' color='primary'>
                              Hapus
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button variant='contained' size='medium' color='primary'>
                              Detail
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </Grid>
        </Container>
      </section>
    );
  }
}

// export default SignIn
const mapStateToProps = state => ({
  userState: state.manageUser
});

export default connect(mapStateToProps, {})(ManageUser);
