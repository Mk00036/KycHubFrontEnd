import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [
  { label: "Dashboard", path: "/" },
  { label: "Management", path: "/risk-assessment" },
  { label: "", path: "/workflow-automation" },
];

const NavBar = (props: Props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileOpen(false); // Close drawer after navigation
  };

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Box sx={{ py: 2 }}>
        <img
          width="90"
          height="62"
          style={{ padding: "5px" }}
          // src="https://www.kychub.com/wp-content/uploads/2023/05/LOGO_White.svg"
          alt="Logo"
        />
      </Box>
      <Divider sx={{ borderColor: "#ffffff30" }} />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => handleNavigation(item.path)}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", width:"100%", maxWidth:"1680px" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: "#22284f" }}>
        <Toolbar>
          {/* Desktop Logo */}
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <img
              width="90"
              height="62"
              style={{ padding: "11px" }}
              // src="https://www.kychub.com/wp-content/uploads/2023/05/LOGO_White.svg"
              alt="Logo"
            />
          </Box>

          {/* Desktop Nav Items */}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                sx={{
                  color: "#fff",
                  textTransform: "none",
                  fontWeight: "bold",
                }}
                onClick={() => handleNavigation(item.path)}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Mobile Menu Icon on Right */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer on Right */}
      <Box component="nav">
        <Drawer
          anchor="right" // THIS LINE is added
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#22284f",
              color: "#fff",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default NavBar;
