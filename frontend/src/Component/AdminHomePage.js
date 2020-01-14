import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import AdminAppointment from "./AdminAppointment";
import ClientAppointment from "./ClientAppointment";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
  },
  formItem: {
    margin: theme.spacing(1)
  }
}));

function AdminHomePage(props) {
  const classes = useStyles();
  const [data, setData] = React.useState("");
  const [checked, setChecked] = React.useState(false);
  const [unreadedData, setUnreadedData] = React.useState();
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
  async function fetchData() {
    try {
      const response = await fetch(
        "http://localhost:8000/api/admin/getAppointments",
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": token
          },
          method: "GET"
        }
      );
      const body = await response.json();
      if (response.status == 403){
        alert('You dont have authority to see the appointments')
      }else if (response.status !== 200) {
        alert(body);
      } else {
        if (body) {
          setData(body);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  React.useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  const handleRead = async id => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/admin/markAsReaded?id=${id}`,
        {
          credentials: "same-origin",
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
  const handleChange = () => {
    setChecked(checked=>!checked);
    const theUnread = data.filter(item => item.readed == false);
    console.log("unread:",theUnread);
    setUnreadedData([...theUnread]);
    console.log("real unread",unreadedData);
    console.log(checked);
    
    
    
  };
  const handleSetTime = async date => {
    try {
      console.log(date);
      
      const response = await fetch(
        "http://localhost:8000/api/admin/setDateTime",
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": token
          },

          method: "PATCH",
          body: JSON.stringify({
            id: date._id,
            date: date.date,
            hour: date.hour
          })
        }
      );
      const body = await response.text();
      if (response.status !== 200) {
        alert(body);
      } else {
        alert(body);
        const theIndex = data.findIndex(item => {
          return item._id == date._id;
        });
        data[theIndex].readed = true;
        setData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
    
      <Grid xs={12}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container direction="column">
            <Grid container direction="column">
              <div>
                <h1>The Appointments</h1>
              </div>
              {/* <FormControlLabel
                control={
                  <Checkbox
                    id="checkbox"
                    checked={checked}
                    onChange={handleChange}
                    value="checkedB"
                    color="primary"
                  />
                }
                label="Show Just Unreaded Appointments"
              /> */}
            </Grid>
          </Grid>
        </form>
     </Grid>
     <Grid>
       { (unreadedData && unreadedData.length > 0 || data && data.length > 0) &&
     <AdminAppointment
              onRead={handleRead}
              onDateTime={handleSetTime}
              info={checked ? unreadedData : data}
            />}
       </Grid>
    </Grid>
  );
}

export default withRouter(AdminHomePage);
