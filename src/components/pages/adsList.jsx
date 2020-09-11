import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableFooter from '@material-ui/core/TableFooter';
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

//-------------------shortlist
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

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
  { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
  { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
  { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
  { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
  { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
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

//-----------------end shortlist

class AdsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: {
        maxWidth: 200
      }
    };
  }
  // componentDidMount() {
  //   const { getDataClassInfo, onChangeStateClassInfo, getDataClassMembers } = this.props;
  //   onChangeStateClassInfo('id', this.props.match.params.id);
  //   getDataClassMembers();
  //   getDataClassInfo();
  // }

  render() {
    const { classState, postAddMember, onChangeStateAddMember } = this.props;
    let iklan = [
      {
        id: 1,
        nama: "Naster kering enak",
        pembuat: "ipul",
        dilihat: 0,
        periode: "01-08-2020 sampai 07-08-2020",
        status: "Menunggu Persetujuan",
        tarif: 5000
      },
      {
        id: 2,
        nama: "HP murah",
        pembuat: "Bagio",
        dilihat: 10,
        periode: "01-08-2020 sampai 01-09-2020",
        status: "Menunggu Persetujuan",
        tarif: 10000
      },
      {
        id: 3,
        nama: "Katering sehat",
        pembuat: "Darmi",
        dilihat: 20,
        periode: "01-08-2020 sampai 07-08-2020",
        status: "Menunggu Persetujuan",
        tarif: 5000
      },
      {
        id: 4,
        nama: "Barang elektronik berkualitas",
        pembuat: "Ajoy",
        dilihat: 100,
        periode: "01-08-2020 sampai 07-08-2021",
        status: "Menunggu Persetujuan",
        tarif: 50000
      },
      {
        id: 5,
        nama: "Boneka lucu",
        pembuat: "Diana",
        dilihat: 5,
        periode: "01-07-2020 sampai 30-07-2020",
        status: "Dipubilkasikan",
        tarif: 10000
      }
    ];


    return (
      <div>
        <Container>
          <section className='home-page pt-4'>
            <Grid container direction='col' spacing={2} justify='center' alignItems='center'>
              <Grid item xs={10} sm={10} md={10} lg={10} xl={12} spacing={1}>

                <div className="h5 font-weight-bold pb-3">Dashboard Iklan</div>

              </Grid>
              <Grid item lg={10}>
                <TableContainer component={Paper} elevation={3}>
                  <Table className='tableMember'/*  aria-label='simple table' */ size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow style={{ height: '60px' }}>
                        <TableCell style={{ width: '165px' }}>
                          <strong>Nama Iklan</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Pembuat</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Dilihat</strong>
                        </TableCell>
                        <TableCell style={{ width: '170px' }}>
                          <strong>Periode</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Tarif</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Status</strong>
                        </TableCell>
                        <TableCell style={{ width: '150px' }}>
                          <strong>Aksi</strong>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {iklan.map(row => (
                        <TableRow hover key={row.nama}>
                          <TableCell style={{ color: '#000000' }}>{row.nama}</TableCell>
                          <TableCell style={{ color: '#000000' }}>{row.pembuat}</TableCell>
                          <TableCell style={{ color: '#000000' }}>{row.dilihat}</TableCell>
                          <TableCell style={{ color: '#000000' }}>{row.periode}</TableCell>
                          <TableCell style={{ color: '#000000', align: 'right' }}>{'Rp. ' + new Intl.NumberFormat(['ban', 'id']).format(row.tarif)}</TableCell>
                          {row.status == 'Dipubilkasikan' && (
                            <TableCell style={{ color: '#5FD855' }}>{row.status}</TableCell>
                          )}
                          {row.status == 'Menunggu Persetujuan' && (
                            <TableCell style={{ color: '#F4A31E' }}>{row.status}</TableCell>
                          )}
                          <TableCell >
                            <Link to={`${process.env.PUBLIC_URL}/pratinjau/${row.id}`}>
                              <Button style={{ backgroundColor: '#15A3B8' }} className='btn text-white'>
                                Pratinjau
                            </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TablePagination
                          style={{ padding: '0 115px 0 0' }}
                          rowsPerPageOptions={[3, 5, 25, 50, 100]}
                          colSpan={7}
                          count={5}
                          rowsPerPage={3}
                          page={0}
                          SelectProps={{
                            native: true
                          }}
                          onChangePage={this.handleChangePage}
                          onChangeRowsPerPage={this.handleChangeRowsPerPage}
                          onClick={this.onClickPage}
                        />
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </section>
        </Container>
      </div >
    );
  }
}


export default connect(/* mapStateToProps, mapDispatchToProps */)(AdsList);