import React, {Component} from 'react';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

class Confirmation extends Component {
    render(){

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
    }
}

export default Confirmation;