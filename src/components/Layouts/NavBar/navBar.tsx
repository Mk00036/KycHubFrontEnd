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
           src="data:image/jpeg;base64,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"
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
          /
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
