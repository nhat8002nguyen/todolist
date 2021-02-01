import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(1),
    textAlign: "left",
    marginLeft: theme.spacing(10),
  },
  name: {
    display: "inline-block",
    margin: "auto 20px auto 20px",
    width: "40%",
  },
  expand: {
    display: "inline-block",
    margin: "auto 20px auto 20px",
  },
  description: {
    position: "relative",
    left: theme.spacing(4),
  },
}));

export default function Item({
  id,
  name,
  description,
  isIgnored,
  onIgnore,
  onDelete,
}) {
  const classes = useStyles();

  const [checked, setChecked] = React.useState(false);
  const [lineThrough, setLineThrough] = React.useState(false);
  const [expand, setExpanded] = React.useState(false);

  const handleCheckbox = (e) => {
    setLineThrough(!lineThrough);
    onIgnore(id);
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
      {lineThrough && (
        <DeleteIcon
          onClick={() => {
            onDelete(id);
            setLineThrough(false);
            setChecked(false);
          }}
        ></DeleteIcon>
      )}
      {expand && (
        <Typography variant="body1" className={classes.description}>
          Detail: {description}
        </Typography>
      )}
    </div>
  );
}
