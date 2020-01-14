import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {withRouter} from "react-router-dom";


const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
    
  },
  formItem:{
      margin:theme.spacing(1)
  }

}));



function SignUpForm(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const classes = useStyles();
  React.useEffect(()=>{
   
  })


  const handleSignUp=async ()=>{ 
    try{
        const response = await fetch("http://localhost:8000/api/all/register",{
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          method: 'POST',
          body: JSON.stringify({
            name:name,
            surname:surname,
            email:email,
            password:password,
            phone:phone
          })
      })
      const body = await response.text();
        if(response.status!==200){
          alert(body);
        }else{
          alert("You are successfully registered..")
          localStorage.setItem('userLoginInfo',{
            email:email,
            password:password
          });
          props.history.push("/signIn")
        }
    }catch(error){
      console.log(error)
    }
    
  }
  const handleInput = event => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "email") {
      setEmail(value);
    }
    else if (name === "password") {
      setPassword(value);
    }
    else if (name === "name") {
        setName(value);
    }
    else if (name === "surname") {
        setSurname(value);
    }
    else if (name === "phone") {
        setPhone(value);
    }
  };
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <div>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container direction="column">
          <div>
              <h1>The Appointments</h1>
              <p> Brand </p>
          </div>
          <TextField
              id="name"
              label="Name"
              name="name"
              variant="outlined"
              value={name}
              onChange={handleInput}
              className={classes.formItem}
            />
            <TextField
              id="surname"
              label="surname"
              name="surname"
              variant="outlined"
              value={surname}
              onChange={handleInput}
              className={classes.formItem}
            />
            <TextField
              id="email"
              label="Email"
              name="email"
              variant="outlined"
              value={email}
              onChange={handleInput}
              className={classes.formItem}
            />
            <TextField
              id="password"
              label="password"
              variant="outlined"
              name="password"
              value={password}
              onChange={handleInput}
              type="password"
              className={classes.formItem}
            />
            <TextField
              id="phone"
              label="phone"
              name="phone"
              variant="outlined"
              value={phone}
              onChange={handleInput}
              className={classes.formItem}
            />
            <Grid container direction="row" justify='space-around' className={classes.formItem}>
              <Grid>
                <Button variant="contained" color="primary" onClick={handleSignUp}>
                  Sign Up
                </Button>
              </Grid>
              <Grid>
                <Button variant="contained" color="primary" href="/signIn"> 
                  Sign In
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    </Grid>
  );
}

export default withRouter(SignUpForm)