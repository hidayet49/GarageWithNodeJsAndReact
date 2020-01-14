import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {withRouter} from "react-router-dom"


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



function SignInForm(props) {
   
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const classes = useStyles();
  React.useEffect(()=>{
    const userInfoRow=localStorage.getItem('userInfo')
    if(userInfoRow){
      try {
        const userInfo= JSON.parse(userInfoRow)
        if(userInfo.role=='ADMIN'){
          props.history.push('/adminHome')
        }else{
          props.history.push('/clientHome')
        }
      } catch (error) {
        
      } 
    }
     
  })


  const handleSignIn=async ()=>{
    try{
        const response = await fetch("http://localhost:8000/api/all/login",{
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          method: 'POST',
          body: JSON.stringify({
            email:email,
            password:password,
          })
      })
      
        if(response.status!==200){
          const body = await response.text();
          alert(body);
        }else{
          
          const body = await response.json();
          localStorage.setItem("userInfo",JSON.stringify({token:body.token,role:body.role}))
          alert(body.message)
          if(body.role=='ADMIN'){
            props.history.push('/adminHome')
          }else{
            props.history.push('/clientHome')
          }
          
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
    if (name === "password") {
      setPassword(value);
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
            <Grid container direction="row" justify='space-around' className={classes.formItem}>
              <Grid>
                <Button variant="contained" color="primary" onClick={handleSignIn}>
                  Sign In
                </Button>
              </Grid>
              <Grid>
                <Button variant="contained" color="primary" href="/signUp"> 
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    </Grid>
  );
}
export default withRouter(SignInForm);
