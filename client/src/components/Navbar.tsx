import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { Title: "Home", path: "/" },
    { Title: "Inbox", path: "/inbox" },
    { Title: "Contact", path: "#" },
  ];

  return (
    <>
      {/* Navbar */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: "whitesmoke",
          display: "flex",
          height: "50px",
          boxShadow: "0px 0px 8px 1em rgba(0, 0, 0, 0.2)",
        }}
      >
        <Toolbar>
          {/* Brand Name */}
          <img
            src="https://s3-alpha-sig.figma.com/img/e242/9461/578d3c32108676571a639f6b41c4a4fc?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ifaZqP6XTONNZfrJDxJWDOFYPqdw3XW98MSjmC7BKgNbjkShv2qiUSG2U46gf5mlj5ZDNa1VFxJO~~ScEsGFy9oN3L1kQQ4f8hwfqHuAcxWFNVSGA9lQJZ0fvMSAhm-o62xz6ooyY9VOhAaDr~0zUYAlf7-K4pSYu3keosEc23VYJ2PCTK1ViPz9SHPL9qvAUlu9-SWNcGLv4TK2GC4iY53qpkGI6asW0PbYn-sO6i4UH-2uzldgJ8kuBkXd7BPFHNtNoV3YiHoUNBXPXPxdyzkXi2ej-IiiQYFeOfQ2MHsDWbh29JaKn6fSsah4RN7ntN0uw2ZTW~Yk6niTRjFJdg__"
            alt="V Logistics"
            width={100}
            height={80}
            style={{ objectFit: "cover" }}
          />

          {/* Desktop Links */}
          <Box
            sx={{ display: { xs: "none", md: "block", marginLeft: "1rem" } }}
          >
            {navItems.map((item, index) => (
              <Button
                key={index}
                onClick={() => navigate(item.path)}
                sx={{ color: "black" }}
              >
                {item.Title}
              </Button>
            ))}
          </Box>

          {/* Mobile Menu Icon */}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        <Box sx={{ width: 250 }}>
          <List>
            {navItems.map((item: any) => (
              <ListItem component={Link} to={`/some-path/${item}`} key={item}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
