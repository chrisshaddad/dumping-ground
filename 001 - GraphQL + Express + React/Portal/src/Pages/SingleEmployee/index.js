import React, { Fragment, useEffect, useContext } from "react"
import GlobalContext from "../../Contexts/GlobalContext"
import { Constants } from "../../Utils"

function SingleEmployee(){
    const globalContext = useContext(GlobalContext);
    useEffect(() => {
      if (globalContext.currentPage.get !== Constants.pageTags.SINGLE_EMPLOYEE_PAGE)
        globalContext.currentPage.set(Constants.pageTags.SINGLE_EMPLOYEE_PAGE);
    });
    return <Fragment>Single Employee</Fragment>
}

export default SingleEmployee