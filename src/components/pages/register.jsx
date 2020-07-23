import React, {Component} from 'react';
import { connect } from "react-redux";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Grid, Checkbox, Button } from '@material-ui/core';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {onChangeStateRegister, googleLogin} from "../../actions"
import { GoogleLogin } from 'react-google-login';
import {Credential} from '../../constants/google-key';

class Register extends Component {

    // constructor (props) {
    //     super (props)

    // }
    componentDidMount (){
        ValidatorForm.addValidationRule('isChecked', value => value)
    }

    googleResponse = (response) =>{
        console.log(response)
        this.props.googleLogin(response)
    }

    render (){
        const {accountState} = this.props

        return (
            <div>
                        
                {/*Regsiter section*/}
                <section className="register-page section-b-space">
                    <div className="container">
                        <Grid container justify="center" alignItems="center">
                            <Grid item xs={12} lg={4}>
                                <h4>Daftar Akun SinauNgomah</h4>
                                <Card variant="outlined">
                                    <CardContent>
                                        <ValidatorForm onSubmit="GANTI">
                                            <div className="form-group">
                                                <TextValidator
                                                    id="fullName"
                                                    label="Nama lengkap"
                                                    type="text"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    margin="dense"
                                                    fullWidth
                                                    variant="outlined"
                                                    onChange={e =>
                                                        onChangeStateRegister(e.target.id, e.target.value)
                                                        }
                                                    value ={accountState.register.fullName}
                                                    autoComplete={"name"}
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
                                                    validators={['required']}
                                                    errorMessages={['masukkan kata sandi']}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <TextValidator
                                                    id="repassword"
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
                                                    value = {accountState.register.repassword}
                                                    validators={['required']}
                                                    errorMessages={['masukkan kata sandi']}
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
                                                        validators={['isChecked']}
                                                        errorMessages={['this field is required']}
                                                        checked={accountState.register.isChecked}
                                                        value={accountState.register.isChecked}
                                                    />
                                                </Grid>
                                                <Grid item xs={10} lg={10}>
                                                    <p>Saya telah memahami dan menyetujui Ketentuan & Kebijakan SinauNgomah</p>
                                                </Grid>
                                            </Grid>
                                        </ValidatorForm>
                                    </CardContent>
                                    <CardActions>
                                        <Grid container direction="column" alignItems="center" justify="space-around" spacing={2}>
                                            <Grid item>
                                                <Button variant="contained" disableElevation color="primary" type="submit">Buat Akun</Button>
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
                                        </Grid>

                                    </CardActions>
                                </Card>
                            </Grid>
                        </Grid>
                    </div>
                </section>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    accountState: state.account
  });
export default connect(
    mapStateToProps, {onChangeStateRegister, googleLogin}
)(Register);