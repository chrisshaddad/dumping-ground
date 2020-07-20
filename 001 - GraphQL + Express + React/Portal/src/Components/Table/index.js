import React, { useState, useEffect } from "react";
import {
  Grid,
  Table as MUITable,
  TableBody,
  TableHead,
  Typography,
  makeStyles,
  TableContainer,
  Paper,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  CircularProgress,
  IconButton,
  TablePagination,
  Tooltip,
  TableFooter,
} from "@material-ui/core";
import { CustomTextField } from "../index";
import PropTypes from "prop-types";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  tableTitle: {
    color: theme.palette.primary.main,
  },
  loadingContainer: {
    height: 250,
    textAlign: "center",
  },
}));

function getIcon(icon) {
  if (icon === "delete") return <DeleteIcon />;
  if (icon === "edit") return <EditIcon />;
}

function Table(props) {
  const {
    title,
    dataMapper,
    loading,
    data,
    pageSize,
    onShowMore,
    actions,
  } = props;
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setCurrentPage(0);
  }, [searchValue]);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
    if (data.length <= newPage * pageSize && !searchValue) onShowMore(newPage);
  };

  let dataToRender = [];

  if (!searchValue) {
    dataToRender = data.slice(
      currentPage * pageSize,
      (currentPage + 1) * pageSize + 1
    );
  } else {
    data.forEach((d) => {
      for (let i = 0; i < dataMapper.length; i++) {
        if (
          dataMapper[i]
            .searchKey(d)
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        ) {
          dataToRender.push(d);
          break;
        }
      }
    });
  }

  return (
    <Grid container>
      {title && (
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.tableTitle}>
            {title}
          </Typography>
        </Grid>
      )}
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Toolbar>
            <Grid container justify="flex-end">
              <Grid item xs={4}>
                <CustomTextField
                  placeholder="Start Searching"
                  onChange={(event) => setSearchValue(event.target.value)}
                  value={searchValue}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        {searchValue && (
                          <IconButton onClick={() => setSearchValue("")}>
                            <CloseIcon />
                          </IconButton>
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Toolbar>
          <MUITable size="small">
            <TableHead>
              <TableRow>
                {dataMapper.map((d, index) => (
                  <TableCell key={`table_header_${d.column}`}>
                    {d.column}
                  </TableCell>
                ))}
                <TableCell padding="none" />
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell
                    className={classes.loadingContainer}
                    colSpan={dataMapper.length + 1}
                  >
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                dataToRender.map((d, index) => (
                  <TableRow key={`row_${index}`}>
                    {dataMapper.map((dm) => (
                      <TableCell key={`table_cell_${dm.column}_${index}`}>
                        {dm.renderValue(d)}
                      </TableCell>
                    ))}
                    {actions && actions.length > 0 ? (
                      <TableCell
                        padding="none"
                        style={{
                          whiteSpace: "pre",
                        }}
                      >
                        {actions.map((a, index) => (
                          <Tooltip key={`action_${index}`} title={a.tooltip}>
                            <IconButton
                              onClick={() => a.action(d)}
                              size="small"
                            >
                              {getIcon(a.icon)}
                            </IconButton>
                          </Tooltip>
                        ))}
                      </TableCell>
                    ) : null}
                  </TableRow>
                ))
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[]}
                  page={currentPage}
                  backIconButtonProps={{
                    disabled: Boolean(loading || currentPage === 0),
                  }}
                  nextIconButtonProps={{
                    disabled: Boolean(
                      loading ||
                        (searchValue &&
                          dataToRender &&
                          (dataToRender.length < currentPage * pageSize ||
                            dataToRender.slice(currentPage * pageSize).length))
                    ),
                  }}
                  rowsPerPage={pageSize}
                  count={searchValue ? dataToRender.length : -1}
                  onChangePage={handleChangePage}
                />
              </TableRow>
            </TableFooter>
          </MUITable>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

Table.propTypes = {
  title: PropTypes.string,
  dataMapper: PropTypes.array,
  data: PropTypes.array,
  loading: PropTypes.bool,
  pageSize: PropTypes.number,
  onShowMore: PropTypes.func,
  actions: PropTypes.array,
};

export default Table;
