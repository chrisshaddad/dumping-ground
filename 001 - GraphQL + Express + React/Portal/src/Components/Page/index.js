import React, { Fragment, useContext } from "react";
import { Button } from "@material-ui/core";
import { GlobalContext } from "../../App";
import TopBar from "./TopBar";

function Page(props) {
  const globalContext = useContext(GlobalContext);

  return (
    <Fragment>
      <TopBar />
      My Page Component{" "}
      <Button
        color="primary"
        variant="contained"
        onClick={() => globalContext.globalTheme.set("dark")}
      >
        {globalContext.globalTheme.get}
      </Button>
    </Fragment>
  );
}

export default Page;
