import React, { Fragment, useContext, useEffect } from "react"
import { GlobalContext } from "../../App";
import { Constants } from "../../Utils"

function EmployeeDashboard(){
    const globalContext = useContext(GlobalContext);
    useEffect(() => {
      if (globalContext.currentPage.get !== Constants.pageTags.EMPLOYEE_DASHBOARD)
        globalContext.currentPage.set(Constants.pageTags.EMPLOYEE_DASHBOARD);
    });

    return <Fragment>Employee Dashboard</Fragment>
}

export default EmployeeDashboard