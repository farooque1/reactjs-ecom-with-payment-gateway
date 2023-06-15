import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { removetocart } from "../Redux/Action";


export default function Cart() {

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    // Check if the user is logged in by checking the stored user information
    const storedUser = localStorage.getItem('user');
    setIsLoggedIn(!!storedUser);
  }, []);

  const handlePayNow = () => {
    if (isLoggedIn) {
      // User is logged in, navigate to the PayNow component
      navigate('/paynow');
    } else {
      // User is not logged in, show a message or redirect to the login component
      navigate('/login');
    }
  };

  const Cartdata = useSelector((state) => state.ProductReducer);
  console.log(Cartdata.cart);

  const dispatch=useDispatch();

  const handleremove=(itemid)=>{
    dispatch(removetocart(itemid));
  }

  // let amount = data.length && data.map(item => item.price).reduce((prev, next) => prev + next)
  // console.warn(amount)

  let amount2 = Cartdata.cart.length && Cartdata.cart.map((i) => i.price).reduce((a, b) => a + b);
  console.log(amount2);

  return (
    <Container maxWidth="md" sx={{ marginTop: 11 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 600 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={4}>
                Cart Details
              </TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>category</TableCell>
              <TableCell>Remove </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Cartdata.cart.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography variant="body1" color="textSecondary">
                    No data found.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              Cartdata.cart.map((dd) => (
                <TableRow key={dd.id} Align="center">
                  <TableCell>
                    <img src={dd.image} width="20%" />
                  </TableCell>
                  <TableCell>{dd.title}</TableCell>
                  <TableCell>${dd.price}</TableCell>
                  <TableCell>{dd.category}</TableCell>
                  <TableCell> <HighlightOffIcon onClick={()=>handleremove(dd.id)} /></TableCell>
                </TableRow>
              ))
            )}

                <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">{amount2}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Discount</TableCell>
              <TableCell align="right"> 10 % </TableCell>
              <TableCell align="right">{(amount2 / 10).toFixed(0)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total Price </TableCell>
              <TableCell align="right">{parseInt(amount2 - amount2 / 10)}</TableCell>
            </TableRow>
            <TableRow>
            <TableCell rowSpan={3} />
            <TableCell align="center">
            <Button variant="contained" sx={{width:150}} onClick={handlePayNow}> Checkout</Button>
            </TableCell>              
            {/* <TableCell align="right">
            <Button variant="contained" sx={{width:180}}> Save Data </Button>
            </TableCell> */}
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
