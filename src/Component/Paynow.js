import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import GooglePayButton from "@google-pay/button-react";
import useRazorpay from "react-razorpay";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Container,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removetocart } from "../Redux/Action";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import axios from "axios";
import RazorpayCheckout from "./RazorpayCheckout";

export default function Paynow(props) {
  const [address, setAddress] = React.useState(null);
  const data = useSelector((state) => state.ProductReducer);
  console.log(data.cart);
  const history = useNavigate();
  const dispatch = useDispatch();
  const handleRemove = (itemId) => {
    dispatch(removetocart(itemId));
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3002/formdata");
        const data = response.data;
        if (data && data.length > 0) {
          const lastData = data[data.length - 1];
          console.log(lastData);
          setAddress(lastData);
          const lastId = lastData.id;
          console.log("ID", lastId);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  let amount2 =
    data.cart.length &&
    data.cart.map((item) => item.price).reduce((a, b) => a + b);
  console.log(amount2);

  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user);
  const addressx=user.address;
  console.log(addressx);


  const Razorpay = useRazorpay();

  const handlePayment = React.useCallback(() => {
    const order = 12;
    const RazorpayOptions = {
      key: "rzp_test_eJlbNbyzsoPfXF",
      amount: parseInt(amount2 - amount2 / 10) * 100,
      currency: "INR",
      name: "demo Name",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id,
      handler: (res) => {
        console.log(res);
        history("/confirm");
        // window.location.href = '/confirm';
      },
      prefill: {
        name: "demo Name",
        email: "demo@gmail.com",
        contact: "xyz address",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzpay = new Razorpay(RazorpayOptions);
    rzpay.open();
  }, [Razorpay]);

  return (
    <Container maxWidth="md">
      <Box sx={{ flexGrow: 1, marginTop: 10 }}>
        <Grid container>
          <Grid item xs={12} sm={8}>
            <Container maxWidth="md" sx={{ marginTop: 3 }}>
              <Typography variant="h6" gutterBottom>
                Product List
              </Typography>

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 400 }} aria-label="spanning table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Remove</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.cart.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} align="center">
                          <Typography variant="body1" color="textSecondary">
                            No data found.
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      data.cart.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <img src={item.image} width="10%" alt="Product" />
                          </TableCell>
                          <TableCell>${item.price}</TableCell>
                          <TableCell>
                            {" "}
                            <HighlightOffIcon
                              onClick={() => handleRemove(item.id)}
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                    <TableRow>
                      <TableCell colSpan={1}>Total Price </TableCell>
                      <TableCell>{parseInt(amount2 - amount2 / 10)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Container>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ marginTop: 3 }} align="center">
            <Typography variant="h6" gutterBottom>
              Shipping Address
            </Typography>

            <Card sx={{ maxWidth: 345, marginBottom: 3 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Home Address
                </Typography>
                {addressx ? (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    key={addressx.id}
                  >
                    {addressx.street} ,{addressx.number} ,{addressx.city} ,
                    {addressx.zipcode}
                  </Typography>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No address found.
                  </Typography>
                )}
              </CardContent>
            </Card>
            <Typography variant="h6" gutterBottom>
              Choose Payment Options
            </Typography>

            <Button
              variant="contained"
              sx={{ width: 220, marginBottom: 2 }}
              onClick={handlePayment}
            >
              Razor pay
            </Button>

            <Link to="/confirm">
              <Button variant="contained" sx={{ width: 220 }}>
                COD
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
