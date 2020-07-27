import React, { Component } from 'react';
import { postLogout } from '../../actions';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
//
import Container from '@material-ui/core/Container';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import ClassIcon from '@material-ui/icons/Class';
import AddIcon from '@material-ui/icons/Add';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listClass: [
        {
          name: 'Kelas 2A',
          username: 'Budi',
          tahun: 'Tahun ajaran 2020',
          statusnya: 'Belum Terverifikasi'
        },
        {
          name: 'Kelas 5A',
          username: 'Andi',
          tahun: 'Tahun ajaran 2020',
          statusnya: 'Belum Terverifikasi'
        }
      ],

      listSchool: [
        {
          name: 'SDN 1 Jakarta',
          deskripsi: 'Jl. Kebayoran lama no.34'
        },
        {
          name: 'SDN 2 Jakarta',
          deskripsi: 'Jl. Mangga no.2'
        }
      ]
    };
  }

  render() {
    const { postLogout } = this.props;
    return (
      <section className='home-page section-b-space'>
        <div className='container'>
          <Button color='warning' onClick={postLogout}>
            Logout
          </Button>
        </div>
        <Container>
          <Grid
            container
            direction='row'
            justify='flex-start'
            alignItems='center'>
            <Grid item xs={12} lg={12}>
              <Card variant='outlined'>
                <CardContent>
                  <Grid
                    container
                    direction='row'
                    justify='flex-start'
                    alignItems='flex-start'>
                    <Grid item xs={12} lg={5}>
                      <Grid
                        container
                        direction='column'
                        justify='flex-start'
                        alignItems='stretch'
                        spacing={2}>
                        <Grid item>
                          <h3>Kelas</h3>
                        </Grid>
                        <Grid item>
                          <Grid
                            container
                            direction='row'
                            justify='flex-start'
                            alignItems='stretch'
                            spacing={2}>
                            <Grid item>
                              <Button
                                variant='contained'
                                color='primary'
                                startIcon={<ClassIcon />}>
                                Gabung Kelas
                              </Button>
                            </Grid>
                            <Grid item>
                              <Button
                                variant='contained'
                                color='primary'
                                startIcon={<AddIcon />}>
                                Buat Kelas
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>

                        {this.state.listClass.map((kelas, index) => (
                          <Grid item xs={12} lg={12}>
                            <Card variant='outlined'>
                              <CardContent>
                                <Grid
                                  container
                                  direction='row'
                                  justify='center'
                                  alignItems='center'>
                                  <Grid item xs={12} lg={9}>
                                    <Grid
                                      container
                                      direction='column'
                                      justify='center'
                                      alignItems='flex-start'>
                                      <Grid item>
                                        <p>{kelas.name}</p>
                                      </Grid>
                                      <Grid item>
                                        <p>{kelas.username}</p>
                                      </Grid>
                                      <Grid item>
                                        <p>{kelas.tahun}</p>
                                      </Grid>
                                      <Grid item>
                                        <p>{kelas.statusnya}</p>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  <Grid item xs={12} lg={3}>
                                    <Avatar>N</Avatar>
                                  </Grid>
                                </Grid>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>

                    {/* ------------------------------------------------------------------------------ */}
                    <Grid item sm={12} lg={2}></Grid>
                    {/* ------------------------------------------------------------------------------ */}

                    <Grid item xs={12} lg={5}>
                      <Grid
                        container
                        direction='column'
                        justify='flex-start'
                        alignItems='stretch'
                        spacing={2}>
                        <Grid item>
                          <h3>Sekolah</h3>
                        </Grid>
                        <Grid item>
                          <Grid
                            container
                            direction='row'
                            justify='flex-start'
                            alignItems='stretch'
                            spacing={2}>
                            <Grid item>
                              <Button
                                variant='contained'
                                color='primary'
                                startIcon={<AddIcon />}>
                                Buat Kelas
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>

                        {this.state.listSchool.map((sekolah, index) => (
                          <Grid item xs={12} lg={12}>
                            <Card variant='outlined'>
                              <CardContent>
                                <Grid
                                  container
                                  direction='row'
                                  justify='center'
                                  alignItems='center'>
                                  <Grid item xs={12} lg={9}>
                                    <Grid
                                      container
                                      direction='column'
                                      justify='center'
                                      alignItems='flex-start'>
                                      <Grid item>
                                        <p>{sekolah.name}</p>
                                      </Grid>
                                      <Grid item>
                                        <p>{sekolah.deskripsi}</p>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  <Grid item xs={12} lg={3}>
                                    <Avatar>N</Avatar>
                                  </Grid>
                                </Grid>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </section>
    );
  }
}
const mapStateToProps = (state) => ({
  accountState: state.class
});

// export default Home;
export default connect(mapStateToProps, {
  postLogout
})(Home);
