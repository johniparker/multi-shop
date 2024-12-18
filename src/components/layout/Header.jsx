import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

const Header = ({ toggleNavbar }) => {
  const { user, logout } = useAuth();
  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleNavbar}
          sx={{ marginRight: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Welcome to the shop!
        </Typography>
        {user ? (
          <Button onClick={logout} color="black" variant="outlined">
            Logout
          </Button>
        ) : (
          <Button
            component={Link}
            to="/login"
            color="black"
            variant="outlined"
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
