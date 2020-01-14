import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import ClientAppointment from "./ClientAppointment";
import NewAppointment from "./NewAppointment";
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
  generalMargin: {
    margin: theme.spacing(5)
  }
}));
function ClientHomePage(props) {
  const classes = useStyles();
  const [brands, setBrands] = React.useState([]);
  const [models, setModels] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState("");
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
  const getAppointments = async () => {
    const response = await fetch(
      "http://localhost:8000/api/authusers/getMyAppointments",
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token
        },
        method: "GET"
      }
    );
    console.log(response);
    
    const body = await response.json();
    if (response.status !== 200) {
      alert(body);
    } else {
      if (body) {
        setData(body);
      }
    }
  };
  const getBrands = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/authusers/autoBrands",
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": token
          },
          method: "GET",
          
        }
      );
      
      const body = await response.json();
      if (response.status !== 200) {
        alert(body);
      } else {
        if (body) {
          setBrands(body);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
      if(token){
        getAppointments();
        getBrands();
      }
      
  }, [token]);

  const sendAppointment = async (brand, model, problem, urgent) => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/authusers/newAppointment",
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token":token
          },
          method: "POST",
          body: JSON.stringify({
            brand: brand,
            model: model,
            problem: problem,
            urgent: urgent
          })
        }
      );
      const body = await response.text();
      if (response.status !== 200) {
        alert(body);
      } else {
        alert(body);
        window.location.reload()
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleApprove = async id => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/authusers/approveAppointment?id=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": token
          },
          method: "PATCH"
        }
      );
      const body = await response.text();
      if (response.status !== 200) {
        alert(body);
      } else {
        alert(body);
        window.location.reload()
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async name => {
    console.log(name);
  };
  const create = () => {
    setOpen(true);
  };
  const handleCreate = (brand, model, problem, urgent) => {
    setOpen(false);
    sendAppointment(brand, model, problem, urgent);
  };
  const handleModel = async model => {
    console.log("getmodels");
    setModels(models => models.push(...["E#00", "C200"]));
  };

  const handleClose = value => {
    setOpen(false);
  };

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
      direction="column"
      className={classes.generalMargin}
    >
      <Grid xs={12}>
        <Grid style={{margin:20}}>
          <Button variant="contained" color="primary" onClick={create}>
            Create
          </Button>
        </Grid>
        <Grid style={{margin:20}}>
          <h1> MY APPOINTMENTS</h1>
        </Grid>
        {brands.length>0?(
          <Grid>
          <NewAppointment
            brands={brands}
            models={models}
            open={open}
            onClose={handleClose}
            onCreate={handleCreate}
            getModels={handleModel}
          />
        </Grid>):(
        null
        )}
        
      </Grid>
      <Grid>
        <ClientAppointment
          onApprove={handleApprove}
          onDelete={handleDelete}
          info={data}
        />
      </Grid>
    </Grid>
  );
}
export default ClientHomePage;
