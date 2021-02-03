import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(1),
    textAlign: "left",
    marginLeft: theme.spacing(8),
    borderBottom: "1px dashed red",
    width: "80%",
  },
  name: {
    display: "inline-block",
    margin: "auto 20px auto 20px",
    width: "60%",
  },
  expand: {
    display: "inline-block",
    margin: "auto 20px auto 20px",
    position: "relative",
    top: theme.spacing(1),
  },
  description: {
    position: "relative",
    left: theme.spacing(4),
  },
  delete: {
    position: "relative",
    top: theme.spacing(1),
  },
}));

export default function Item({ id, name, description, isIgnored, onChecked }) {
  const classes = useStyles();

  const [checked, setChecked] = React.useState(false);
  const [lineThrough, setLineThrough] = React.useState(false);
  const [expand, setExpanded] = React.useState(false);

  const handleCheckbox = (e) => {
    setLineThrough(!lineThrough);
    onChecked(id);
    setChecked(e.target.checked);
  };

  return (
    <div className={classes.root}>
      <Checkbox
        checked={checked}
        onChange={handleCheckbox}
        inputProps={{ "aria-lable": "primary checkbox" }}
      />
      <Typography
        style={lineThrough ? { textDecoration: "line-through" } : null}
        className={classes.name}
        variant="body1"
      >
        {name}
      </Typography>
      {description.length > 0 && (
        <ExpandMoreIcon
          className={classes.expand}
          onClick={() => setExpanded(!expand)}
        ></ExpandMoreIcon>
      )}
      {expand && (
        <Typography variant="body1" className={classes.description}>
          Detail: {description}
        </Typography>
      )}
    </div>
  );
}
