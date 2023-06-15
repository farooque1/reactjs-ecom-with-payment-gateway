import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, Checkbox, Container, FormControlLabel, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Checkout() {

  const [formData, setFormData] = React.useState({
    firstname: '',
    lastname: '',
    emailid: '',
    mobile: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    pincode: '',
    country: ''
});

const formhandleChange = (event) => {
  const { name, value } = event.target;
  setFormData({ ...formData, [name]: value });        
  console.log(formData);
}

const handleSubmit = (event) => {
  event.preventDefault();
  console.log(formData);

  return new Promise((resolve, reject) => {
    axios.post('http://localhost:3002/formdata', formData)
      .then((response) => {
        console.log(response.data);
        const lastId = response.data.id;
        console.log('Last ID:', lastId);
        resolve(); // Resolve the promise
      })
      .catch((error) => {
        console.error(error);
        reject(error); // Reject the promise with the error
      });
  });
};

const location=useNavigate();

const handlelocation = (event) => {
  event.preventDefault();
  handleSubmit(event)
    .then(() => {
      location('/paynow');
    })
    .catch((error) => {
      console.error(error);
      console.log('Something went wrong');
    });
};



  return (
    <Container maxWidth="md">
    <Box sx={{ flexGrow: 1,marginTop: 15 }}>
    <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstname"
            value={formData.firstname}
            onChange={formhandleChange}
            label="First name"
            fullWidth
            variant="standard"
            size='small'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastname"
            label="Last name"
            value={formData.lastname}
            onChange={formhandleChange}
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="email"
            name="emailid"
            label="Email ID"
            value={formData.emailid}
            onChange={formhandleChange}
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="mobile"
            name="mobile"
            label="Mobile No"
            value={formData.mobile}
            onChange={formhandleChange}
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            value={formData.address1}
            onChange={formhandleChange}
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="address2"
            name="address2"
            label="Address line 2"
            value={formData.address2}
            onChange={formhandleChange}
            fullWidth
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            value={formData.city}
            onChange={formhandleChange}
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            value={formData.state}
            onChange={formhandleChange}
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="pincode"
            label="Zip / Postal code"
            value={formData.pincode}
            onChange={formhandleChange}
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            value={formData.country}
            onChange={formhandleChange}
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <Button variant="contained" sx={{width:180}} type="submit" onClick={handlelocation}> Submit </Button>
        </Grid>
      </Grid>
      </form>
    </Box>
    </Container>
  );
}