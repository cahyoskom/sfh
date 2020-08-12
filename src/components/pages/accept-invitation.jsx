import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { API_BASE_URL_DEV, API_PATH } from '../../constants/api';
import axios from 'axios';

class Invitation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      accepted: false,
      message: '',
      schoolName: ''
    };
  }

  componentDidMount() {
    var url = window.location.search.substring(1);
    var queryStringObj = JSON.parse(
      '{"' + decodeURI(url).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}'
    );
    if (queryStringObj.q == 'school') {
      axios
        .get(API_BASE_URL_DEV + API_PATH.schoolInvitation + '?code=' + queryStringObj.code)
        .then(res => {
          if (res.status == 200) {
            this.setState({ success: true, schoolName: res.data.school_name });
          } else if (res.status == 200001) {
            this.setState({ success: true, accepted: true, schoolName: res.data.school_name });
          } else {
            this.setState({ success: false, message: res.data.message });
          }
        })
        .catch(err => {
          this.setState({ success: false, message: err.message });
        });
    }
  }

  render() {
    return (
      <div>
        <section className='confirmation-page'>
          <Container>
            {this.state.success && (
              <Grid container direction='column' justify='center' alignItems='center' spacing={2}>
                <Grid item xs={12}>
                  <img src={`${process.env.PUBLIC_URL}/assets/images/confirmation-img.png`} alt='confirmation-img'></img>
                </Grid>
                <Grid item xs={12} justify='center'>
                  <div alignItems='center'>
                    {this.state.accepted ? (
                      <h3>Link sudah digunakan</h3>
                    ) : (
                      <h3>
                        <strong>Oke!</strong>
                      </h3>
                    )}
                  </div>
                </Grid>
                <Grid item xs={12} justify='center'>
                  <div alignItems='center'>
                    {this.state.accepted ? (
                      <h7>
                        Anda berhasil bergabung sebagai anggota <strong>{this.state.schoolName}</strong>
                      </h7>
                    ) : (
                      <h7>
                        Anda telah tergabung sebagai anggota <strong>{this.state.schoolName}</strong>
                      </h7>
                    )}
                  </div>
                </Grid>
                <Grid item xs={12} container direction='column' alignItems='center' justify='center'>
                  <Link to={`${process.env.PUBLIC_URL}/login`}>
                    <Button variant='contained' color='primary'>
                      Lanjutkan
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            )}
            <Grid container direction='column' justify='center' alignItems='center' spacing={2}>
              <Grid item xs={12} lg={8} justify='center'>
                <Alert severity='error'>{this.state.message}</Alert>
              </Grid>
            </Grid>
          </Container>
        </section>
      </div>
    );
  }
}

export default Invitation;
