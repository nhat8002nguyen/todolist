import React from "react";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    color: "inherit",
  },
}));

export default function Header(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <ToolBar className={classes.title}>
          <Link href="/normal" variant="h6" className={classes.title}>
            Normal
          </Link>
          <Link href="/work" variant="h6" className={classes.title}>
            Work
          </Link>
        </ToolBar>
      </AppBar>
    </div>
  );
}
