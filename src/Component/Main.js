import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Header from "./Header";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addtocart, favourite, setFilteredProducts } from "../Redux/Action";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Badge from "@mui/material/Badge";

const drawerWidth = 240;

function Main() {
  const [open, setOpen] = React.useState(false);
  const [data, setdata] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 6; // Number of items to display per page

  const dispatch = useDispatch();
  const handleAddToCart = (item) => {
    dispatch(addtocart(item));
  };

  const handlefavourite = (item) => {
    dispatch(favourite(item));
  };

  const selectedCategory = useSelector((state) => state.ProductReducer.category);

  const filteredProducts = useSelector((state) => state.ProductReducer.filteredProducts);

  const fetchProducts = () => {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      setdata(res.data);
      dispatch(setFilteredProducts(res.data)); // Update the filtered products initially with all products
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = data.filter((item) =>
      selectedCategory ? item.category === selectedCategory : true
    );
    dispatch(setFilteredProducts(filtered));
  }, [selectedCategory, data, dispatch]);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  // Calculate the start and end indices for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header handleDrawerToggle={handleDrawerToggle} />

      <Sidebar handleDrawerToggle={handleDrawerToggle} open={open} />

      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        <Toolbar />
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          mt={1}
          spacing={5}
        >
          {currentProducts.map((item) => (
            <Grid direction="column" item xs={12} md={4} key={item.id}>
              <Card sx={{ maxWidth: 380 }}>
                <CardMedia component="img" height="200" image={item.image} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={() => handleAddToCart(item)}>
                    <Badge color="error">
                      <LocalMallIcon fontSize="large" />
                    </Badge>
                  </Button>
                  <Button onClick={() => handlefavourite(item)}>
                    <Badge color="error">
                      <FavoriteBorderIcon fontSize="large" />
                    </Badge>
                  </Button>
                  Rs. {parseInt(item.price)}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <div className="justify-center">
          {currentPage > 1 && (
            <Button onClick={() => handlePageChange(currentPage - 1)}>
              Previous
            </Button>
          )}

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <Button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </Button>
            )
          )}

          {currentPage < totalPages && (
            <Button onClick={() => handlePageChange(currentPage + 1)}>
              Next
            </Button>
          )}
        </div>
      </Box>
    </Box>
  );
}

export default Main;
