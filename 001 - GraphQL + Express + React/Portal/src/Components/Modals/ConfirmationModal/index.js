import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  loadingContainer: {
    height: 170,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function ConfirmationModal(props) {
  const {
    open,
    title,
    onClose,
    description,
    onConfirm,
    loading,
    additionalContent,
  } = props;

  const classes = useStyles();

  return (
    <Dialog open={open} fullWidth={true} maxWidth="sm">
      {loading ? (
        <DialogContent className={classes.loadingContainer}>
          <CircularProgress />
        </DialogContent>
      ) : (
        <Fragment>
          <DialogTitle>{title ? title : "Are your sure?"}</DialogTitle>
          {description && (
            <DialogContent>
              <DialogContentText>{description}</DialogContentText>
              {additionalContent ? additionalContent : null}
            </DialogContent>
          )}
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button color="primary" variant="contained" onClick={onConfirm}>
              Confirm
            </Button>
          </DialogActions>
        </Fragment>
      )}
    </Dialog>
  );
}

ConfirmationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  description: PropTypes.string,
  loading: PropTypes.bool,
};

export default ConfirmationModal;
