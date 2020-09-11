import React, { Component } from 'react';

import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import { Image } from 'react-bootstrap';
import {
  getDataClassMembers,
  getDataClassInfo,
  onChangeStateClassInfo,
  onChangeStateUpdateMember,
  postUpdateMember,
  onChangeStateAddMember,
  postAddMember
} from '../../actions';

import Alert from '@material-ui/lab/Alert';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Grid, Box, Collapse, IconButton, Container, Breadcrumbs, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { default as MaterialLink } from '@material-ui/core/Link';
import CloseIcon from '@material-ui/icons/Close';

class ClassMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: {
        maxWidth: 200
      }
    };
  }
  componentDidMount() {
    const { getDataClassInfo, onChangeStateClassInfo, getDataClassMembers } = this.props;
    onChangeStateClassInfo('id', this.props.match.params.id);
    getDataClassMembers();
    getDataClassInfo();
  }

  onClickNonaktifkan(e) {
    const { onChangeStateUpdateMember, postUpdateMember } = this.props;
    onChangeStateUpdateMember('request', 'nonaktifkan');
    onChangeStateUpdateMember('userId', e);
    postUpdateMember();
  }
  onClickAktifkan(e) {
    const { onChangeStateUpdateMember, postUpdateMember } = this.props;
    onChangeStateUpdateMember('request', 'aktifkan');
    onChangeStateUpdateMember('userId', e);
    postUpdateMember();
  }
  onClickSetujui(e) {
    const { onChangeStateUpdateMember, postUpdateMember } = this.props;
    onChangeStateUpdateMember('request', 'setujui');
    onChangeStateUpdateMember('userId', e);
    postUpdateMember();
  }
  onClickTolak(e) {
    const { onChangeStateUpdateMember, postUpdateMember } = this.props;
    onChangeStateUpdateMember('request', 'tolak');
    onChangeStateUpdateMember('userId', e);
    postUpdateMember();
  }
  onClickBatalkan(e) {
    const { onChangeStateUpdateMember, postUpdateMember } = this.props;
    onChangeStateUpdateMember('request', 'batalkan');
    onChangeStateUpdateMember('userId', e);
    postUpdateMember();
  }
  onClickKeluarkan(e) {
    const { onChangeStateUpdateMember, postUpdateMember } = this.props;
    onChangeStateUpdateMember('request', 'keluarkan');
    onChangeStateUpdateMember('userId', e);
    postUpdateMember();
  }
  onClickAddTeacher(e) {
    const { onChangeStateAddMember } = this.props;
    onChangeStateAddMember('position', 'teacher');
    onChangeStateAddMember('modal', true);
  }
  onClickAddStudent(e) {
    const { onChangeStateAddMember } = this.props;
    onChangeStateAddMember('position', 'student');
    onChangeStateAddMember('modal', true);
  }

  render() {
    const { classState, postAddMember, onChangeStateAddMember } = this.props;
    let students = [];
    let teachers = [];
    if (classState.members.data != '') {
      students = classState.members.data.students; //
      // students = JSON.parse(classState.members.data).students;
      teachers = classState.members.data.teachers; //
      // teachers = JSON.parse(classState.members.data).teachers;
    }
    return (
      <div>
        <Container>
          <Breadcrumbs separator={<NavigateNextIcon fontSize='small' />} aria-label='breadcrumb'>
            <MaterialLink color='inherit' href={`${process.env.PUBLIC_URL}/`}>
              Beranda
            </MaterialLink>
            <Typography color='textPrimary'>{classState.classInfo.name}</Typography>
          </Breadcrumbs>
          <section className='home-page section-b-space'>
            <Grid container direction='col' spacing={2} justify='center' alignItems='center'>
              <Grid item xs={12} lg={10}>
                <Paper variant='outlined' width={1}>
                  <Box p={2}>
                    <Grid item container direction='row' justify='space-between' alignItems='center'>
                      <Grid item lg={8}>
                        <div>
                          <div style={{ fontSize: '36px', color: '#0170E3' }}>
                            <strong>{classState.classInfo.name}</strong>
                          </div>
                          <div style={{}}>
                            <strong>{classState.classInfo.owner.name}</strong>
                          </div>
                          <div style={{}}>
                            <strong>{classState.classInfo.description}</strong>
                          </div>

                          <div>
                            Kode kelas: <strong>{classState.classInfo.code}</strong>
                          </div>
                        </div>
                      </Grid>
                      <Grid item>
                        <div>
                          <Image
                            className='school-logo'
                            style={{ height: '140px', width: '140px' }}
                            src={classState.classInfo.owner.avatar || `${process.env.PUBLIC_URL}/assets/images/school-logo.svg`}
                            roundedCircle
                          ></Image>
                        </div>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Grid>
              <Grid item container direction='row' justify='space-between' alignItems='center'>
                <Grid item>
                  <h3>Pengajar</h3>
                </Grid>
                <Grid item>
                  <Button color='primary' variant='contained' onClick={() => this.onClickAddTeacher()}>
                    tambah pengajar +
                  </Button>
                </Grid>
              </Grid>
              <TableContainer component={Paper}>
                <Table className='tableMember' aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      {classState.members.data.hasAuthority && (
                        <TableCell>
                          <strong>Status</strong>
                        </TableCell>
                      )}
                      <TableCell>
                        <strong> Nama</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {teachers.map(row => (
                      <TableRow key={row.name}>
                        {classState.members.data.hasAuthority && row.link_status == 'Disetujui' && (
                          <TableCell style={{ color: '#0170E3' }}>{row.link_status}</TableCell>
                        )}
                        {classState.members.data.hasAuthority && row.link_status == 'Menunggu persetujuan' && (
                          <TableCell style={{ color: '#fcbe03' }}>{row.link_status}</TableCell>
                        )}
                        {classState.members.data.hasAuthority && row.link_status == 'Dinonaktifkan' && (
                          <TableCell style={{ color: '#bfbfbf' }}>{row.link_status}</TableCell>
                        )}
                        {classState.members.data.hasAuthority && row.link_status == 'Undangan terkirim' && (
                          <TableCell style={{ color: '#fc035a' }}>{row.link_status}</TableCell>
                        )}
                        <TableCell component='th' scope='row'>
                          {row.name}
                        </TableCell>
                        {classState.members.data.hasAuthority && row.link_status == 'Disetujui' && (
                          <TableCell align='right'>
                            <Button color='secondary' onClick={() => this.onClickNonaktifkan(row.id)}>
                              Nonaktifkan
                            </Button>
                            <Button onClick={() => this.onClickKeluarkan(row.id)}>Keluarkan</Button>
                          </TableCell>
                        )}
                        {classState.members.data.hasAuthority && row.link_status == 'Menunggu persetujuan' && (
                          <TableCell align='right'>
                            <Button color='secondary' onClick={() => this.onClickTolak(row.id)}>
                              Tolak
                            </Button>
                            <Button color='primary' onClick={() => this.onClickSetujui(row.id)}>
                              Setujui
                            </Button>
                          </TableCell>
                        )}
                        {classState.members.data.hasAuthority && row.link_status == 'Dinonaktifkan' && (
                          <TableCell align='right'>
                            <Button color='secondary' onClick={() => this.onClickKeluarkan(row.id)}>
                              Keluarkan
                            </Button>
                            <Button color='primary' onClick={() => this.onClickAktifkan(row.id)}>
                              Aktifkan
                            </Button>
                          </TableCell>
                        )}
                        {classState.members.data.hasAuthority && row.link_status == 'Undangan terkirim' && (
                          <TableCell align='right'>
                            <Button color='secondary' onClick={() => this.onClickBatalkan(row.id)}>
                              Batalkan
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Grid item container direction='row' justify='space-between' alignItems='center'>
                <Grid item>
                  <h3>Pelajar</h3>
                </Grid>
                <Grid item>
                  <Button color='primary' variant='contained' onClick={() => this.onClickAddStudent()}>
                    tambah pelajar +
                  </Button>
                </Grid>
              </Grid>
              <TableContainer component={Paper} width={1}>
                <Table className='tableMember' aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      {classState.members.data.hasAuthority && (
                        <TableCell>
                          <strong>Status</strong>
                        </TableCell>
                      )}
                      <TableCell>
                        <strong>Nama</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students.map(row => (
                      <TableRow key={row.name}>
                        {classState.members.data.hasAuthority && row.link_status == 'Disetujui' && (
                          <TableCell style={{ color: '#0170E3' }}>{row.link_status}</TableCell>
                        )}
                        {classState.members.data.hasAuthority && row.link_status == 'Menunggu persetujuan' && (
                          <TableCell style={{ color: '#fcbe03' }}>{row.link_status}</TableCell>
                        )}
                        {classState.members.data.hasAuthority && row.link_status == 'Dinonaktifkan' && (
                          <TableCell style={{ color: '#bfbfbf' }}>{row.link_status}</TableCell>
                        )}
                        {classState.members.data.hasAuthority && row.link_status == 'Undangan terkirim' && (
                          <TableCell style={{ color: '#fc035a' }}>{row.link_status}</TableCell>
                        )}
                        <TableCell component='th' scope='row'>
                          {row.name}
                        </TableCell>
                        {classState.members.data.hasAuthority && row.link_status == 'Disetujui' && (
                          <TableCell align='right'>
                            <Button color='secondary' onClick={() => this.onClickNonaktifkan(row.id)}>
                              Nonaktifkan
                            </Button>
                            <Button onClick={() => this.onClickKeluarkan(row.id)}>Keluarkan</Button>
                          </TableCell>
                        )}
                        {classState.members.data.hasAuthority && row.link_status == 'Menunggu persetujuan' && (
                          <TableCell align='right'>
                            <Button color='secondary' onClick={() => this.onClickTolak(row.id)}>
                              Tolak
                            </Button>
                            <Button color='primary' onClick={() => this.onClickSetujui(row.id)}>
                              Setujui
                            </Button>
                          </TableCell>
                        )}
                        {classState.members.data.hasAuthority && row.link_status == 'Dinonaktifkan' && (
                          <TableCell align='right'>
                            <Button color='secondary' onClick={() => this.onClickKeluarkan(row.id)}>
                              Keluarkan
                            </Button>
                            <Button color='primary' onClick={() => this.onClickAktifkan(row.id)}>
                              Aktifkan
                            </Button>
                          </TableCell>
                        )}
                        {classState.members.data.hasAuthority && row.link_status == 'Undangan terkirim' && (
                          <TableCell align='right'>
                            <Button color='secondary' onClick={() => this.onClickBatalkan(row.id)}>
                              Batalkan
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            {/* modal add member */}
            <Modal isOpen={classState.addMember.modal} centered>
              <ModalHeader toggle={() => onChangeStateAddMember('modal', false)}>
                <strong>Tambah anggota</strong>
              </ModalHeader>
              <ValidatorForm onSubmit={postAddMember}>
                <ModalBody>
                  <div className='form-group'>
                    <label>
                      Masukkan email anggota yang ingin kamu tambahkan sebagai <strong>anggota</strong>. Kami akan memberikan
                      undangan berupa tautan yang akan dikirimkan melalui email.
                    </label>
                    <TextValidator
                      id='email'
                      label='Email'
                      type='email'
                      InputLabelProps={{
                        shrink: true
                      }}
                      margin='dense'
                      fullWidth
                      variant='outlined'
                      onChange={e => onChangeStateAddMember(e.target.id, e.target.value)}
                      onBlur={this.validateEmail}
                      error={!this.state.isEmailValid}
                      helperText={this.state.emailErrorText}
                      value={classState.addMember.email}
                      validators={['required']}
                      errorMessages={['masukkan email']}
                    />
                  </div>

                  <Collapse in={classState.addMember.error}>
                    <Alert
                      severity='error'
                      action={
                        <IconButton
                          aria-label='close'
                          color='inherit'
                          size='small'
                          onClick={() => onChangeStateAddMember('error', false)}
                        >
                          <CloseIcon fontSize='inherit' />
                        </IconButton>
                      }
                    >
                      {classState.addMember.errormsg}
                    </Alert>
                  </Collapse>
                </ModalBody>
                <ModalFooter>
                  <div>
                    <Button
                      color='default'
                      variant='contained'
                      disableElevation
                      onClick={() => onChangeStateAddMember('modal', false)}
                    >
                      Batal
                    </Button>
                  </div>
                  <div>
                    <Button color='primary' variant='contained' disableElevation type='submit'>
                      Kirim
                    </Button>
                  </div>
                </ModalFooter>
              </ValidatorForm>
            </Modal>
          </section>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  // accountState: state.account,
  classState: state.class
});

// export default ClassInfo;
export default connect(mapStateToProps, {
  getDataClassInfo,
  getDataClassMembers,
  onChangeStateClassInfo,
  onChangeStateUpdateMember,
  postUpdateMember,
  onChangeStateAddMember,
  postAddMember
})(ClassMember);




import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Donut', 452, 25.0, 51, 4.9),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Honeycomb', 408, 3.2, 87, 6.5),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Jelly Bean', 375, 0.0, 94, 0.0),
  createData('KitKat', 518, 26.0, 65, 7.0),
  createData('Lollipop', 392, 0.2, 98, 0.0),
  createData('Marshmallow', 318, 0, 81, 2.0),
  createData('Nougat', 360, 19.0, 9, 37.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
  { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
  { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
  { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
  { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Nutrition
          </Typography>
        )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}


