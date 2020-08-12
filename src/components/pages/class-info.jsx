import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
//
import Container from '@material-ui/core/Container';
import { Grid, Box } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { spacing } from '@material-ui/system';
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import ClassIcon from '@material-ui/icons/Class';
import AddIcon from '@material-ui/icons/Add';
import { Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

import {
  getDataClassInfo,
  postLogout,
  onChangeStateClassInfo,
  onChangeStateEditClass,
  postDeleteClass,
  postUpdateClass,
  postDuplicateClass
} from '../../actions';

class ClassInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardClass: {
        maxWidth: 200
      },
      assureDeleteModal: false,
      confirmUpdateClass: false
    };
  }
  componentDidMount() {
    const { getDataClassInfo, onChangeStateClassInfo } = this.props;
    onChangeStateClassInfo('id', this.props.match.params.id);
    getDataClassInfo();
  }

  openModalDeleteClass = () => {
    this.setState({
      assureDeleteModal: true
    });
  };
  closeModalDeleteClass = () => {
    this.setState({
      assureDeleteModal: false
    });
  };
  openModalConfirmUpdate = () => {
    this.setState({
      confirmUpdateClass: true
    });
  };
  closeModalConfirmUpdate = () => {
    this.setState({
      confirmUpdateClass: false
    });
  };
  closeEditClassAlert = () => {
    const { onChangeStateEditClass } = this.props;
    onChangeStateEditClass('openAlert', false);
  };
  closeSuccessEditModal = () => {
    const { onChangeStateEditClass } = this.props;
    onChangeStateEditClass('success', false);
  };
  closeFailEditModal = () => {
    const { onChangeStateEditClass } = this.props;
    onChangeStateEditClass('updateFail', false);
  };
  closeFailDeleteModal = () => {
    const { onChangeStateEditClass } = this.props;
    onChangeStateEditClass('deleteFail', false);
  };
  closeFailDeleteModal = () => {
    const { onChangeStateEditClass } = this.props;
    onChangeStateEditClass('duplicateFail', false);
  };
  toggleEditClassForm = () => {
    const { onChangeStateEditClass, classState } = this.props;
    const currState = classState.editClass.editForm;
    onChangeStateEditClass('editForm', !currState);
  };
  toggleConfirmUpdate = () => {
    const { onChangeStateEditClass, classState } = this.props;
    const currState = classState.editClass.confirmUpdate;
    onChangeStateEditClass('confirmUpdate', !currState);
  };
  toggleConfirmDelete = () => {
    const { onChangeStateEditClass, classState } = this.props;
    const currState = classState.editClass.confirmDelete;
    onChangeStateEditClass('confirmDelete', !currState);
  };
  toggleConfirmDuplicate = () => {
    const { onChangeStateEditClass, classState } = this.props;
    const currState = classState.editClass.confirmDuplicate;
    onChangeStateEditClass('confirmDuplicate', !currState);
  };
  toggleSuccessDuplicate = () => {
    const { onChangeStateEditClass, classState } = this.props;
    const currState = classState.editClass.duplicateSuccess;
    onChangeStateEditClass('duplicateSuccess', !currState);
  };

  render() {
    const { classState, postDeleteClass, onChangeStateEditClass, postUpdateClass, postDuplicateClass } = this.props;
    const theme = {
      spacing: 100
    };
    return (
      <section className='home-page section-b-space'>
        <div>
          {!classState.editClass.editForm && (
            <Container>
              <Grid container direction='column' justify='center' alignItems='center'>
                <Grid item xs={12} lg={12}>
                  <Box maxWidth={550}>
                    <Card variant='outlined'>
                      <CardContent>
                        <Grid container direction='row' justify='center' alignItems='stretch' spacing={2}>
                          <Grid item>
                            <h3>Kelas</h3>
                          </Grid>
                          <Grid container direction='row' justify='center' alignItems='flex-start' m={2}>
                            <Grid item xs={12} lg={4}>
                              <h4>
                                <strong>Nama kelas</strong>
                              </h4>
                            </Grid>
                            <Grid item xs={12} lg={8}>
                              {classState.classInfo.name}
                            </Grid>
                          </Grid>
                          <Grid container direction='row' justify='center' alignItems='flex-start' m={2}>
                            <Grid item xs={12} lg={4}>
                              <h4>
                                <strong>Deskripsi</strong>
                              </h4>
                            </Grid>
                            <Grid item xs={12} lg={8}>
                              {classState.classInfo.description}
                            </Grid>
                          </Grid>
                          <Grid container direction='row' justify='center' alignItems='flex-start'>
                            <Grid item xs={12} lg={4}>
                              <h4>
                                <strong>Sekolah</strong>
                              </h4>
                            </Grid>
                            <Grid item xs={12} lg={8}>
                              {classState.classInfo.school == '' && <p>Belum disambungkan</p>}
                              {!classState.classInfo.school == '' && classState.classInfo.school}
                            </Grid>
                          </Grid>
                          <Grid container direction='row' justify='center' alignItems='flex-start'>
                            <Grid item xs={12} lg={4}>
                              <h4>
                                <strong>Kode kelas</strong>
                              </h4>
                            </Grid>
                            <Grid item xs={12} lg={8}>
                              {classState.classInfo.code}
                            </Grid>
                          </Grid>
                          <Grid container direction='row' justify='center' alignItems='flex-start'>
                            <Grid item xs={12} lg={4}>
                              <h4>
                                <strong>Catatan kelas</strong>
                              </h4>
                            </Grid>
                            <Grid item xs={12} lg={8}>
                              {classState.classInfo.note == '' && <p>Belum mengisi catatan kelas</p>}
                              {!classState.classInfo.note == '' && classState.classInfo.note}
                            </Grid>
                          </Grid>
                          {classState.classInfo.hasAuthority && (
                            <Grid container direction='row' justify='space-between' alignItems='flex-end'>
                              <Grid item xs={12} lg={4}>
                                <Button variant='contained' color='secondary' onClick={this.toggleConfirmDelete}>
                                  Hapus Kelas
                                </Button>
                              </Grid>
                              <Grid item xs={12} lg={8}>
                                <Grid container direction='row' justify='flex-end' alignItems='flex-end'>
                                  <Button variant='contained' color='primary' onClick={this.toggleConfirmDuplicate}>
                                    Salin kelas
                                  </Button>
                                  <Button onClick={this.toggleEditClassForm} variant='contained' color='primary'>
                                    Edit
                                  </Button>
                                </Grid>
                              </Grid>
                            </Grid>
                          )}
                        </Grid>
                      </CardContent>
                    </Card>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          )}
          {classState.editClass.editForm && (
            <Container>
              <Grid container direction='column' justify='center' alignItems='center'>
                <Grid item xs={12} lg={12}>
                  <Box maxWidth={550}>
                    <Card variant='outlined'>
                      <CardContent>
                        <Grid container direction='row' justify='center' alignItems='stretch' spacing={2}>
                          <Grid container direction='column' justify='center' alignItems='center'>
                            <Grid item>
                              <h3>Edit Kelas</h3>
                            </Grid>
                            <Grid item>
                              <Collapse in={classState.editClass.openAlert}>
                                <Alert
                                  severity='error'
                                  action={
                                    <IconButton
                                      aria-label='close'
                                      color='inherit'
                                      size='small'
                                      onClick={this.closeEditClassAlert}
                                    >
                                      <CloseIcon fontSize='inherit' />
                                    </IconButton>
                                  }
                                >
                                  <strong>{classState.editClass.errormsg}</strong>
                                </Alert>
                              </Collapse>
                            </Grid>
                          </Grid>

                          <Grid container direction='row' justify='center' alignItems='center'>
                            <Grid item xs={12} lg={4}>
                              <h4>
                                <strong>Nama kelas</strong>
                              </h4>
                            </Grid>
                            <Grid item xs={12} lg={8}>
                              <Input
                                type='text'
                                id='name'
                                placeholder='Contoh: Kelas 1B'
                                value={classState.editClass.name}
                                onChange={e => onChangeStateEditClass(e.target.id, e.target.value)}
                              />
                            </Grid>
                          </Grid>
                          <Grid container direction='row' justify='center' alignItems='center'>
                            <Grid item xs={12} lg={4}>
                              <h4>
                                <strong>Deskripsi</strong>
                              </h4>
                            </Grid>
                            <Grid item xs={12} lg={8}>
                              <Input
                                type='text'
                                id='description'
                                placeholder='Masukkan deskripsi kelas: '
                                value={classState.editClass.description}
                                onChange={e => onChangeStateEditClass(e.target.id, e.target.value)}
                              />
                            </Grid>
                          </Grid>
                          <Grid container direction='row' justify='center' alignItems='center'>
                            <Grid item xs={12} lg={4}>
                              <h4>
                                <strong>Sekolah</strong>
                              </h4>
                            </Grid>
                            <Grid item xs={12} lg={8}>
                              <Input
                                type='text'
                                id='schoolCode'
                                placeholder='Masukkan kode atau link sekolah'
                                value={classState.editClass.schoolCode}
                                onChange={e => onChangeStateEditClass(e.target.id, e.target.value)}
                              />
                            </Grid>
                          </Grid>
                          <Grid container direction='row' justify='center' alignItems='center'>
                            <Grid item xs={12} lg={4}>
                              <h4>
                                <strong>Kode kelas</strong>
                              </h4>
                            </Grid>
                            <Grid item xs={12} lg={8}>
                              <h4>{classState.classInfo.code}</h4>
                            </Grid>
                          </Grid>
                          <Grid container direction='row' justify='center' alignItems='center'>
                            <Grid item xs={12} lg={4}>
                              <h4>
                                <strong>Catatan kelas</strong>
                              </h4>
                            </Grid>
                            <Grid item xs={12} lg={8}>
                              <Input
                                type='text'
                                id='note'
                                placeholder='Masukkan catatan kelas'
                                value={classState.editClass.note}
                                onChange={e => onChangeStateEditClass(e.target.id, e.target.value)}
                              />
                            </Grid>
                          </Grid>
                          <Grid container direction='row' justify='space-between' alignItems='flex-end'>
                            <Grid item xs={12} lg={4}>
                              <Button variant='contained' color='secondary' onClick={this.toggleConfirmDelete}>
                                Hapus Kelas
                              </Button>
                            </Grid>
                            <Grid item xs={12} lg={8}>
                              <Grid container direction='row' justify='flex-end' alignItems='flex-end'>
                                <Button onClick={this.toggleEditClassForm} variant='contained' color='primary'>
                                  Batal
                                </Button>
                                <Button variant='contained' color='primary' onClick={this.toggleConfirmUpdate}>
                                  Simpan
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
          )}
          {/* Confirm update class <<<<<<<<*/}
          <Modal isOpen={classState.editClass.confirmUpdate}>
            <ModalBody>
              <Grid container direction='column' justify='center' alignItems='center'>
                <strong>Apakah anda yakin mau mengubah kelas ini?</strong>
                Pastikan semua informasi yang anda masukkan sudah sesuai
              </Grid>
            </ModalBody>
            <ModalFooter>
              <Button color='primary' variant='contained' disableElevation type='submit' onClick={this.toggleConfirmUpdate}>
                Batal
              </Button>
              <Button color='primary' variant='contained' disableElevation type='submit' onClick={postUpdateClass}>
                Ya
              </Button>
            </ModalFooter>
          </Modal>
          {/* Update Success <<<<<<<<<<<<<<<<<<<<<<<<<< */}
          <Modal isOpen={classState.editClass.success}>
            <ModalBody>
              <Grid container direction='column' justify='center' alignItems='center'>
                <strong>Informasi kelas BERHASIL diubah!</strong>
                Anda telah membuat perubahan pada informasi kelas.
                <Button color='primary' variant='contained' disableElevation type='submit' onClick={this.closeSuccessEditModal}>
                  Oke
                </Button>
              </Grid>
            </ModalBody>
          </Modal>
          {/* Update Fail <<<<<<<<<<<<<<<<<<<<<<<<<< */}
          <Modal isOpen={classState.editClass.updateFail}>
            <ModalBody>
              <Grid container direction='column' justify='center' alignItems='center'>
                <strong>GAGAL mengubah kelas!</strong>
                Proses mengubah kelas GAGAL, silakan coba lagi!
                <Button color='secondary' variant='contained' disableElevation type='submit' onClick={this.closeFailEditModal}>
                  Oke
                </Button>
              </Grid>
            </ModalBody>
          </Modal>

          {/* Delete class confirmation <<<<<<<<*/}
          <Modal isOpen={classState.editClass.confirmDelete}>
            <ModalBody>
              <Grid container direction='column' justify='center' alignItems='center'>
                <strong>Apakah anda yakin mau menghapus kelas ini dan segala isinya?</strong>
                Anda akan kehilangan semua data yang berhubungan dengan kelas ini dan tidak dapat anda dapatkan kembali
              </Grid>
            </ModalBody>
            <ModalFooter>
              <Button color='primary' variant='contained' disableElevation type='submit' onClick={this.toggleConfirmDelete}>
                Batal
              </Button>
              <Button color='primary' variant='contained' disableElevation type='submit' onClick={postDeleteClass}>
                Ya
              </Button>
            </ModalFooter>
          </Modal>
          {/* Delete Success <<<<<<<<<<<<<<<<<<<<<<<<<< */}
          <Modal isOpen={classState.editClass.deleteSuccess}>
            <ModalBody>
              <Grid container direction='column' justify='center' alignItems='center'>
                <strong>Kelas berhasil dihapus!</strong>
                Anda telah berhasil menghapus kelas ini.
                <a href='/'>
                  <Button variant='contained' color='primary'>
                    Kembali ke beranda
                  </Button>
                </a>
              </Grid>
            </ModalBody>
          </Modal>
          {/* Delete Fail <<<<<<<<<<<<<<<<<<<<<<<<<< */}
          <Modal isOpen={classState.editClass.deleteFail}>
            <ModalBody>
              <Grid container direction='column' justify='center' alignItems='center'>
                <strong>GAGAL menghapus kelas!</strong>
                Proses penghapusan kelas GAGAL, silakan coba lagi!
                <Button
                  color='secondary'
                  variant='contained'
                  disableElevation
                  type='submit'
                  onClick={this.closeFailDeleteModal}
                >
                  Oke
                </Button>
              </Grid>
            </ModalBody>
          </Modal>

          {/* Duplicate class confirmation <<<<<<<<*/}
          <Modal isOpen={classState.editClass.confirmDuplicate}>
            <ModalBody>
              <Grid container direction='column' justify='center' alignItems='center'>
                <strong>Apakah anda yakin mau menyalin kelas ini dan membuat kelas baru?</strong>
                Anda akan membuat kelas baru dengan informasi dan anggota yang sama dengan kelas ini
              </Grid>
            </ModalBody>
            <ModalFooter>
              <Button color='primary' variant='contained' disableElevation type='submit' onClick={this.toggleConfirmDuplicate}>
                Batal
              </Button>
              <Button color='primary' variant='contained' disableElevation type='submit' onClick={postDuplicateClass}>
                Ya
              </Button>
            </ModalFooter>
          </Modal>
          {/* Duplicate Success <<<<<<<<<<<<<<<<<<<<<<<<<< */}
          <Modal isOpen={classState.editClass.duplicateSuccess}>
            <ModalBody>
              <Grid container direction='column' justify='center' alignItems='center'>
                <strong>Kelas baru berhasil dibuat!</strong>
                Anda telah berhasil menyalin kelas ini dan membuat kelas baru.
              </Grid>
            </ModalBody>
            <ModalFooter>
              <a href={classState.editClass.duplicatedId}>
                <Button variant='contained' color='primary'>
                  Ke kelas salinan
                </Button>
              </a>
              <Button variant='contained' color='secondary' onClick={this.toggleSuccessDuplicate}>
                Tetap disini
              </Button>
            </ModalFooter>
          </Modal>
          {/* Update Fail <<<<<<<<<<<<<<<<<<<<<<<<<< */}
          <Modal isOpen={classState.editClass.duplicateFail}>
            <ModalBody>
              <Grid container direction='column' justify='center' alignItems='center'>
                <strong>GAGAL menyalin kelas!</strong>
                Proses menyalin kelas GAGAL, silakan coba lagi!
                <Button
                  color='secondary'
                  variant='contained'
                  disableElevation
                  type='submit'
                  onClick={this.closeFailDuplicateModal}
                >
                  Oke
                </Button>
              </Grid>
            </ModalBody>
          </Modal>
        </div>
      </section>
    );
  }
}
const mapStateToProps = state => ({
  accountState: state.account,
  classState: state.class
});

// export default ClassInfo;
export default connect(mapStateToProps, {
  postLogout,
  getDataClassInfo,
  onChangeStateClassInfo,
  postDeleteClass,
  onChangeStateEditClass,
  postUpdateClass,
  postDuplicateClass
})(ClassInfo);
