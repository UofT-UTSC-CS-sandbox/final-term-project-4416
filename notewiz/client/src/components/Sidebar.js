import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";

import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";


import NoteAltIcon from '@mui/icons-material/NoteAlt';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { useNavigate } from "react-router-dom";

const drawerWidth = 180;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function Sidebar({ visable_hidden, modeStyle }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [mode, setMode] = React.useState("light");

  const setlightModel = ()=>{
    setMode("light");
  }
  const setdarkModel = ()=>{
    setMode("dark");
  }

  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={ {backgroundColor : mode === "light" ? '#f0f0f0' : '#495057'}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: "flex" }}>
              <Tooltip title="Navigation">
                <IconButton
                  size="large"
                  aria-label="Navigatioin"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={()=>{handleDrawerOpen();
                     visable_hidden(true);}}
                >
                  <MenuIcon sx={{fontSize: 40,color: mode === "light" ? '#333333' : "#E0E0E0"}}/>
                </IconButton>
              </Tooltip>
            </Box>
            <Typography
              sx={{
                mr: 2,
                display: "flex",
                flexGrow: 1,
                fontFamily: "Comic Sans MS, Comic Sans, cursive",
                fontWeight: 700,
                fontSize: 25,
                color: mode === "light" ? "black" : "#E0E0E0",
              }}
            >
              NoteWiz
            </Typography>

            { mode === "light" ?
            <Box sx={{ flexGrow: 0.1 }}>
              <Tooltip title="Light Mode">
              <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={()=>{setdarkModel(); modeStyle("dark");}}
                >
                  <LightModeIcon sx={{ fontSize: 40, color: mode === "light" ? "black" : "#E0E0E0"}}/>
                </IconButton>
                </Tooltip>
              </Box> :
              <Box sx={{ flexGrow: 0.1 }}>
                <Tooltip title="Dark Mode">
              <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={()=>{setlightModel(); modeStyle("light");}}
                >
                  <DarkModeIcon sx={{ fontSize: 40, color: mode === "light" ? "black" : "#E0E0E0"}}/>
                </IconButton>
                </Tooltip>
              </Box>
              }

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Profile">
              <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={()=>navigate('/Profile')}
                >
                  <RecentActorsIcon sx={{ fontSize: 40, color: mode === "light" ? "black" : "#E0E0E0"}}/>
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer variant="permanent" open={open} sx={{
        '& .MuiDrawer-paper': {
          backgroundColor: mode === "light" ? '#f0f0f0' : '#495057', // Change this to your desired background color
          color: mode === "light" ? "black" : "#E0E0E0", // Change this to your desired text color
        },
      }}>
        <DrawerHeader>
          <IconButton onClick={()=>{handleDrawerClose();
             visable_hidden(false);}}>
              <ChevronRightIcon sx={{ fontSize: 40, color: mode === "light" ? "black" : "#E0E0E0"}}/>
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>

            <ListItem disablePadding>
                <ListItemButton onClick={()=>navigate('/Note')}>
                    <ListItemIcon><NoteAltIcon sx={{ fontSize: 35, color: mode === "light" ? "black" : "#E0E0E0" }}/></ListItemIcon>
                    <ListItemText primary={'Notes'}/>
                </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
                <ListItemButton onClick={()=>navigate('/Flash')}>
                    <ListItemIcon><CreditCardOutlinedIcon sx={{ fontSize: 35, color: mode === "light" ? "black" : "#E0E0E0" }}/></ListItemIcon>
                    <ListItemText primary={'Flash Card'}/>
                </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
                <ListItemButton onClick={()=>navigate('/Mind')}>
                    <ListItemIcon><AccountTreeOutlinedIcon sx={{ fontSize: 35, color: mode === "light" ? "black" : "#E0E0E0" }}/></ListItemIcon>
                    <ListItemText primary={'Mind Map'}/>
                </ListItemButton>
            </ListItem>

        </List>
        <Divider />
        <List>
          
        <ListItem disablePadding>
                <ListItemButton onClick={()=>navigate('/browser')}>
                    <ListItemIcon><FileCopyOutlinedIcon sx={{ fontSize: 35, color: mode === "light" ? "black" : "#E0E0E0" }}/></ListItemIcon>
                    <ListItemText primary={'File'}/>
                </ListItemButton>
            </ListItem>

        </List>
      </Drawer>
    </Box>
  );
}
export default Sidebar;
