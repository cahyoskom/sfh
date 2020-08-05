import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Grid, CardContent } from "@material-ui/core";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Container from "@material-ui/core/Container";
import { API_BASE_URL_DEV, API_PATH } from "../../constants/api";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import { requestUserData } from "../../actions";

// const useStyles = makeStyles((theme) => ({
//   large: {
//     width: theme.spacing(7),
//     height: theme.spacing(7),
//   },
// }));

// export function ImageAvatar() {
//   const avatar = useStyles();

//   return (
//     <div>
//       <Avatar
//         alt="avatar-profile"
//         className={avatar.large}
//         src={`${process.env.PUBLIC_URL}/assets/images/avatar.png`}
//       ></Avatar>
//     </div>
//   );
// }

class Profile extends Component {
  componentDidMount() {
    this.props.requestUserData(this.props.match.params.id);
    console.log(this.props.match.params.id);
    console.log(requestUserData(this.props.match.params.id));
  }

  render() {
    const { user } = this.props;
    console.log(user);
    return (
      <div>
        {/* <h1>{user.data.name}</h1>
        <h1>{user.data.email}</h1>
        <h1>{user.data.password}</h1>
        <h1>{user.data.phone}</h1> */}

        <section className="profile">
          <center>
            <h3>Edit Profil</h3>
          </center>
          <Container>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Card
                className="profile-box"
                variant="outlined"
                style={{ width: "50rem" }}
              >
                <CardContent>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={3}>
                      {/* ImageAvatar(); */}
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={3}>
                      Foto Profil
                    </Grid>
                    <Grid item xs={3}>
                      <Button
                        variant="contained"
                        color="primary"
                        className="Button-upload"
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={3}>
                      Nama Lengkap
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        id="outlined-margin-normal"
                        defaultValue={user.data.name}
                        className="name"
                        margin="normal"
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={3}>
                      Email
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        id="outlined-margin-normal"
                        placeholder={user.data.email}
                        className="email"
                        margin="normal"
                        variant="outlined"
                        disabled
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={3}>
                      Kata Sandi
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        id="outlined-margin-normal"
                        placeholder="Masukkan Kata Sandi"
                        className="retype-pass"
                        margin="normal"
                        variant="outlined"
                        type="password"
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={3}>
                      Ulangi Kata Sandi
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        id="outlined-margin-normal"
                        placeholder="Masukkan Kata Sandi"
                        className="retype-pass"
                        margin="normal"
                        variant="outlined"
                        type="password"
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={3}>
                      Nomor Telepon
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        id="outlined-margin-normal"
                        defaultValue={user.data.phone}
                        className="no-telp"
                        margin="normal"
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="center"
                  >
                    <Grid item xs={3}>
                      <Button variant="contained" color="primary">
                        Simpan
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Container>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.profile,
});

export default connect(mapStateToProps, {
  requestUserData,
})(Profile);
