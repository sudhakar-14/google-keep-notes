import * as React from 'react';
import './navigation.css';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { faBars,faRotateRight,faTableCells,faGear,faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb,faBell,faTrashCan,faPencil,faFileArrowDown  } from '@fortawesome/free-solid-svg-icons'
import NotesDiv from './notes';
import BinDiv from './bin';
import { Link, Route, Routes } from 'react-router-dom';
import ArchiveDiv from './archive';
import ReminderDiv from './reminder';



const drawerWidth = 300;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  // display:"flex",
  backgroundColor:"white",
  borderBottom:"1px solid rgba(0, 0, 0, 0.12)",
  padding:"0px",  
  // zIndex: theme.zIndex.drawer + 1,
  boxShadow:"none",
  alignItems:"stretch",
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width:"100%",
    // width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    zIndex:0,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function NavigationRoute() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [searchText, setSearchText] = React.useState("")

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(!open);
  };

  var iconMenu = [faLightbulb,faBell,faPencil,faFileArrowDown,faTrashCan]
  var RouteMenu = ["/","reminder","","archive","bin"]

  return (
    <Box sx={{ display: 'flex' }}>
      {/* <CssBaseline/> */}
      
       
      {/* <IconButton
      style={{backgroundColor:"red"}}
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            
          </IconButton> */}
      <AppBar position="fixed" open={open} style={{}}>
      <header>
        <div className='header-left'>
        <FontAwesomeIcon icon={faBars} onClick={handleDrawerOpen}/>
          <img src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png" alt=""/>
          <span>keep</span>
        </div>
        <div className='header-middle'>
          <span>
            <FontAwesomeIcon icon={faSearch}/>
          </span>
          <input type="text" name="" placeholder='Search' onChange={(e)=>setSearchText(e.target.value)}/> 
        </div>
        <div className='header-right'>
            <span>
              <FontAwesomeIcon icon={faRotateRight}/>
            </span>
            <span>
              <FontAwesomeIcon icon={faTableCells}/>
            </span>
            <span>
              <FontAwesomeIcon icon={faGear}/>
            </span>
        </div>
      </header>
      
      {/* <HeaderDiv/> */}
      {/* <MenuIcon  style={{zIndex:"999",backgroundColor:"red"}}/> */}
        {/* <Toolbar>

          <Typography variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography>
        </Toolbar> */}
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        {/* <Divider /> */}
        {/* <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
        {/* <Divider /> */}
        <List>
          {['Notes', 'Reminders', 'Edit labels', 'Archive', 'Bin'].map((text, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <Link to={RouteMenu[index]} className='drawer-menu-items'>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  color: 'black'
                  
                }}
                // faLightbulb,faBell,faTrashCan,faPencil,faFileArrowDown
              >
                <ListItemIcon
                style={{fontSize:"22px"}}
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  
                    <FontAwesomeIcon icon={iconMenu[index]}/>
                  
                  
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Routes>
          <Route path='/' element={<NotesDiv searchText={searchText} setSearchText={setSearchText}/>}/>
          <Route path='bin' element={<BinDiv/>}/>
          <Route path='archive' element={<ArchiveDiv/>}/>
          <Route path='reminder' element={<ReminderDiv/>}/>
        </Routes>
      </Box>
    </Box>
  );
}