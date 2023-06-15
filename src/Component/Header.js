import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {useSelector} from 'react-redux';
import Badge from '@mui/material/Badge';
import { Link } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Header({ handleDrawerToggle }) {

  const value=useSelector((s)=>s.ProductReducer.cart);
  const like=useSelector((s)=>s.ProductReducer.favourite);
  console.log("length",value.length);
  console.log("length",like.length);


  return (
    <>
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon          
          sx={{
          display: { xs: "block", sm: "none" },
        }}/>
        </IconButton>
        
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        <Link to="/"> 
        My Shope
        </Link>
        </Typography>
        
        <IconButton color="inherit" aria-label="add to cart">
        <Link to="/cart">
        <Badge badgeContent={value.length} color="error">
        <ShoppingCartIcon />
        </Badge>
        </Link>
        </IconButton>
        <IconButton color="inherit" aria-label="favorite">
        <Link to="/favourite">
        <Badge badgeContent={like.length} color="error">
          <FavoriteIcon />
          </Badge>
        </Link>
        </IconButton>
        <IconButton color="inherit" aria-label="favorite">
        <Link to="/login">
        <Badge color="error">
        <AccountCircleIcon />
          </Badge>
        </Link>
        </IconButton>
      </Toolbar>
    </AppBar>
    </>
  );
}
export default Header;