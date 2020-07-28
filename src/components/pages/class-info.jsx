import React, { Component } from "react";
import { postLogout } from "../../actions";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
//
import Container from "@material-ui/core/Container";
import { Grid, Box } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import ClassIcon from "@material-ui/icons/Class";
import AddIcon from "@material-ui/icons/Add";

class ClassInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listClass: [
        {
          name: "Kelas 2A",
          username: "Budi",
          tahun: "Tahun ajaran 2020",
          statusnya: "Belum Terverifikasi",
        },
        {
          name: "Kelas 5A",
          username: "Andi",
          tahun: "Tahun ajaran 2020",
          statusnya: "Belum Terverifikasi",
        },
      ],
      classInfo: {
        name: "12 IPA 2",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis explicabo impedit cum possimus. Ratione provident assumenda voluptates libero velit ad necessitatibus molestiae, illo repellat optio nemo eum voluptatem perferendis nostrum!",
        school: "SMAN 99 Jakarta",
        code: "mpKtB20",
        note: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      },
      cardClass: {
        maxWidth: 200,
      },
    };
  }

  render() {
    const { postLogout } = this.props;
    return (
      <section className="home-page section-b-space">
        <Container>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12} lg={12}>
              <Box maxWidth={700}>
                <Card variant="outlined">
                  <CardContent>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="stretch"
                      spacing={2}
                    >
                      <Grid item>
                        <h3>Kelas</h3>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="flex-start"
                      >
                        <Grid item xs={12} lg={4}>
                          <h4>
                            <strong>Nama kelas</strong>
                          </h4>
                        </Grid>
                        <Grid item xs={12} lg={8}>
                          <h4>{this.state.classInfo.name}</h4>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="flex-start"
                      >
                        <Grid item xs={12} lg={4}>
                          <h4>
                            <strong>Deskripsi</strong>
                          </h4>
                        </Grid>
                        <Grid item xs={12} lg={8}>
                          <h4>{this.state.classInfo.description}</h4>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="flex-start"
                      >
                        <Grid item xs={12} lg={4}>
                          <h4>
                            <strong>Sekolah</strong>
                          </h4>
                        </Grid>
                        <Grid item xs={12} lg={8}>
                          <h4>{this.state.classInfo.school}</h4>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="flex-start"
                      >
                        <Grid item xs={12} lg={4}>
                          <h4>
                            <strong>Kode kelas</strong>
                          </h4>
                        </Grid>
                        <Grid item xs={12} lg={8}>
                          <h4>{this.state.classInfo.code}</h4>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="flex-start"
                      >
                        <Grid item xs={12} lg={4}>
                          <h4>
                            <strong>Catatan kelas</strong>
                          </h4>
                        </Grid>
                        <Grid item xs={12} lg={8}>
                          <h4>{this.state.classInfo.note}</h4>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="flex-end"
                      >
                        <Grid item xs={12} lg={4}>
                          <Button variant="contained" color="secondary">
                            Hapus Kelas
                          </Button>
                        </Grid>
                        <Grid item xs={12} lg={8}>
                          <Grid
                            container
                            direction="row"
                            justify="flex-end"
                            alignItems="flex-end"
                          >
                            <Button variant="contained" color="primary">
                              Salin kelas
                            </Button>
                            <Button variant="contained" color="primary">
                              Edit
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </section>
    );
  }
}
const mapStateToProps = (state) => ({
  accountState: state.class,
});

// export default ClassInfo;
export default connect(mapStateToProps, {
  postLogout,
})(ClassInfo);
