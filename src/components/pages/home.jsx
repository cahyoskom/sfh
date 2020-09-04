import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import { Grid, TextField, Button, IconButton, Card, CardContent, Collapse } from '@material-ui/core';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <section className='home-page section-b-space'>
        <Container>
          <Grid container direction='row' justify='flex-start' alignItems='center'>
            <Grid item xs={12} lg={12}></Grid>
          </Grid>
        </Container>
      </section>
    );
  }
}

// export default SignIn
const mapStateToProps = state => ({
  landingState: state.landingpage
});

export default connect(mapStateToProps, null)(Home);
