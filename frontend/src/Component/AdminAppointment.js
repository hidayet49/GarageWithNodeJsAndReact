import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import { Table, TableHead, TableCell, TableRow, TableContainer, Paper, TableBody, Checkbox} from "@material-ui/core"

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

function AdminAppointment(props) {
  const data = props.info;
  const readedFilter=false
  const [myData,setMyData]= React.useState(data)
  
  const classes = useStyles();
  
  
  const setDateTime = async (index) => {
    props.onDateTime(myData[index]);
  };

  const handleInput = (event,index) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "date") {
      myData[index].date=value 
      setMyData(myData)
    } else if (name === "hour") {
      myData[index].hour=value
      setMyData(myData)
    }
  };
  const handleChange = (event, index) => {
    const currVal = myData[index].readed
    if(!currVal) {
      myData[index].readed = true
      setMyData(myData)
      props.onRead(myData[index]._id);
    }
  }
  
  return (
    myData ? (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Read</TableCell>
            <TableCell>No</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Model</TableCell>
            <TableCell>Problem</TableCell>
            <TableCell>Urgent</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Update</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {myData.map((item, index) => (
            <TableRow key={index}>
            <TableCell>
              <Checkbox
                checked={item.readed}
                onChange={e =>handleChange(e, index)}
                value="primary"
              />

              
            </TableCell>
            <TableCell>Appointment {index + 1}</TableCell>
            <TableCell>{item.brand}</TableCell>
            <TableCell>{item.model}</TableCell>
            <TableCell>{item.problem}</TableCell>
            <TableCell>{item.urgent ? "YES" : "NO"}</TableCell>
            <TableCell>
            <TextField
              id="date"
              label="Date"
              name="date"
              variant="outlined"
              value={item.date}
              onChange={(e)=>{handleInput(e,index)}}
              className={classes.formItem}
            />
              </TableCell>
            <TableCell>
            <TextField
              id="hour"
              label="Time"
              name="hour"
              variant="outlined"
              value={item.hour}
              onChange={(e)=>{handleInput(e,index)}}
              className={classes.formItem}
            />
            </TableCell>
            <TableCell>
            <Button
              variant="contained"
              color="primary"
              onClick={(e) =>{setDateTime(index)}
              }
            >
            Set Date
            </Button>
            </TableCell>
            </TableRow>
          ))

          }
          </TableBody>
        </Table>
    </TableContainer>
    ) : <div>No Data</div>)
}

export default withRouter(AdminAppointment);
