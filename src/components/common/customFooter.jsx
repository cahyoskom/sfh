import React from 'react';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';

const defaultFooterStyles = {
  root: {
    '&:last-child': {
      padding: '0px 0px 0px 590px'
    }
  }
};

class CustomFooter extends React.Component {
  handleClick = () => {
    alert('Custom toolbar add button clicked');
  };

  render() {
    const { classes } = this.props;

    return (
      <TableFooter>
        <TableRow>
          <TableCell>
            <React.Fragment>
              <Tooltip title={'custom icon'}>
                <IconButton className={classes.iconButton} onClick={this.handleClick}>
                  <Button color='primary' size='small' style={{ color: 'blue' }}>
                    Submit Selected Task
                  </Button>
                  {/* <AddIcon className={classes.deleteIcon} /> */}
                </IconButton>
              </Tooltip>
            </React.Fragment>
          </TableCell>

          {/* <TableCell>
            <TablePagination
              className={classes.root}
              count={this.props.count}
              page={this.props.page}
              rowsPerPage={this.props.rowsPerPage}
              onChangePage={this.props.onChangePage}
              onChangeRowsPerPage={this.props.onChangeRowsPerPage}
            />
          </TableCell> */}
        </TableRow>
      </TableFooter>
    );
  }
}

export default withStyles(defaultFooterStyles, { name: 'CustomFooter' })(CustomFooter);
