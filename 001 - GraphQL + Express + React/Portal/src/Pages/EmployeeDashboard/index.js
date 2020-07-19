import React, { Fragment, useContext, useEffect, useState } from "react";
import GlobalContext from "../../Contexts/GlobalContext";
import { Constants, API } from "../../Utils";
import {
  PagePaperContainer,
  CustomTable,
  ConfirmationModal,
} from "../../Components";
import {
  Container,
  AccordionDetails,
  Accordion,
  AccordionSummary,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Typography,
  FormControl,
  FormLabel,
  Checkbox,
  makeStyles,
  Dialog,
  CircularProgress,
  Button,
  Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EmployeeCard from "./EmployeeCard";
import EmployeeFormDialog from "./EmployeeFormDialog";

const views = {
  table: "table",
  cards: "cards",
};

const possibleJobPositions = [
  "Pogramming",
  "Administrative",
  "Secretary",
  "Senior Programmer",
  "Junior Programmer",
  "Manager",
  "Architect",
];

//Can be made as a state variable
const employeesPerPage = 12;

const useStyles = makeStyles((theme) => ({
  employeesTitle: {
    color: theme.palette.primary.main,
  },
  pageOptionsContainer: {
    marginBottom: 10,
  },
  showMoreContainer: {
    marginTop: 10,
  },
}));

function EmployeeDashboard() {
  const classes = useStyles();
  const globalContext = useContext(GlobalContext);
  const [viewType, setViewType] = useState("cards");
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const [allEmployees, setAllEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isEditMode, setEditMode] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isLoadingAction, setActionLoading] = useState(false);
  const [successSnacknarOpen, setSuccessSnacknarOpen] = useState(false);
  const [failedSnacknarOpen, setFailedSnacknarOpen] = useState(false);
  const [employeeToDeleteId, setEmployeeToDeleteId] = useState(0);
  const [employeeFormOpen, setEmployeeFormOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);

  useEffect(() => {
    if (globalContext.currentPage.get !== Constants.pageTags.EMPLOYEE_DASHBOARD)
      globalContext.currentPage.set(Constants.pageTags.EMPLOYEE_DASHBOARD);
  });

  useEffect(() => {
    if (allEmployees.length === 0) fetchEmployees();
  }, []);

  useEffect(() => {
    setCurrentPage(0);
    setAllEmployees([]);
  }, [viewType]);

  useEffect(() => {
    if (currentPage === 0) fetchEmployees();
  }, [currentPage]);

  useEffect(() => {
    if (isEditMode) setEmployeeFormOpen(true);
  }, [isEditMode]);

  const fetchEmployees = () => {
    setLoadingEmployees(true);
    if (!loadingEmployees)
      API.getEmployees(currentPage, employeesPerPage)
        .then((response) => {
          let employees = response.results;
          employees.forEach((emp) => {
            const jobPosition =
              possibleJobPositions[Math.floor(Math.random() * 6)];
            emp.jobPosition = jobPosition;
          });
          setCurrentPage(currentPage + 1);
          setLoadingEmployees(false);
          setAllEmployees([...allEmployees, ...employees]);
        })
        .catch((ex) => {
          //todo: add exception handling
          setLoadingEmployees(false);
        });
  };

  const deleteEmployee = () => {
    setActionLoading(true);
    API.deleteEmployee(employeeToDeleteId)
      .then((res) => {
        setDeleteModalOpen(false);
        setActionLoading(false);
        if (res.success) setSuccessSnacknarOpen(true);
        else setFailedSnacknarOpen(true);
      })
      .catch((ex) => {
        setActionLoading(false);
        setDeleteModalOpen(false);
        setFailedSnacknarOpen(true);
      });
  };

  const handleEmployeeCreation = (formData) => {
    globalContext.showLoadingOverlay.set(true);
    API.addEmployee(formData)
      .then((response) => {
        globalContext.showLoadingOverlay.set(false);
        if (response.success) {
          setSuccessSnacknarOpen(true);
          setEmployeeFormOpen(false);
        } else setFailedSnacknarOpen(true);
      })
      .catch((ex) => {
        setFailedSnacknarOpen(true);
        globalContext.showLoadingOverlay.set(false);
      });
  };

  const handleEmployeeUpdate = (formData) => {
    globalContext.showLoadingOverlay.set(true);
    API.updateEmployee(formData)
      .then((response) => {
        globalContext.showLoadingOverlay.set(false);
        if (response.success) {
          setSuccessSnacknarOpen(true);
          setEmployeeFormOpen(false);
        } else setFailedSnacknarOpen(true);
      })
      .catch((ex) => {
        setFailedSnacknarOpen(true);
        globalContext.showLoadingOverlay.set(false);
      });
  };

  const renderPageOptions = () => {
    return (
      <Accordion elevation={4}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Page Options</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container justify="center">
            <Grid item>
              <FormControl>
                <FormLabel focused={false}>View</FormLabel>
                <RadioGroup
                  value={viewType}
                  onChange={(event) => setViewType(event.target.value)}
                  row
                >
                  <FormControlLabel
                    value={views.table}
                    control={<Radio color="primary" />}
                    label="Table View"
                  />
                  <FormControlLabel
                    value={views.cards}
                    control={<Radio color="primary" />}
                    label="Cards View"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  };

  const renderCardsView = () => {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {allEmployees.map((emp) => (
              <Grid item xs={12} sm={4} md={3}>
                <EmployeeCard
                  employee={emp}
                  onEdit={() => {
                    setEmployeeToEdit(emp);
                    setEditMode(true);
                  }}
                  onDelete={() => {
                    setEmployeeToDeleteId(emp.login.uuid);
                    setDeleteModalOpen(true);
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        {loadingEmployees && (
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {Array(employeesPerPage)
                .fill("")
                .map((el) => (
                  <Grid item xs={12} sm={4} md={3}>
                    <EmployeeCard isSkeleton={true} />
                  </Grid>
                ))}
            </Grid>
          </Grid>
        )}

        {!loadingEmployees && (
          <Grid
            container
            justify="center"
            className={classes.showMoreContainer}
          >
            <Button
              color="primary"
              onClick={() => {
                fetchEmployees();
              }}
            >
              Show More
            </Button>
          </Grid>
        )}
      </Grid>
    );
  };

  const rederTableView = () => {
    return (
      <CustomTable
        data={[]}
        dataMapper={[]}
        onShowMore={() => {
          alert("Show More Data");
        }}
        loading={true}
        pageSize={10}
      />
    );
  };

  return (
    <PagePaperContainer
      title={"Employee Dashboard"}
      addAction={() => {
        setEmployeeFormOpen(true);
      }}
    >
      <Container maxWidth="sm" className={classes.pageOptionsContainer}>
        {renderPageOptions()}
      </Container>
      <Container maxWidth="md">
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.employeesTitle}>
            Employees
          </Typography>
        </Grid>
        {viewType === views.table ? rederTableView() : renderCardsView()}
      </Container>

      <ConfirmationModal
        title="Are you sure you want to delete this employee?"
        open={deleteModalOpen}
        description="Deleting this employee will cause him to be logged of all registered devices."
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => deleteEmployee()}
        loading={isLoadingAction}
      />

      <Snackbar
        open={successSnacknarOpen}
        autoHideDuration={6000}
        onClose={() => setSuccessSnacknarOpen(false)}
      >
        <Alert severity="success" onClose={() => setSuccessSnacknarOpen(false)}>
          Successful Operation
        </Alert>
      </Snackbar>

      <Snackbar
        open={failedSnacknarOpen}
        autoHideDuration={6000}
        onClose={() => setFailedSnacknarOpen(false)}
      >
        <Alert severity="error" onClose={() => setFailedSnacknarOpen(false)}>
          Operation Failed
        </Alert>
      </Snackbar>

      <EmployeeFormDialog
        onCreate={(formData) => handleEmployeeCreation(formData)}
        open={employeeFormOpen}
        isEditMode={isEditMode}
        employee={employeeToEdit}
        onClose={() => {
          setEmployeeFormOpen(false);
          setEditMode(false);
        }}
        onUpdate={(formData) => handleEmployeeUpdate(formData)}
      />
    </PagePaperContainer>
  );
}

export default EmployeeDashboard;
