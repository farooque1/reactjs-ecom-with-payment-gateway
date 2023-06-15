import { Button, Container, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearcart } from "../Redux/Action";
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import HomeIcon from '@mui/icons-material/Home';
import Invoice from "./Invoice";


function Confirm() {
  const dispatch = useDispatch();

  const removecart = () => {
    dispatch(clearcart());
  };

  const Recart = useSelector((state) => state.ProductReducer.cart);
  console.log("cart", Recart);

  return (
    <div>
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ marginTop: 25 }}>
          Congratulations, on your purchase. The order has been received and is
          being processed.
        </Typography>
        <Button variant="contained" sx={{ width: 220, marginTop: 3 ,marginRight:5}} color="success">
          <SimCardDownloadIcon /> <Invoice /> Download Invoice
        </Button>
        <Link to="/">
          <Button
            variant="contained"
            sx={{ width: 220, marginTop: 3 }}
            onClick={removecart}>
            <HomeIcon /> Continue Shopping
          </Button>
        </Link>
      </Container>
    </div>
  );
}

export default Confirm;
