import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Paper,
  Button,
  Container,
  Divider,
  Box,
} from "@material-ui/core";
import { Image, Col } from "react-bootstrap";
import { getSchool } from "../../actions";

class SchoolInfo extends Component {
  //   constructor(props) {
  //     super(props);

  //     this.state = {
  //       schoolData: {
  //           name: '',
  //           address: '',
  //           phone: '',

  //       },
  //     };
  //   }

  componentDidMount = () => {
    console.log(this.props.match.params.id);
    this.props.getSchool(this.props.match.params.id);
    console.log("DONE");
  };

  render() {
    const { schoolState } = this.props;
    return (
      <div>
        <section className="school-page section-b-space">
          <Container>
            <Grid container justify="center" alignItems="center">
              <Grid item xs={12} lg={6}>
                <Paper elevation={3}>
                  <Box p={3}>
                    <Grid
                      container
                      direction="col"
                      justify="center"
                      alignItems="center"
                      spacing={3}
                    >
                      <Grid item container justify="center">
                        <Image
                          className="school-logo"
                          style={{ height: "140px", width: "140px" }}
                          src={`${process.env.PUBLIC_URL}/assets/images/size-chart.jpg`}
                          roundedCircle
                        ></Image>
                      </Grid>
                      <hr
                        style={{ border: "1px solid #C4C4C4", width: "100%" }}
                      />

                      <Grid item container direction="row">
                        <Grid item xs={5} lg={5}>
                          <strong>Nama Sekolah</strong>
                        </Grid>
                        <Grid item xs={7} lg={7}>
                          {schoolState.data.name}
                        </Grid>
                      </Grid>
                      <Grid item container direction="row">
                        <Grid item xs={5} lg={5}>
                          <strong>Alamat</strong>
                        </Grid>
                        <Grid item xs={7} lg={7}>
                          {schoolState.data.address}
                        </Grid>
                      </Grid>
                      <Grid item container direction="row">
                        <Grid item xs={5} lg={5}>
                          <strong>Nomor telepon</strong>
                        </Grid>
                        <Grid item xs={7} lg={7}>
                          {schoolState.data.phone}
                        </Grid>
                      </Grid>
                      {/* ONLY SHOW FOR SCHOOL OWNER */}
                      <Grid item container direction="row">
                        <Grid item xs={5} lg={5}>
                          <strong>Kode Sekolah</strong>
                        </Grid>
                        <Grid item xs={7} lg={7}>
                          {schoolState.data.code}
                        </Grid>
                      </Grid>
                      {/* <Grid item container direction="row">
                      <Grid item xs={5} lg={5}>
                        <strong>Catatan Sekolah</strong>
                      </Grid>
                      <Grid item xs={7} lg={7}>
                        {schoolState.school.catatan ||
                          "Belum mengisi catatan sekolah"}
                      </Grid>
                    </Grid> */}
                      <Grid
                        item
                        container
                        direction="row"
                        justify="space-between"
                      >
                        <Grid item xs={6} lg={6}>
                          <Button
                            color="secondary"
                            variant="contained"
                            disableElevation
                          >
                            Hapus Sekolah
                          </Button>
                        </Grid>
                        <Grid item container xs={6} lg={6} justify="flex-end">
                          <Button
                            color="primary"
                            variant="contained"
                            disableElevation
                          >
                            Edit
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  schoolState: state.school,
});
export default connect(mapStateToProps, {
  getSchool,
})(SchoolInfo);
