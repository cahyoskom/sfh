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
          this.setState({ success: true, accepted: !res.data.is_new_member, schoolName: res.data.school_name });
        })
        .catch(err => {
          this.setState({ success: false });
        });
    }
  }

  render() {
    return (
      <div>
        <section className='confirmation-page'>
          <Container>
            {this.state.success ? (
              <Grid container direction='column' justify='center' alignItems='center' spacing={2}>
                <Grid item xs={12}>
                  <img src={`${process.env.PUBLIC_URL}/assets/images/confirmation-img.png`} alt='confirmation-img'></img>
                </Grid>
                <Grid item xs={12} justify='center'>
                  <div alignItems='center'>{this.state.accepted && <h5>Link undangan sudah diakses</h5>}</div>
                </Grid>
                <Grid item xs={12} justify='center'>
                  <div alignItems='center'>
                    {!this.state.accepted ? (
                      <h7>
                        Anda berhasil bergabung sebagai anggota <strong>{this.state.schoolName}</strong>
                      </h7>
                    ) : (
                      <h7>
                        Anda sudah tergabung sebagai anggota <strong>{this.state.schoolName}</strong>
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
            ) : (
              <Grid container direction='column' justify='center' alignItems='center' spacing={2}>
                <Grid item xs={12} lg={8} justify='center'>
                  <Alert severity='error'>Link undangan tidak valid</Alert>
                </Grid>
              </Grid>
            )}
          </Container>
        </section>
      </div>
    );
  }
}

export default Invitation;
