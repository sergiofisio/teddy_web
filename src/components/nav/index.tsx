// src/components/nav/index.tsx
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Drawer,
  List,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import sidebarIcon from "../../assets/icon/menu.svg";
import logo from "../../assets/Logo.svg";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { name: "Clientes" },
  { name: "Clientes selecionados" },
  { name: "Sair" },
];

export default function NavBar({
  selection,
  setSelection,
  setSidebar,
}: {
  selection: string;
  setSelection: any;
  setSidebar: any;
}) {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  function handleMenuClick(name: string) {
    if (name === "Sair") handleLogout();
    else setSelection(name);
    toggleDrawer(false);
  }

  function handleLogout() {
    localStorage.removeItem("nome");
    navigate("/login");
  }

  return (
    <AppBar position="static" color="default">
      <Toolbar className="!flex !justify-between !items-center">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => setSidebar(true)}
        >
          <img src={sidebarIcon} alt="sidebar" style={{ width: "24px" }} />
        </IconButton>

        <img
          src={logo}
          alt="logo"
          style={{ height: "40px", marginLeft: "8px" }}
        />

        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
          }}
        >
          {menuItems.map(({ name }, key) => (
            <Typography
              key={key}
              variant="h6"
              component="div"
              sx={{
                marginRight: 2,
                cursor: "pointer",
                color: selection === name ? "#EC6724" : "black",
                "&:hover": { color: "#EC6724" },
              }}
              onClick={() =>
                name !== "Sair" ? setSelection(name) : handleLogout()
              }
            >
              {name}
            </Typography>
          ))}
        </Box>

        <Typography sx={{ display: { xs: "none", md: "block" } }}>
          Olá, <strong>{localStorage.getItem("nome")}</strong>
        </Typography>

        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          sx={{ display: { md: "none" } }}
          onClick={() => toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
      >
        <List className="!flex !flex-col !items-center !justify-evenly !h-full !p-4">
          {menuItems.map(({ name }, key) => (
            <h1
              className="!text-3xl"
              key={key}
              onClick={() => {
                name !== "Sair" ? handleMenuClick(name) : handleLogout();
              }}
            >
              {name}
            </h1>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
}
