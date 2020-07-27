import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import { connect } from "react-redux";
import ClassIcon from "@material-ui/icons/Class";
import AddIcon from "@material-ui/icons/Add";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
import {
  onChangeStateNewClass,
  setNewClassSuccess,
  onChangeStateNewSchool,
  setNewSchoolSuccess
} from "../../actions"
//testing

class Home extends Component {
  state = {
    newClassModal: false,
    newSchoolModal: false,
  }
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

      listSchool: [
        {
          name: "SDN 1 Jakarta",
          deskripsi: "Jl. Kebayoran lama no.34",
        },
        {
          name: "SDN 2 Jakarta",
          deskripsi: "Jl. Mangga no.2",
        },
      ],
    };
  }

  openModalNewSchool = () => {
    this.setState({
      newSchoolModal: true,
    });
  };
  closeModalNewSchool = () => {
    this.setState({
      newSchoolModal: false,
    });
  };
  openModalNewClass = () => {
    this.setState({
      newClassModal: true,
    });
  };
  closeModalNewClass = () => {
    this.setState({
      newClassModal: false,
    });
  };
  openAlert = () => {
    const {onChangeStateNewClass, onChangeStateNewSchool} = this.props
    onChangeStateNewClass("errormsg", "Kelas gagal dibuat")
    onChangeStateNewClass("openAlert", "true")
    onChangeStateNewSchool("errormsg", "Sekolah gagal dibuat")
    onChangeStateNewSchool("openAlert", "true")
  }

  render() {
    const {
      onChangeStateNewClass, 
      accountState,
      setNewClassSuccess,
      onChangeStateNewSchool, 
      setNewSchoolSuccess,
      
    } = this.props
    return (
      <section className="home-page section-b-space">
        <Container>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item xs={12} lg={12}>
              <Card variant="outlined">
                <CardContent>
                  <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                  >
                    <Grid item xs={12} lg={5}>
                      <Grid
                        container
                        direction="column"
                        justify="flex-start"
                        alignItems="stretch"
                        spacing={2}
                      >
                        <Grid item>
                          <h3>Kelas</h3>
                        </Grid>
                        <Grid item>
                          <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="stretch"
                            spacing={2}
                          >
                            <Grid item>
                              <Button
                                variant="contained"
                                color="primary"
                                startIcon={<ClassIcon />}
                              >
                                Gabung Kelas
                              </Button>
                            </Grid>
                            <Grid item>
                              <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AddIcon />}
                                onClick = {this.openModalNewClass}
                              >
                                Buat Kelas
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>

                        {this.state.listClass.map((kelas, index) => (
                          <Grid item xs={12} lg={12}>
                            <Card variant="outlined">
                              <CardContent>
                                <Grid
                                  container
                                  direction="row"
                                  justify="center"
                                  alignItems="center"
                                >
                                  <Grid item xs={12} lg={9}>
                                    <Grid
                                      container
                                      direction="column"
                                      justify="center"
                                      alignItems="flex-start"
                                    >
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
                        direction="column"
                        justify="flex-start"
                        alignItems="stretch"
                        spacing={2}
                      >
                        <Grid item>
                          <h3>Sekolah</h3>
                        </Grid>
                        <Grid item>
                          <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="stretch"
                            spacing={2}
                          >
                            <Grid item>
                              <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AddIcon />}
                                onClick = {this.openModalNewSchool}
                              >
                                Buat Sekolah
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>

                        {this.state.listSchool.map((sekolah, index) => (
                          <Grid item xs={12} lg={12}>
                            <Card variant="outlined">
                              <CardContent>
                                <Grid
                                  container
                                  direction="row"
                                  justify="center"
                                  alignItems="center"
                                >
                                  <Grid item xs={12} lg={9}>
                                    <Grid
                                      container
                                      direction="column"
                                      justify="center"
                                      alignItems="flex-start"
                                    >
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
        {/* Modal New Class <<<<<<<<<<<<<<<<<<<<<<<<<*/}
        <Modal isOpen={this.state.newClassModal}>
              <ModalHeader toggle={this.closeModalNewClass}>
                <strong>Buat Kelas</strong>
              </ModalHeader>
              {!accountState.newClass.success && (
                <ModalBody>
                  <label>Nama Kelas: </label>
                  <Input
                    type="text"
                    id="name"
                    placeholder="Contoh: Kelas 1B"
                    value={accountState.newClass.name}
                    onChange={(e) =>
                      onChangeStateNewClass(e.target.id, e.target.value)
                    }
                  />
                  <label>Deskripsi: </label>
                  <Input
                    type="text"
                    id="description"
                    placeholder="Masukkan deskripsi kelas"
                    value={accountState.newClass.description}
                    onChange={(e) =>
                      onChangeStateNewClass(e.target.id, e.target.value)
                    }
                  />
                  <label>Sekolah: </label>
                  <Input
                    type="text"
                    id="school"
                    placeholder="Masukkan link atau kode sekolah"
                    value={accountState.newClass.school}
                    onChange={(e) =>
                      onChangeStateNewClass(e.target.id, e.target.value)
                    }
                  />
                  <Collapse in={accountState.newClass.openAlert}>
                    <Alert
                      severity="error"
                      action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => onChangeStateNewClass("openAlert", false)}
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                      }
                    >
                      {accountState.newClass.errormsg}
                    </Alert>
                  </Collapse>
                </ModalBody>
              )}
              {accountState.newClass.success && (
                <ModalBody>
                  <Alert severity="success">
                    <p>
                      <strong>Kelas berhasil dibuat!</strong>
                    </p>
                    <p>{accountState.newClass.successmsg}</p>
                  </Alert>
                </ModalBody>
              )}
              {!accountState.newClass.success && (
                <ModalFooter>
                  <Button
                    color="primary"
                    variant="contained"
                    disableElevation
                    onClick = {setNewClassSuccess}
                  >
                    Buat Kelas
                  </Button>
                  <Button
                    color="secondary"
                    variant="contained"
                    disableElevation
                    onClick = {this.closeModalNewClass}
                  >
                    Batal
                  </Button>
                  <Button
                    color="danger"
                    variant="contained"
                    disableElevation
                    onClick = {this.openAlert}
                  >
                    Gagal
                  </Button>
                </ModalFooter>
              )}
            </Modal>
{/* Modal New School <<<<<<<<<<<<<<<<<<<<<<<<<*/}
            <Modal isOpen={this.state.newSchoolModal}>
              <ModalHeader toggle={this.closeModalNewSchool}>
                <strong>Buat Sekolah</strong>
              </ModalHeader>
              {!accountState.newSchool.success && (
                <ModalBody>
                  <label>Nama Sekolah: </label>
                  <Input
                    type="text"
                    id="name"
                    placeholder="Contoh: SMAN 99 Jakarta"
                    value={accountState.newSchool.name}
                    onChange={(e) =>
                      onChangeStateNewSchool(e.target.id, e.target.value)
                    }
                  />
                  <label>Alamat Sekolah: </label>
                  <Input
                    type="textarea"
                    id="address"
                    placeholder="Masukkan alamat sekolah"
                    value={accountState.newSchool.address}
                    onChange={(e) =>
                      onChangeStateNewSchool(e.target.id, e.target.value)
                    }
                  />
                  <label>Kode Pos: </label>
                  <Input
                    type="text"
                    id="postalCode"
                    placeholder="Masukkan kode pos sekolah"
                    value={accountState.newSchool.postalCode}
                    onChange={(e) =>
                      onChangeStateNewSchool(e.target.id, e.target.value)
                    }
                  />
                  <label>Nomor telepon sekolah: </label>
                  <Input
                    type="text"
                    id="phoneNumber"
                    placeholder="Masukkan nomor telepon sekolah"
                    value={accountState.newSchool.phoneNumber}
                    onChange={(e) =>
                      onChangeStateNewSchool(e.target.id, e.target.value)
                    }
                  />
                  <label>Logo Sekolah: </label>
                  <Input
                    type="file"
                    accept="image/*"
                    id="picture"
                    placeholder="Masukkan foto logo sekolah"
                    value={accountState.newSchool.picture}
                    onChange={(e) =>
                      onChangeStateNewSchool(e.target.id, e.target.value)
                    }
                  />
                  <Collapse in={accountState.newSchool.openAlert}>
                    <Alert
                      severity="error"
                      action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => onChangeStateNewSchool("openAlert", false)}
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                      }
                    >
                      {accountState.newSchool.errormsg}
                    </Alert>
                  </Collapse>
                </ModalBody>
              )}
              {accountState.newSchool.success && (
                <ModalBody>
                  <Alert severity="success">
                    <p>
                      <strong>Sekolah berhasil dibuat!</strong>
                    </p>
                    <p>{accountState.newSchool.successmsg}</p>
                  </Alert>
                </ModalBody>
              )}
              {!accountState.newSchool.success && (
                <ModalFooter>
                  <Button
                    color="primary"
                    variant="contained"
                    disableElevation
                    onClick = {setNewSchoolSuccess}
                  >
                    Buat Sekolah
                  </Button>
                  <Button
                    color="secondary"
                    variant="contained"
                    disableElevation
                    onClick = {this.closeModalNewSchool}
                  >
                    Batal
                  </Button>
                  <Button
                    color="danger"
                    variant="contained"
                    disableElevation
                    onClick = {this.openAlert}
                  >
                    Gagal
                  </Button>
                </ModalFooter>
              )}
            </Modal>
      </section>
    );
  }
}

// export default SignIn
const mapStateToProps = (state) => ({
  accountState: state.account,
});

export default connect(mapStateToProps,
  {
    onChangeStateNewClass,setNewClassSuccess,
    onChangeStateNewSchool,setNewSchoolSuccess,
  })(Home);
