import React, {
  Fragment,
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";
import {
  Dialog,
  AppBar,
  makeStyles,
  Toolbar,
  IconButton,
  Container,
  Button,
  Slide,
  Typography,
  Grid,
  InputAdornment,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import PropTypes from "prop-types";
import { CustomTextField, CustomSelect } from "../../../Components";
import GlobalContext from "../../../Contexts/GlobalContext";
import { Constants } from "../../../Utils";

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  actionContainer: {
    textAlign: "center",
    marginTop: 5,
  },
  formContainer: {
    marginTop: 10,
  },
  sectionSpacing: {
    marginTop: 20,
  },
  image: {
    borderRadius: 5,
    width: 100,
    height: 100,
    backgroundColor: "#d6d9dc",
    cursor: "pointer",
  },
}));

function EmployeeFormDialog(props) {
  const { open, isEditMode, onClose, onUpdate, onCreate, employee } = props;
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState([]);
  const [imageMenuAnchor, setImageMenuAnchor] = useState(null);
  const classes = useStyles();
  const globalContext = useContext(GlobalContext);
  const inputFile = useRef(null);

  useEffect(() => {
    if (isEditMode){ 
      let formData = {
        firstName: employee.name.first,
        lastName: employee.name.last,
        age: Math.floor(Math.random() * 45),
        email: employee.email,
        phone: employee.phone,
        country: employee.nat.toLowerCase(),
        city: employee.location.city,
        city: employee.location.city,
        profilePicture: employee.picture.medium
      }
      setFormData(formData);
    }
  }, [isEditMode]);

  useEffect(() => {
    if (!open) {
      setFormData({});
      setErrors([]);
    }
  }, [open]);

  const handleFormDataChange = (field, value) => {
    setErrors([]);
    let newFormData = Object.assign({}, formData);
    newFormData[field] = value;
    setFormData(newFormData);
  };

  const handleFormSubmission = () => {
    const errors = getErrors();
    if (errors.length > 0) setErrors(errors);
    else {
      if (isEditMode) onUpdate(formData);
      else onCreate(formData);
    }
  };

  const getErrors = () => {
    let errors = [];
    if (!formData.firstName)
      errors.push({
        key: "firstName",
        value: "Field is required",
      });
    if (!formData.lastName)
      errors.push({
        key: "lastName",
        value: "Field is required",
      });
    if (!emailRegex.test(formData.email))
      errors.push({
        key: "email",
        value: "Invalid Email Format",
      });

    return errors;
  };

  const getHelperText = (field) => {
    let helperText;

    const error = errors.find((e) => e.key === field);
    if (error) helperText = error.value;

    return helperText;
  };

  const handleImageSet = () => {
    inputFile.current.click();
  };

  return (
    <Fragment>
      <Dialog fullScreen open={open} TransitionComponent={Transition}>
        <AppBar
          color={
            globalContext.globalTheme.get === Constants.themes.DARK
              ? "default"
              : "primary"
          }
          className={classes.appBar}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={onClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {isEditMode ? "Editing Employee" : "Creating Employee"}
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="xs">
          <Grid container className={classes.formContainer} spacing={1}>
            <Grid item xs={12}>
              <Typography variant="h6" color="primary">
                Employee Info
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="center" style={{ marginBottom: 5 }}>
                <img
                  className={classes.image}
                  src={formData.profilePicture}
                  onClick={(event) => setImageMenuAnchor(event.currentTarget)}
                />
                <input
                  type="file"
                  ref={inputFile}
                  style={{ display: "none" }}
                  onChange={(event) => {
                    handleFormDataChange(
                      "profilePicture",
                      URL.createObjectURL(event.target.files[0])
                    );
                    setImageMenuAnchor(null);
                  }}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                label="First Name"
                value={formData.firstName}
                onChange={(event) =>
                  handleFormDataChange("firstName", event.target.value)
                }
                error={errors.find((e) => e.key === "firstName")}
                helperText={getHelperText("firstName")}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                label="Last Name"
                value={formData.lastName}
                onChange={(event) =>
                  handleFormDataChange("lastName", event.target.value)
                }
                error={errors.find((e) => e.key === "lastName")}
                helperText={getHelperText("lastName")}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                label="Age"
                value={formData.age}
                onChange={(event) =>
                  handleFormDataChange("age", event.target.value)
                }
                error={errors.find((e) => e.key === "age")}
                helperText={getHelperText("age")}
                type="number"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                color="primary"
                className={classes.sectionSpacing}
              >
                Contact Info
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                label="Email"
                value={formData.email}
                onChange={(event) =>
                  handleFormDataChange("email", event.target.value)
                }
                error={errors.find((e) => e.key === "email")}
                helperText={getHelperText("email")}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                label="Phone"
                value={formData.phone}
                onChange={(event) =>
                  handleFormDataChange("phone", event.target.value)
                }
                error={errors.find((e) => e.key === "phone")}
                helperText={getHelperText("phone")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+961</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                color="primary"
                className={classes.sectionSpacing}
              >
                Address
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <CustomSelect
                label="Country"
                value={formData.country}
                onChange={(event) =>
                  handleFormDataChange("country", event.target.value)
                }
                error={errors.find((e) => e.key === "country")}
                helperText={getHelperText("country")}
                data={[
                  {
                    key: "us",
                    value: "United States",
                  },
                  {
                    key: "fr",
                    value: "France",
                  },
                  {
                    key: "ca",
                    value: "Canada",
                  },
                ]}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                label="City"
                value={formData.city}
                onChange={(event) =>
                  handleFormDataChange("city", event.target.value)
                }
                error={errors.find((e) => e.key === "city")}
                helperText={getHelperText("city")}
              />
            </Grid>
            <Grid item xs={12} className={classes.actionContainer}>
              <Button
                onClick={handleFormSubmission}
                variant="contained"
                color="primary"
              >
                {isEditMode ? "Update" : "Create"}
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Dialog>

      <Menu
        open={Boolean(imageMenuAnchor)}
        onClose={() => setImageMenuAnchor(null)}
        anchorEl={imageMenuAnchor}
      >
        <MenuItem onClick={handleImageSet}>Set Image</MenuItem>
        <MenuItem
          onClick={() => {
            handleFormDataChange("profilePicture", null);
            setImageMenuAnchor(null);
          }}
        >
          Clear Image
        </MenuItem>
      </Menu>
    </Fragment>
  );
}

EmployeeFormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  isEditMode: PropTypes.bool,
  onClose: PropTypes.func,
  onCreate: PropTypes.func,
  onUpdate: PropTypes.func,
  employee: PropTypes.object,
};

export default EmployeeFormDialog;
