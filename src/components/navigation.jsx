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
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import ArchiveDiv from './archive';
import ReminderDiv from './reminder';
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase';



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

  const navigate = useNavigate()

  var iconMenu = [faLightbulb,faBell,faPencil,faFileArrowDown,faTrashCan]
  var RouteMenu = ["/notes","reminder","","archive","bin"]

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [searchText, setSearchText] = React.useState("")
  const [currentAvatarLetter, setCurrentAvatarLetter] = React.useState(null)
  const [currentUserName, setCurrentUserName] = React.useState("")
  const [currentUserEmail, setCurrentUserEmail] = React.useState(null)
  const [showUserProfile, setShowUserProfile] = React.useState(false)
  const [currentUserId, setCurrentUserId] = React.useState("")

  React.useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      setCurrentUserName(user.displayName)
      setCurrentAvatarLetter(user.displayName.split("")[0].toUpperCase())
      setCurrentUserEmail(user.email)
      setCurrentUserId(user.uid)
    })
  },[])

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(!open);
  };

  const handleSignout = async() =>{
      await signOut(auth).then(()=> navigate("/"))
      .catch((err)=>alert(err.message))
  }

  return (
    <Box sx={{ display: 'flex' }}>
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
            <div className='user-profile-div' onClick={()=>setShowUserProfile(!showUserProfile)}>
              <div className='user-profile'>
                <span>{currentAvatarLetter}</span>
              </div>
            </div>
        </div>
      </header>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
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
      <Box className='note-box' component="main" sx={{ flexGrow: 1, p: 3, zIndex: 0 }} style={{filter: showUserProfile? "blur(9px)" : "blur(0px)"}}>
        <DrawerHeader />
        <Routes>
          <Route path='' element={<NotesDiv searchText={searchText} currentUserId={currentUserId}/>}/>
          <Route path='bin' element={<BinDiv searchText={searchText} currentUserId={currentUserId}/>}/>
          <Route path='archive' element={<ArchiveDiv searchText={searchText} currentUserId={currentUserId}/>}/>
          <Route path='reminder' element={<ReminderDiv searchText={searchText} currentUserId={currentUserId}/>}/>
        </Routes>
      </Box>
      <div className='current-user-profile-div' style={{display: showUserProfile? "flex" : "none"}}>
          <div className='current-user-profile'>
            <span>
            <span style={{fontWeight:"bold"}}>User Name</span> : {currentUserName}
            </span>
            <span>
              <span style={{fontWeight:"bold"}}>Email ID</span> : {currentUserEmail}
            </span>
            {/* <span style={{fontWeight:"bold",cursor:"pointer"}}>Change Password</span> */}
            <span onClick={handleSignout} style={{fontWeight:"bold",cursor:"pointer"}}>Log Out</span>
          </div>
      </div>
    </Box>
  );
}