import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Paper,
  Button,
  Container,
  Box,
  Collapse,
  TextField,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import { Image } from "react-bootstrap";
import { Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  getSchool,
  setModalSchool,
  onUpdateSchool,
  saveUpdateSchool,
  deleteSchool,
} from "../../actions";

const pattern = /^[0-9]*$/;

class SchoolInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPhoneValid: true,
      phoneErrorText: "",
      isZipcodeValid: true,
      zipcodeErrorText: "",

      openDialog: false,
    };
  }

  componentDidMount = () => {
    this.props.getSchool(this.props.match.params.id);
  };

  getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      cb(reader.result);
    };
    reader.onerror = function(error) {
      console.log("Error: ", error);
    };
  };

  uploadImage = (e) => {
    const file = e.target.files[0];
    this.getBase64(file, (result) => {
      this.props.setModalSchool("avatar", result);
    });
  };

  validatePhone = () => {
    var isValid = this.props.schoolState.modal.phone
      ? pattern.test(this.props.schoolState.modal.phone)
      : true;

    if (isValid) {
      this.setState({
        isPhoneValid: true,
        phoneErrorText: "",
      });
    } else {
      this.setState({
        isPhoneValid: false,
        phoneErrorText: "nomor telepon tidak valid",
      });
    }
  };

  validateZipcode = () => {
    var isValid = this.props.schoolState.modal.zipcode
      ? pattern.test(this.props.schoolState.modal.zipcode)
      : true;

    if (isValid) {
      this.setState({
        isZipcodeValid: true,
        zipcodeErrorText: "",
      });
    } else {
      this.setState({
        isZipcodeValid: false,
        zipcodeErrorText: "kode pos tidak valid",
      });
    }
  };

  handleDelete = () => {
    this.setState({ openDialog: true });
  };

  handleClose = () => {
    this.setState({ openDialog: false });
  };

  render() {
    const {
      schoolState,
      onUpdateSchool,
      setModalSchool,
      saveUpdateSchool,
      deleteSchool,
    } = this.props;
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
                          src={schoolState.data.avatar}
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
                          {schoolState.data.address}, {schoolState.data.zipcode}
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
                      {/* ONLY SHOW FOR OWNER MAINTAINER*/}
                      {schoolState.userHasAuthority &&
                        <Grid item container direction="row">
                          <Grid item xs={5} lg={5}>
                            <strong>Kode sekolah</strong>
                          </Grid>
                          <Grid item xs={7} lg={7}>
                            <strong>{schoolState.data.code}</strong>
                          </Grid>
                        </Grid>
                      }
                      {/* <Grid item container direction="row">
                      <Grid item xs={5} lg={5}>
                        <strong>Catatan Sekolah</strong>
                      </Grid>
                      <Grid item xs={7} lg={7}>
                        {schoolState.school.catatan ||
                          "Belum mengisi catatan sekolah"}
                      </Grid>
                    </Grid> */}
                      {/* ONLY SHOW FOR OWNER MAINTAINER*/}
                      {schoolState.userHasAuthority &&
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
                              onClick={this.handleDelete}
                            >
                              Hapus Sekolah
                          </Button>
                          </Grid>
                          <Grid item container xs={6} lg={6} justify="flex-end">
                            <Button
                              color="primary"
                              variant="contained"
                              disableElevation
                              onClick={onUpdateSchool}
                            >
                              Ubah
                          </Button>
                          </Grid>
                        </Grid>
                      }
                    </Grid>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Container>

          {/*Modal edit school */}
          <Modal isOpen={schoolState.modal.show}>
            <ModalHeader toggle={() => setModalSchool("show", false)}>
              <strong>Ubah Sekolah</strong>
            </ModalHeader>
            <ValidatorForm onSubmit={saveUpdateSchool}>
              <ModalBody>
                <div className="form-group">
                  <span>Nama sekolah*</span>

                  <TextValidator
                    id="name"
                    type="text"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    placeholder="Contoh: SD Negeri 1 Depok"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    onChange={(e) =>
                      setModalSchool(e.target.id, e.target.value)
                    }
                    value={schoolState.modal.name}
                    validators={["required"]}
                    errorMessages={["masukkan nama sekolah"]}
                  />
                </div>
                <div className="form-group">
                  <span>Alamat sekolah</span>
                  <TextField
                    id="address"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    margin="dense"
                    placeholder="Contoh alamat: Jl KH Wahid Hasyim 80, Kebon Sirih"
                    multiline
                    fullWidth
                    rows={4}
                    variant="outlined"
                    onChange={(e) =>
                      setModalSchool(e.target.id, e.target.value)
                    }
                    value={schoolState.modal.address}
                  />
                </div>
                <div className="form-group">
                  <span>Kode pos</span>
                  <TextField
                    id="zipcode"
                    type="text"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    placeholder="Contoh: 13720"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    onKeyUp={this.validateZipcode}
                    error={!this.state.isZipcodeValid}
                    helperText={this.state.zipcodeErrorText}
                    onChange={(e) =>
                      setModalSchool(e.target.id, e.target.value)
                    }
                    value={schoolState.modal.zipcode}
                  />
                </div>
                <div className="form-group">
                  <span>Nomor telepon</span>
                  <TextField
                    id="phone"
                    type="text"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    margin="dense"
                    placeholder="Contoh: 0212894203"
                    fullWidth
                    variant="outlined"
                    onKeyUp={this.validatePhone}
                    error={!this.state.isPhoneValid}
                    helperText={this.state.phoneErrorText}
                    onChange={(e) =>
                      setModalSchool(e.target.id, e.target.value)
                    }
                    value={schoolState.modal.phone}
                  />
                </div>
                <div className="form-group">
                  <label>Logo sekolah</label>
                  <div>
                    {/* <Button
                    variant="contained"
                    disableElevation
                    component="label"
                    style={{ background: "#4AA0B5", color: "white" }}
                  >
                  Pilih Gambar */}
                    <input
                      type="file"
                      accept="image/*"
                      label="Pilih gambar"
                      onChange={this.uploadImage}
                    />
                    {/* </Button> */}
                  </div>
                </div>

                <Collapse in={schoolState.modal.failed}>
                  <Alert
                    severity="error"
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => setModalSchool("failed", false)}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                  >
                    {schoolState.modal.errormsg}
                  </Alert>
                </Collapse>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="default"
                  variant="contained"
                  disableElevation
                  onClick={() => setModalSchool("show", false)}
                >
                  Batal
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  disableElevation
                  type="submit"
                >
                  Simpan
                </Button>
              </ModalFooter>
            </ValidatorForm>
          </Modal>

          {/* Remove school confirmation dialog*/}
          <Dialog
            open={this.state.openDialog}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Apakah kamu yakin ingin menghapus sekolah?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="space-around"
              >
                <Grid item>
                  <Button
                    onClick={this.handleClose}
                    variant="contained"
                    disableElevation
                    color="default"
                  >
                    Batal
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    onClick={deleteSchool}
                    variant="contained"
                    disableElevation
                    color="primary"
                    autoFocus
                  >
                    Hapus
                  </Button>
                </Grid>
              </Grid>
            </DialogActions>
          </Dialog>
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
  setModalSchool,
  onUpdateSchool,
  saveUpdateSchool,
  deleteSchool,
})(SchoolInfo);
