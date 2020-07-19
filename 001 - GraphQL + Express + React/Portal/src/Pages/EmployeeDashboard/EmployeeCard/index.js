import React, { Fragment, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CardHeader,
  makeStyles,
  IconButton,
  Menu,
  MenuItem,
  Grid,
  Typography,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PropTypes from "prop-types";
import { SignalCellularNullOutlined } from "@material-ui/icons";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  textSkeleton: {
    padding: "10px 10px 0px 10px",
  },
  pictureSkeleton: {
    paddingTop: 10,
  },
}));

function EmployeeCard(props) {
  const { employee, onEdit, onDelete, isSkeleton } = props;
  const classes = useStyles();
  const [menuAnchor, setMenuAnchor] = useState(null);

  const renderSkeleton = () => {
    return (
      <Grid container>
        <Grid item xs={12} className={classes.textSkeleton}>
          <Skeleton width={170} height={15} />
        </Grid>
        <Grid item xs={12} className={classes.textSkeleton}>
          <Skeleton width={150} height={15} />
        </Grid>
        <Grid item xs={12} className={classes.pictureSkeleton}>
          <Skeleton variant="rect" height={100} />
        </Grid>
        <Grid item xs={12} className={classes.textSkeleton}>
          <Skeleton width={150} height={15} />
        </Grid>
        <Grid
          item
          xs={12}
          className={classes.textSkeleton}
          style={{ paddingBottom: "10px" }}
        >
          <Skeleton width={123} height={15} />
        </Grid>
      </Grid>
    );
  };

  return (
    <Fragment>
      <Card className={classes.card}>
        {isSkeleton ? (
          renderSkeleton()
        ) : (
          <Fragment>
            <CardHeader
              action={
                <IconButton
                  onClick={(event) => setMenuAnchor(event.currentTarget)}
                >
                  <MoreVertIcon />
                </IconButton>
              }
              title={`${employee.name.first} ${employee.name.last[0]}`}
              subheader={`${employee.jobPosition}`}
            />
            <CardMedia
              className={classes.media}
              image={employee.picture.large}
            />
            <CardContent>
              <Typography variant="h6">Email</Typography>
              <Typography variant="body2">{employee.email}</Typography>
              <Typography variant="h6">Phone</Typography>
              <Typography variant="body2">{employee.phone}</Typography>
            </CardContent>
          </Fragment>
        )}
      </Card>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
      >
        <MenuItem
          onClick={() => {
            setMenuAnchor(null);
            onEdit();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            setMenuAnchor(null);
            onDelete();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </Fragment>
  );
}

EmployeeCard.propTypes = {
  employee: PropTypes.object,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  isSkeleton: PropTypes.bool,
};

export default EmployeeCard;
