import React, {Component} from 'react';
import { Grid } from '@material-ui/core';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { API_BASE_URL_DEV, API_PATH} from "../../constants/api";
import axios from 'axios';

class Confirmation extends Component {
    constructor(props){
        super(props);
        this.state = {
            check: false,
        }
    }

    componentDidMount() {
        var search = window.location.search.substring(1);
        var code = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
        
        console.log(code);
        console.log(API_BASE_URL_DEV + API_PATH.activating+"/"+code.code);

        axios.get(API_BASE_URL_DEV  + API_PATH.activating+"/"+code.code)
          .then(res => {
            console.log("test");
            if(res.status == 200){
                this.setState({ check: true });
            }else{
                this.setState({ check: false });
            }
            // const posts = res.data.data.children.map(obj => obj.data);
            // this.setState({ posts });
          });
      }
   
    render(){
        var search = window.location.search.substring(1);
        var queryStringObj = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')

        if(queryStringObj.q == "activating"){
            if(this.state.check == true){
                return(
                    <div>
                        <section className="confirmation-page">
                            <Container>
                                <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
                                    <Grid item xs={12}>
                                        <img src={`${process.env.PUBLIC_URL}/assets/images/confirmation-img.png`} alt="confirmation-img"></img>
                                    </Grid>
                                    <Grid item xs={12} justify="center">
                                        <div alignItems="center">
                                            <h3>Email Berhasil Diverifikasi</h3>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} justify="center">
                                         <div alignItems="center">
                                            <h7>Sudah Bisa Menggunakan Akun, Selamat Belajar</h7>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} container direction="column" alignItems="center" justify="center">
                                        <Button variant="contained" color="primary">Masuk</Button>
                                    </Grid>
                                </Grid>
                            </Container>
                        </section>
                    </div>
                )
            }else{
                return(
                    <div>
                        <section className="confirmation-page">
                            <Container>
                                <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
                                    <Grid item xs={12}>
                                        <img src={`${process.env.PUBLIC_URL}/assets/images/confirmation-img.png`} alt="confirmation-img"></img>
                                    </Grid>
                                    <Grid item xs={12} justify="center">
                                        <div alignItems="center">
                                            <h3>Email Sudah diverifikasi</h3>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} justify="center">
                                         <div alignItems="center">
                                            <h7>Silakan Login</h7>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} container direction="column" alignItems="center" justify="center">
                                        <Link to={`${process.env.PUBLIC_URL}/login`}>
                                        <Button variant="contained" color="primary">Masuk </Button>
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Container>
                        </section>
                    </div>
                )
            }
            
        }else if(queryStringObj.q == "update_password"){
            return(
                <Link to={`${process.env.PUBLIC_URL}/update_password/:code`}></Link>
            )
        }
        
        return "invalid query";
    }
}

export default Confirmation;