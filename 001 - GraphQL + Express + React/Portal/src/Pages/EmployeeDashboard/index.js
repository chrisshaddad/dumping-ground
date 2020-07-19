import React, { Fragment, useContext, useEffect, useState } from "react";
import GlobalContext from "../../Contexts/GlobalContext";
import { Constants, API } from "../../Utils";
import { PagePaperContainer, CustomTable } from "../../Components";
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
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EmployeeCard from "./EmployeeCard";

const views = {
  table: "table",
  cards: "cards",
};

const possibleJobPositions = [
  "Pogramming",
  "Administrative",
  "Secretary",
  "Senior Programmer",
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
  const [allEmployees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (globalContext.currentPage.get !== Constants.pageTags.EMPLOYEE_DASHBOARD)
      globalContext.currentPage.set(Constants.pageTags.EMPLOYEE_DASHBOARD);
  });

  useEffect(() => {
    if (allEmployees.length === 0) fetchEmployees();
  }, []);

  useEffect(() => {
    setCurrentPage(0);
  }, [viewType]);

  useEffect(() => {
    if (currentPage === 0) fetchEmployees();
  }, [currentPage]);

  const fetchEmployees = () => {
    setLoadingEmployees(true);
    if (!loadingEmployees)
      API.getEmployees(currentPage, employeesPerPage)
        .then((response) => {
          let employees = response.results;
          employees.forEach((emp) => {
            const jobPosition =
              possibleJobPositions[Math.floor(Math.random() * 4)];
            emp.jobPosition = jobPosition;
          });
          setCurrentPage(currentPage + 1);
          setLoadingEmployees(false);
          setEmployees([...allEmployees, ...employees]);
        })
        .catch((ex) => {
          //todo: add exception handling
          setLoadingEmployees(false);
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
                <EmployeeCard employee={emp} />
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
        alert("Should Open Add form");
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
    </PagePaperContainer>
  );
}

export default EmployeeDashboard;
