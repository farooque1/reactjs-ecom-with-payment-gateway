import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

export default function Like() {
  const Likedata = useSelector((state) => state.ProductReducer);
  console.log(Likedata.favourite);

  // let amount = data.length && data.map(item => item.price).reduce((prev, next) => prev + next)
  // console.warn(amount)

  let amount2= Likedata.favourite.length && Likedata.favourite.map(i => i.price).reduce((a,b)=> a + b)
  console.log(amount2);

  return (
    <Container maxWidth="md" sx={{ marginTop: 12 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}>
                Like Product
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {Likedata.favourite.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography variant="body1" color="textSecondary">
                    No data found.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              Likedata.favourite.map((dd) => (
              <TableRow key={dd.id}>
                <TableCell>
                  <img src={dd.image} width="20%" />
                </TableCell>
                <TableCell>{dd.title}</TableCell>
                <TableCell>${dd.price}</TableCell>
                <TableCell>{dd.category}</TableCell>
              </TableRow>
            )))}
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
                            <TableCell align="right">{amount2 - (amount2 / 10)}</TableCell>
                        </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
