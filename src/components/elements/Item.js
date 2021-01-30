import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(4),
    textAlign: "left",
    marginLeft: theme.spacing(6),
  },
  name: {
    display: "inline-block",
    margin: "auto 20px auto 20px",
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

export default function Item({ id, name, description, onIgnore, onDelete }) {
  const classes = useStyles();

  const [ignored, setIgnored] = React.useState(false);
  const [expand, setExpanded] = React.useState(false);

  return (
    <div className={classes.root}>
      <StarBorderIcon onClick={() => {setIgnored(!ignored); onIgnore(id);}}></StarBorderIcon>
      <Typography
        style={ignored ? { textDecoration: "line-through" } : null}
        className={classes.name}
        variant="body1"
      >
        {name}
      </Typography>
      <ExpandMoreIcon
        className={classes.expand}
        onClick={() => setExpanded(!expand)}
      ></ExpandMoreIcon>
      {ignored && (
        <DeleteIcon
          onClick={() => {
            onDelete(id);
            setIgnored(false);
          }}
        ></DeleteIcon>
      )}
      {expand && (
        <Typography variant="body1" className={classes.description}>
          {description}
        </Typography>
      )}
    </div>
  );
}
