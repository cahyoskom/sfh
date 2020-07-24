import React, {Component} from 'react';
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Grid, Checkbox, Button, IconButton,
Dialog, DialogActions, DialogContent, DialogContentText,Collapse } from '@material-ui/core';
import {default as MaterialLink} from '@material-ui/core/Link';
import Alert from '@material-ui/lab/Alert';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import CloseIcon from '@material-ui/icons/Close';
import { Input, Modal, ModalHeader, 
    ModalBody, ModalFooter, } from 'reactstrap';
import {
    onChangeStateRegister, 
    googleLogin,
    closeRegistAlert,
    saveRegister,
    setModalActivation,
    resendEmail
} from "../../actions"
import { GoogleLogin } from 'react-google-login';
import {Credential} from '../../constants/google-key';

class Register extends Component {

    constructor (props) {
        super (props)

        this.state = {
            openDialog: false
        }
    }
    handleClose = () =>{
        this.setState({openDialog : false})
    }

    componentDidMount(){
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.props.accountState.register.password) {
                return false;
            }
            return true;
        });
    }

    handleSubmit=()=>{
        this.setState({openDialog: true})
    }
    postRegister=()=>{
        this.setState({openDialog : false})
        if(this.props.accountState.register.isChecked){
            this.props.saveRegister()
        }
    }

    googleResponse = (response) =>{
        this.props.googleLogin(response)
    }

    render(){
        const { accountState, onChangeStateRegister, closeRegistAlert, setModalActivation, resendEmail } = this.props;

        return (
            <div>
                {/*Regsiter section*/}
                <section className="register-page section-b-space">
                    {!accountState.register.success && <div className="container">
                        <Grid container justify="center" alignItems="center">
                            <Grid item xs={12} lg={4}>
                                <div><h4><strong>Daftar Akun SinauNgomah</strong></h4></div>
                                <Card variant="outlined">
                                <Grid container direction="col" justify="space-around">
                                    <Grid item>
                                        <Collapse in={accountState.register.showErrorRegister}>
                                            <Alert severity="error" action={
                                            <IconButton
                                                aria-label="close"
                                                color="inherit"
                                                size="small"
                                                onClick={closeRegistAlert}><CloseIcon fontSize="inherit" />
                                                </IconButton>}>{accountState.register.errorMessage}
                                            </Alert>
                                        </Collapse>
                                    </Grid>
                                    <Grid item>
                                    {accountState.resendActivationRegist && <MaterialLink
                                        component="button"
                                        variant="body2"
                                        onClick={() => setModalActivation("show", true)}>
                                        Kirim ulang verifikasi email
                                        </MaterialLink>}
                                    </Grid>
                                </Grid>
                                <ValidatorForm onSubmit={this.handleSubmit}>
                                    <CardContent>
                                            <div className="form-group">
                                                <TextValidator
                                                    id="fullname"
                                                    label="Nama lengkap"
                                                    type="text"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    margin="dense"
                                                    fullWidth
                                                    required
                                                    variant="outlined"
                                                    onChange={e =>
                                                        onChangeStateRegister(e.target.id, e.target.value)
                                                        }
                                                    value ={accountState.register.fullname}
                                                    autoComplete={"name"}
                                                    validators={['required']}
                                                    errorMessages={['masukkan nama']}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <TextValidator
                                                    id="email"
                                                    label="Email"
                                                    type="email"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    margin="dense"
                                                    fullWidth
                                                    required
                                                    variant="outlined"
                                                    onChange={e =>
                                                        onChangeStateRegister(e.target.id, e.target.value)
                                                        }
                                                    value ={accountState.register.email}
                                                    autoComplete={"email"}
                                                    validators={['required', 'isEmail']}
                                                    errorMessages={['masukkan email', 'email tidak valid']}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <TextValidator
                                                    id="password"
                                                    type="password"
                                                    label="Kata sandi"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    margin="dense"
                                                    fullWidth
                                                    required
                                                    variant="outlined"
                                                    onChange={e =>
                                                    onChangeStateRegister(e.target.id, e.target.value)
                                                    }
                                                    value = {accountState.register.password}
                                                    validators={['required', 'minStringLength:6']}
                                                    errorMessages={['masukkan kata sandi', 'kata sandi minimal 6 karakter']}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <TextValidator
                                                    id="rePassword"
                                                    type="password"
                                                    label="Ulangi kata sandi"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    margin="dense"
                                                    fullWidth
                                                    required
                                                    variant="outlined"
                                                    onChange={e =>
                                                    onChangeStateRegister(e.target.id, e.target.value)
                                                    }
                                                    value = {accountState.register.rePassword}
                                                    validators={['isPasswordMatch', 'required']}
                                                    errorMessages={['kata sandi tidak sama', 'masukkan kata sandi']}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <TextValidator
                                                    id="noHP"
                                                    type="text"
                                                    label="Nomor telepon"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    margin="dense"
                                                    fullWidth
                                                    variant="outlined"
                                                    onChange={e =>
                                                    onChangeStateRegister(e.target.id, e.target.value)
                                                    }
                                                    value = {accountState.register.repassword}
                                                />
                                            </div>
                                            <Grid container direction="row" alignItems="center" justify="space-around">
                                                <Grid item xs={2} lg={2}>
                                                    <Checkbox
                                                        id= "isChecked"
                                                        name="checked"
                                                        color="primary"
                                                        checked={accountState.register.isChecked}
                                                        onChange={e =>
                                                            onChangeStateRegister(e.target.id, e.target.checked)
                                                        }
                                                    />
                                                </Grid>
                                                <Grid item xs={10} lg={10}>
                                                    <p>Saya telah memahami dan menyetujui Ketentuan & Kebijakan SinauNgomah</p>
                                                </Grid>
                                            </Grid>
                                    </CardContent>
                                    <CardActions>
                                        <Grid container direction="column" alignItems="center" justify="space-around" spacing={2}>
                                            <Grid item>
                                                <Button variant="contained" disableElevation color="primary" type="submit" disabled={!accountState.register.isChecked}>Buat Akun</Button>
                                            </Grid>
                                            <Grid item>atau masuk dengan</Grid>
                                            <Grid item>
                                                <div className="text-center">
                                                    <GoogleLogin
                                                    clientId={Credential}
                                                    buttonText='Google'
                                                    onSuccess={this.googleResponse}
                                                    onFailure={this.googleResponse}
                                                    cookiePolicy='single_host_origin'
                                                    responseType='code,token'/>
                                                </div>
                                            </Grid>
                                            <Grid item>
                                                Sudah punya akun? <Link to={`${process.env.PUBLIC_URL}/login`}>Silakan masuk</Link>
                                            </Grid>
                                        </Grid>
                                    </CardActions>
                                    </ValidatorForm>
                                </Card>
                            </Grid>
                        </Grid>
                    </div>}
                    {accountState.register.success && <div className="container">
                        <Grid container direction="column" alignItems="center" justify="space-between" spacing={1}>
                            <Grid item xs={12} lg={5}>
                                <img src={`${process.env.PUBLIC_URL}/assets/images/success-img.png`} alt="login-page-img"></img>
                            </Grid>
                            <Grid item alignItems="center">
                                <strong>Pengguna berhasil didaftarkan!</strong>
                            </Grid>
                            <Grid item>
                                Silakan cek email Anda untuk verifikasi email
                            </Grid>
                            <Grid item>
                                <Link to={`${process.env.PUBLIC_URL}/login`}><Button variant="contained" disableElevation color="primary">Masuk</Button></Link>
                            </Grid>
                        </Grid>
                    </div>}
                </section>
                 
                <Dialog
                    open={this.state.openDialog}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Apakah kamu sudah yakin dengan data yang kamu isi dan ingin melanjutkan?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Grid container direction="row" alignItems="center" justify="space-around">
                            <Grid item>
                            <Button onClick={this.handleClose} variant="contained" disableElevation color="default">
                                Kembali
                            </Button>
                            </Grid>
                            <Grid item>
                            <Button onClick={this.postRegister} variant="contained" disableElevation color="primary" autoFocus>
                                Ya, sudah yakin
                            </Button>
                            </Grid>
                        </Grid>
                    </DialogActions>
                </Dialog>

                {/* modal resend email activation */}
                <Modal isOpen={accountState.modalActivation.show}>
                    <ModalHeader toggle={() => setModalActivation("show", false)}><strong>Kirim ulang verifikasi email</strong></ModalHeader>
                        {!accountState.modalActivation.success && <ModalBody>
                            <label>Silahkan masukkan alamat email yang digunakan untuk registrasi akun anda. Kami akan mengirimkan email yang berisi link untuk melakukan verifikasi.</label>
                            <label>Email: </label>
                            <Input 
                                type="email" 
                                id="email"
                                placeholder="Contoh: janedoe@mail.com" 
                                value={accountState.modalActivation.email}
                                onChange={e =>
                                setModalActivation(e.target.id, e.target.value)
                                }
                            />
                            <Collapse in={accountState.modalActivation.openAlert}>
                                <Alert severity="error" action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => setModalActivation("openAlert", false)}><CloseIcon fontSize="inherit" />
                                    </IconButton>}>{accountState.modalActivation.errormsg}
                                </Alert>
                            </Collapse>
                        </ModalBody>}
                        {accountState.modalActivation.success &&
                        <ModalBody>
                            <Alert severity="success">
                                <p><strong>Email berhasil dikirim!</strong></p>
                                <p>{accountState.modalActivation.successmsg}</p>
                            </Alert>
                        </ModalBody>}
                        {!accountState.modalActivation.success && <ModalFooter>
                        <Button color="primary" variant="contained" disableElevation onClick={resendEmail}>Kirim email</Button>
                        </ModalFooter>}
                    </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    accountState: state.account
  });
export default connect(
    mapStateToProps, {onChangeStateRegister, googleLogin, closeRegistAlert, saveRegister, setModalActivation, resendEmail}
)(Register);