import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
  const classes = useStyles();

  const approve = async (id) => {
    props.onApprove(id);
  };
  const deleteItem = async (id) => {
    props.onDelete(id);
  };
  
  const data = props.info;

  return (
    data ? (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Model</TableCell>
            <TableCell>Problem</TableCell>
            <TableCell>Urgent</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Approved</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.brand}</TableCell>
            <TableCell>{item.model}</TableCell>
            <TableCell>{item.problem}</TableCell>
            <TableCell>{item.urgent ? "YES" : "NO"}</TableCell>
            <TableCell>{item.date}</TableCell>
            <TableCell>{item.hour}</TableCell>
            <TableCell>{item.approved?'YES':'NO'}</TableCell>
            <TableCell>
            <Button
              variant="contained"
              color="primary"
              onClick={(e) =>{approve(item._id)}
              }
            >
            Approve
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

  // if (data) {
  //   return data.map(item => {
  //     return (
  //       <Grid
  //           key={item._id.toString()}
  //         container
  //         justify="center"
  //         alignItems="center"
  //         style={{ minHeight: "100vh" }}
  //       >
  //       <div>
  //       <form className={classes.root} noValidate autoComplete="off">
  //         <Grid container direction="column">
  //         <div>
  //             <h1>The Appointments</h1>
  //             <p className={classes.subject}> Brand : {item.brand}</p>
  //             <p className={classes.subject}> Model : {item.model}</p>
  //             <p className={classes.subject}> Problem : {item.problem}</p>
  //             <p className={classes.subject}> Urgent : {item.urgent?'YES':'NO'}</p>
  //             <p className={classes.subject}> Approved : {item.approved?'YES':'NO'}</p>
  //             <p className={classes.subject}> Date : {item.date}</p>
  //             <p className={classes.subject}> Time : {item.hour}</p>
  //         </div>
            
  //           <Grid container direction="row" justify='space-around' className={classes.formItem}>
  //             <Grid>
  //               <Button variant="contained" color="primary" onClick={(e)=>approve(item._id)}>
  //                 Approve
  //               </Button>
  //             </Grid>
  //             <Grid>
  //               <Button variant="contained" color="primary" onClick={(e)=>deleteItem(item._id)}> 
  //                 Delete
  //               </Button>
  //             </Grid>
  //           </Grid>
  //         </Grid>
  //       </form>
  //     </div>
  //       </Grid>
  //     );
  //   });
  // }else{
  //     return null
  // }


export default withRouter(AdminAppointment);
