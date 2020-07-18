import React, { Fragment, useContext, useEffect, useState } from "react";
import GlobalContext from "../../Contexts/GlobalContext";
import { Constants } from "../../Utils";
import { PagePaperContainer, CustomTable } from "../../Components";
import {
  Container,
  AccordionDetails,
  Accordion,
  AccordionSummary,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid, Typography,
  FormControl, FormLabel,Checkbox
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const views = {
  table: "table",
  cards: "cards"
}

function EmployeeDashboard() {
  const globalContext = useContext(GlobalContext);
  useEffect(() => {
    if (globalContext.currentPage.get !== Constants.pageTags.EMPLOYEE_DASHBOARD)
      globalContext.currentPage.set(Constants.pageTags.EMPLOYEE_DASHBOARD);
  });

  const [viewType, setViewType] = useState("cards");

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
                <RadioGroup value={viewType} onChange={event => setViewType(event.target.value)}>
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

  const renderCardsView = () =>{
    return <Fragment>Cards View</Fragment>
  }

  const rederTableView = () => {
    return <CustomTable
      title={"Employees"}
      data={[]}
      dataMapper={[]}
      onShowMore={() => {
        alert("Show More Data")
      }}
      loading={true}
      pageSize={10}
    />
  }

  return (
    <PagePaperContainer title={"Employee Dashboard"} addAction={()=>{
      alert("Should Open Add form")
    }}>
      <Container maxWidth="sm">
        {renderPageOptions()}
      </Container>
      <Container maxWidth="md">
        {viewType === views.table ? rederTableView() : renderCardsView()}
      </Container>
    </PagePaperContainer>
  );
}

export default EmployeeDashboard;
