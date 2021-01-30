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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "relative",
    margin: "auto",
    width: "100%",
    marginTop: theme.spacing(2),
  },
	menu: {
		minHeight: 650,
		margin: "auto",
	},
  input: {
    width: "50%",
    flexGrow: 1,
    marginTop: theme.spacing(3),
		position: "relative",
		left: theme.spacing(-10),
  },
  button: {
    width: "10%",
    marginTop: theme.spacing(3),
		display: "inline-block",
		position: "relative",
		bottom: theme.spacing(5),
  },
  description: {
    borderRadius: 10,
    marginTop: theme.spacing(3),
    width: "50%",
		position: "relative",
		left: theme.spacing(-6),
    "& :focus": {
      borderRadius: 10,
      border: "1px solid blue",
    },
  },
  clearAllBtn: {
    display: "inline-block",
		marginBottom: 20,
		marginTop: 100,
  },
}));

export default function Body(props) {
  const classes = useStyles();
  const [item, setItem] = React.useState({
    name: "",
    description: "",
    isIgnored: false, 
  });

  const [items, setItems] = React.useState([]);

  const AddItem = () => {
    if (item) {
      setItems((prevValue) => {
        return [...prevValue, item];
      });
    }
    setItem({ name: "", description: "", isIgnored: false });
  };

	const toggleIgnoreItem = (id) => {
		setItems(prevItems => {
			prevItems[id].isIgnored	= !prevItems[id].isIgnored;
			return prevItems;
		});		
	}

  const deleteItem = (id) => {
    setItems((prevItems) => {
      return prevItems.filter((item, index) => index != id);
    });
		
  };


	const clearAllItem = () => {
		setItems([]);
	};

  return (
    <div className={classes.root}>

				<Grid container spacing={2}>
     		<Grid style={{margin: "auto"}} item xs="12" sm="6" lg="4">

     	<Paper className={classes.menu}> 
					<Typography variant="h5" color="inherit" >TO-DO LIST</Typography>
          <Input
            className={classes.input}
            onChange={(e) =>
              setItem((prevValue) => ({ ...prevValue, name: e.target.value }))
            }
            value={item.name}
            placeholder="Input item"
          ></Input>
          <TextareaAutosize
            aria-label="minimum height"
            rowsMin={4}
            className={classes.description}
            onChange={(e) =>
              setItem((prevValue) => ({
                ...prevValue,
                description: e.target.value,
              }))
            }
            placeholder="Description"
            value={item.description}
          />
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={AddItem}
          >
            Add
          </Button>

          <div>
            {items.map((item, index) => (
              <Item
                key={index}
                id={index}
                name={item.name}
                description={item.description}
								isIgnored={item.isIgnored}
								onIgnore={toggleIgnoreItem}
                onDelete={deleteItem}
              ></Item>
            ))}
          </div>
					{items.length > 0 && 
          <div className={classes.clearBtn}>
            <Button
              className={classes.clearAllBtn}
              variant="outlined"
              color="inherit"
							onClick={clearAllItem}
            >
              Clear All
            </Button>
          </div>
					}

		</Paper>
		</Grid>
      </Grid>
    </div>
  );
}
