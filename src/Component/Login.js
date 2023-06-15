import { Box, Button, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [LoginSuccess, setLoginSuccess] = useState('');
  const [data, setData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const history = useNavigate();

  const fetch = () => {
    axios.get('https://fakestoreapi.com/users')
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  };

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const user = JSON.parse(storedUser);
    
    if (user) {
      const loggedInUser = data.find((u) => u.username === user.username && u.password === user.password);
      setIsLoggedIn(!!loggedInUser);
    }
  }, [data]);

  const handleLogout = () => {
    // Clear the stored user information from local storage
    localStorage.removeItem('user');
    // Update the isLoggedIn state to false
    setIsLoggedIn(false);
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('https://fakestoreapi.com/users');
      const users = response.data;
      const user = users.find((user) => user.username === username && user.password === password);
      if (user) {
        // User is authenticated
        // Store the user information or token in local storage or state
        // Redirect to another page or display a success message
        history('/');
        setIsLoggedIn(true);
        localStorage.setItem('user', JSON.stringify(user));
        setLoginSuccess('Success Login');
        console.log("Success Login", user);
      } else {
        setErrorMessage('Invalid username or password');
        console.log("Error Login", errorMessage);
      }
    } catch (error) {
      console.error(error);
      // Display an error message or handle the error as needed
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      {isLoggedIn ? (
        <Box>
          <Typography variant="h6" gutterBottom sx={{ flexGrow: 1, marginTop: 15, textAlign: 'center' }}>
              Profile page
            </Typography>
            <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
          {/* Display the user's profile information */}
        </Box>
      ) : (
        <>
          <Box sx={{ flexGrow: 1, marginTop: 15, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Login
            </Typography>
            <form onSubmit={handleLogin}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    id="username"
                    name="firstname"
                    label="User Name"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    id="password"
                    name="lastname"
                    label="Password"
                    fullWidth
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    type="submit"
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
            {LoginSuccess && <p>{LoginSuccess}</p>}
            {errorMessage && <p>{errorMessage}</p>}
          </Box>
          <TableContainer component={Paper} sx={{ maxHeight: 210 }}>
            <Table sx={{ minWidth: 300, maxHeight: 100 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>User Name</TableCell>
                  <TableCell>Password</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data.map((d) => (
                    <TableRow key={d.id}>
                      <TableCell>{d.username}</TableCell>
                      <TableCell>{d.password}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Container>
  );
};

export default Login;
