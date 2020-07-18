import React, { useContext, useState, Fragment } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  CircularProgress,
} from "@material-ui/core";
import GlobalContext from "../../../Contexts/GlobalContext";
import { Constants } from "../../../Utils";
import {
  IconButton,
  makeStyles,
  Button,
  Badge,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Menu as MenuIcon, Notifications } from "@material-ui/icons";
import API from "../../../Utils/Network";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  notificationsPaper: {
    maxHeight: 150,
    width: 300,
    height: "100%",
  },
  notification: {
    fontSize: "0.8em",
  },
  errorNotification: {
    backgroundColor: red[100],
  },
  successNotification: {
    backgroundColor: green[100],
  },
  notificationLoader: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  notificationsMenu:{
    height: "100%"
  }
}));

const notificationTypeStyleMapping = {
  error: "errorNotification",
  success: "successNotification",
};

function TopBar() {
  const globalContext = useContext(GlobalContext);
  const classes = useStyles();
  const history = useHistory();
  const [numberOfNotifications, setNotificationAmount] = useState(6);
  const [notificationsLoading, setNotificationsLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [notificationsMenuAnchor, setNotificationsMenuOpen] = useState(null);

  const fetchNotifications = () => {
    setNotificationsLoading(true);
    setNotificationAmount(0);

    API.getNotifications()
      .then((res) => {
        setNotificationsLoading(false);
        setNotifications(res.notifications);
        console.log(res.notifications);
      })
      .catch((ex) => {
        setNotificationsLoading(false);
      });
  };

  const handleSignOut = () => {
    //Trigger any async token kill actions here
    localStorage.setItem(Constants.localStorageVars.IS_AUTHENTICATED, false);
    document.body.className = "";
    history.push("/");
  };

  const handleSelectNotification = (n) => {
    notificationsMenuAnchor(null)
  }

  return (
    <Fragment>
      <AppBar
        position="relative"
        color={
          globalContext.globalTheme.get === Constants.themes.DARK
            ? "default"
            : "primary"
        }
      >
        <Toolbar>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Admin Panel
          </Typography>
          <IconButton
            color="inherit"
            onClick={(event) => {
              fetchNotifications();
              setNotificationsMenuOpen(event.currentTarget);
            }}
          >
            <Badge badgeContent={numberOfNotifications} color="secondary">
              <Notifications />
            </Badge>
          </IconButton>
          <Button color="inherit" onClick={handleSignOut}>
            SIGN OUT
          </Button>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={notificationsMenuAnchor}
        open={Boolean(notificationsMenuAnchor)}
        onClose={() => setNotificationsMenuOpen(null)}
        PaperProps={{
          className: classes.notificationsPaper,
        }}
        MenuListProps={{
          className:classes.notificationsMenu
        }}
      >
        {notificationsLoading ? (
          <MenuItem className={classes.notificationLoader} disabled>
            <CircularProgress size={30}  />
          </MenuItem>
        ) : (
          notifications.map((n) => (
            <MenuItem
              className={`${classes.notification} ${
                classes[notificationTypeStyleMapping[n.type]]
              }`}
              onClick={() => handleSelectNotification(n)}
            >
              {n.message}
            </MenuItem>
          ))
        )}
      </Menu>
    </Fragment>
  );
}

export default TopBar;
