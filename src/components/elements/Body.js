import React from "react";
import Item from "./Item";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Typography from "@material-ui/core/Typography";
import { InputLabel } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "auto",
    width: "100%",
    marginTop: theme.spacing(2),
  },
  menu: {
    minHeight: 750,
  },
  input: {
    width: "60%",
    marginTop: theme.spacing(3),
    fontFamily: "Comic Sans MS",
    fontStyle: "Italic",
  },
  button: {
    width: "10%",
    marginTop: theme.spacing(3),
    display: "inline-block",
    marginLeft: theme.spacing(2),
    position: "relative",
    top: theme.spacing(2),
  },
  description: {
    marginTop: theme.spacing(3),
    width: "60%",
    fontFamily: "Comic Sans MS",
    fontStyle: "Italic",
  },
  clearAllBtn: {
    marginBottom: 20,
    marginTop: 100,
  },

  outputTitle: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
    textAlign: "left",
    position: "relative",
    left: theme.spacing(13),
    color: "green",
    fontStyle: "italic",
    fontFamily: "Comic Sans MS",
  },
}));

const defaultTodoItem = [
  {
    name: "Read React book",
    description: "Read Chapter 2,3",
    isIgnored: false,
  },
  {
    name: "Solve coding challenge",
    description: "solve 1 java and 1 javascript",
    isIgnored: false,
  },
  {
    name: "Design side project",
    description: "Design functionality of it",
    isIgnored: false,
  },
];

export default function Body(props) {
  const classes = useStyles();
  const [item, setItem] = React.useState({
    name: "",
    description: "",
    isIgnored: false,
  });
  const [errorInput, setErrorInput] = React.useState(false);

  const [items, setItems] = React.useState(defaultTodoItem);

  const onChangeInput = (e) => {
    let value = e.target.value;
    if (value.length > 50) {
      setErrorInput(true);
    } else {
      setErrorInput(false);
    }
    setItem((prevValue) => ({ ...prevValue, name: value }));
  };

  const AddItem = () => {
    if (item.name.length > 0 && item.name.length <= 50) {
      setItems((prevValue) => {
        return [...prevValue, item];
      });
      setItem({ name: "", description: "", isIgnored: false });
      setErrorInput(false);
    } else {
      alert("Input error, it should small than 50");
    }
  };

  const toggleCheckedItem = (id) => {
    setItems((prevItems) => {
      prevItems[id].isIgnored = !prevItems[id].isIgnored;
      return prevItems;
    });
  };

  const deleteItem = (id) => {
    setItems((prevItems) => {
      return prevItems.filter((item, index) => index != id);
    });
  };

  const clearDoneItem = () => {
    setItems((prevItems) => {
      return prevItems.filter((item) => item.isIgnored === false);
    });
  };

  const clearAllItem = () => {
    setItems([]);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid style={{ margin: "auto" }} item xs="12" sm="6" lg="4">
          <Paper className={classes.menu}>
            <Typography variant="h5" color="inherit">
              TO-DO LIST
            </Typography>
            <TextField
              id="standard-basic"
              label="Enter Item"
              error={errorInput ? true : false}
              className={classes.input}
              onChange={onChangeInput}
              value={item.name}
            />
            <TextField
              id="outlined-multiline-flexible"
              variant="outlined"
              label="Description"
              multiline
              className={classes.description}
              onChange={(e) =>
                setItem((prevValue) => ({
                  ...prevValue,
                  description: e.target.value,
                }))
              }
              value={item.description}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={AddItem}
            >
              Add
            </Button>

            <Typography
              className={classes.outputTitle}
              variant="h6"
              color="inherit"
            >
              List To-do
            </Typography>
            <div>
              {items.map((item, index) => (
                <Item
                  key={index}
                  id={index}
                  name={item.name}
                  description={item.description}
                  isIgnored={item.isIgnored}
                  onChecked={toggleCheckedItem}
                  onDelete={deleteItem}
                ></Item>
              ))}
            </div>

            {items.length > 0 && (
              <Button
                className={classes.clearAllBtn}
                variant="contained"
                color="secondary"
                onClick={clearAllItem}
              >
                Clear All
              </Button>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
