import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';


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
          </Grid>
        </Container>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  landingState: state.landingpage
});

export default connect(mapStateToProps, null)(Home);
