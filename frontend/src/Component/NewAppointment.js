import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
  },
  formItem: {
    margin: theme.spacing(1)
  },
  subject: {
    fontSize: 12
  }
}));

function NewAppointment(props) {
  const { onClose, open, brands } = props;
  const [brand, setBrand] = React.useState();
  const [model, setModel] = React.useState();
  const [models,setModels] =React.useState([])
  const [problem, setProblem] = React.useState();
  const [urgent, setUrgent] = React.useState(false);
  const classes = useStyles();
  const [token, setToken] = React.useState();

  React.useEffect(() => {
    const userInfoRow = localStorage.getItem("userInfo");
    try {
      if (userInfoRow) {
        const userInfo = JSON.parse(userInfoRow);
        setToken(userInfo.token);
      }
    } catch (error) {
      console.log(error);
    }
  });
  const handleCreate = () => {
    props.onCreate(brand, model, problem, urgent);
  };
  const getAllModels=async(brand)=>{
    try {
        const response = await fetch(
            `http://localhost:8000/api/authusers/brandModels?brand=${brand}`,
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token":token
             },
            method: "GET"
          }
        );
        const body = await response.json();
        if (response.status !== 200) {
          alert(body);
        } else {
          if (body) {
              console.log(body);
              
            setModels([...models,...body.models])
          }
        }
      } catch (error) {
        console.log(error);
      }
  }
  const handleInput = (e) => {
        setProblem(e.target.value)
  };
  const handleClose = () => {
    props.onClose();
  };

  const handleChange = (event, index) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "brand") {
      setBrand(value);
      getAllModels(value)
      
    } else if (name === "model") { 
      setModel(value);
    } else if (name == "urgent") {
      setUrgent(prevState => !prevState);
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Maken an Appointment</DialogTitle>
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <div>
          <form className={classes.root} noValidate autoComplete="off">
            <Grid container direction="column">
              <FormControl>
                <InputLabel id="demo-simple-select-brand">
                  Brand
                </InputLabel>
                <Select
                  labelId="demo-simple-select-brnad"
                  id="demo-simple-select-disabled"
                  value={brand}
                  name="brand"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {brands.map(item => {
                    return <MenuItem value={item}>{item}</MenuItem>;
                  })}
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel id="demo-simple-select-model">
                  Model
                </InputLabel>
                <Select
                  labelId="demo-simple-select-models"
                  id="demo-simple-select-disabled"
                  value={model}
                  name="model"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {models
                    ? models.map(item => {
                        return <MenuItem value={item}>{item}</MenuItem>;
                      })
                    : null}
                </Select>
              </FormControl>
              <TextField
                id="problem"
                label="Problem"
                name="problem"
                variant="outlined"
                value={problem}
                onChange={handleInput}
                className={classes.formItem}
                multiline={true}
                rows="5"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    id="urgent"
                    checked={urgent}
                    onChange={handleChange}
                    name="urgent"
                    color="primary"
                  />
                }
                label="Urgent "
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreate}
              >
                Create
              </Button>
            </Grid>
          </form>
        </div>
      </Grid>
    </Dialog>
  );
}

export default NewAppointment;
