import React from "react";
import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { People, Settings } from "@material-ui/icons";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const menuItems = [
  {
    route: "/dashboard",
    name: "Employee Dashboard",
    icon: "people",
  },
  {
    isDivider: true,
  },
  {
    route: "/settings",
    name: "Settings",
    icon: "settings",
  },
];

function SideMenu(props) {
  const history = useHistory();
  const getIcon = (icon) => {
    if (icon === "people") return <People />;
    if (icon === "settings") return <Settings />;

    return null;
  };

  return (
    <Drawer anchor={"left"} open={props.open} onClose={props.onClose}>
      <List>
        {menuItems.map((mi, index) =>
          mi.isDivider ? (
            <Divider key={`route_sidemenu_${index}`} />
          ) : (
            <ListItem
              button
              key={`route_sidemenu_${index}`}
              onClick={() => {
                history.push(mi.route);
                props.onClose();
              }}
            >
              <ListItemIcon>{getIcon(mi.icon)}</ListItemIcon>
              <ListItemText primary={mi.name} />
            </ListItem>
          )
        )}
      </List>
    </Drawer>
  );
}

SideMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SideMenu;
