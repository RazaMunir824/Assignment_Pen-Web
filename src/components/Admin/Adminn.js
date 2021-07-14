import React , {useState , useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}


const useStyles = makeStyles({
  table: {
    minWidth: 500,
    maxWidth:"auto",
    alignItems:"center"
  },
});

export default function CustomizedTables() {
  const [values, setvalues] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    //console.log(value.items);
    
    fetch("http://localhost:5000/api/admin")
      .then(response => response.json())
      .then((res) => {
        setvalues(res);
        //console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
      <div style={{margin:"200px"}}>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Email</StyledTableCell>
            <StyledTableCell align="right">Result</StyledTableCell>
            <StyledTableCell align="right">Date & Time</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {values.map((row) => (
            <StyledTableRow key={row.name}>
              {/* <StyledTableCell component="th" scope="row">
                {row.email}
              </StyledTableCell> */}
              <StyledTableCell align="left">{row.email}</StyledTableCell>
              <StyledTableCell align="right">{row.result}</StyledTableCell>
              <StyledTableCell align="right">{row.created_at}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}