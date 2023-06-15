import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Typography, Slider } from "@mui/material";
import ManIcon from "@mui/icons-material/Man";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategory,
  setFilteredProducts,
  setPriceFilter,
} from "../Redux/Action";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Button from '@mui/material/Button';


const drawerWidth = 240;

const Sidebar = ({ handleDrawerToggle, open }) => {
  const [cat, setcat] = React.useState([]);
  const [star, setstar] = React.useState([]);
  const [price, setprice] = React.useState([]);
  const [priceRange, setPriceRange] = React.useState([0, 1000]);
  const [filter,setfilter]=React.useState([]);

  const selectedCategory = useSelector(
    (state) => state.ProductReducer.category
  );
  console.log("cat", selectedCategory);
  const dispatch = useDispatch();

  const handleCategoryClick = (category) => {
    if (category === "All Product") {
      dispatch(setCategory(null));
    } else {
      dispatch(setCategory(category));
    }
  };

  const handleFilterClick = () => {
    dispatch(setPriceFilter(priceRange[0], priceRange[1]));
    console.log(priceRange);
  };

  const handlePriceFilterChange = (event, newValue) => {
    setPriceRange(newValue);
    console.log(newValue);
  };

  React.useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      const categories = [...new Set(res.data.map((item) => item.category))];
      const star = [...new Set(res.data.map((item) => item.rating))];
      const price = [...new Set(res.data.map((item) => item.price))];
      console.log(categories);
      setprice(price);
      setstar(star);
      setcat(["All Product", ...categories]);
      dispatch(setFilteredProducts(res.data));
    });
  }, []);

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
          display: { xs: "none", sm: "block" },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {cat.map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => handleCategoryClick(text)}>
                  <ListItemIcon>
                    {index === 0 ? <InboxIcon /> : index % 2 === 0 ? <ElectricBoltIcon /> : <ManIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List sx={{ margin:2.8}}>
            <Typography variant="body1">
              Price Range:
            </Typography>
            <ListItem disablePadding>
              <Slider
                value={priceRange}
                onChange={handlePriceFilterChange}
                valueLabelDisplay="auto"
                min={0}
                max={1000}
              />
            </ListItem>
            <Button variant="contained" onClick={handleFilterClick}>Apply Filter</Button>
          </List>
        </Box>
      </Drawer>

      <Drawer
        variant="temporary"
        open={open}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {cat.map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => handleCategoryClick(text)}>
                  <ListItemIcon>
                    {index === 0 ? <InboxIcon /> : index % 2 === 0 ? <ElectricBoltIcon /> : <ManIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem disablePadding>
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                Price Range:
              </Typography>
              <Slider
                value={priceRange}
                onChange={handlePriceFilterChange}
                valueLabelDisplay="auto"
                min={0}
                max={1000}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleFilterClick}>
                <ListItemIcon>
                  <FavoriteBorderIcon />
                </ListItemIcon>
                <ListItemText primary="Apply Filter" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
