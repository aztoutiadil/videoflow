import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useTheme,
  useMediaQuery,
  Container,
  Stack,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  VideoLibrary as VideoIcon,
  Description as TranscriptIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  ExitToApp as LogoutIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export default function Navbar() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleLogout = () => {
    handleProfileMenuClose();
    logout();
    navigate('/');
  };

  const menuItems = token ? [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Videos', icon: <VideoIcon />, path: '/videos' },
    { text: 'Transcripts', icon: <TranscriptIcon />, path: '/transcripts' },
  ] : [];

  const drawer = (
    <Box sx={{ width: 250, pt: 2 }}>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => {
              navigate(item.path);
              handleDrawerToggle();
            }}
            sx={{
              bgcolor: location.pathname === item.path ? 'action.selected' : 'transparent',
              borderRadius: 2,
              mx: 1,
              mb: 1,
            }}
          >
            <ListItemIcon sx={{ color: location.pathname === item.path ? 'primary.main' : 'inherit' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
            <ChevronRightIcon sx={{ opacity: 0.5 }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: 'background.default',
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {isMobile && token && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <MotionBox
            component={Typography}
            variant="h6"
            whileHover={{ scale: 1.05 }}
            sx={{
              flexGrow: 1,
              cursor: 'pointer',
              fontWeight: 700,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              textFillColor: 'transparent',
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={() => navigate('/')}
          >
            <Box
              component="img"
              src="/logo.png"
              alt="VideoFlow"
              sx={{ height: 32, mr: 1 }}
            />
            VideoFlow
          </MotionBox>

          {!isMobile && (
            <Stack direction="row" spacing={3} alignItems="center" sx={{ mr: 4 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  onClick={() => navigate(item.path)}
                  startIcon={item.icon}
                  sx={{
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    bgcolor: location.pathname === item.path ? 'action.selected' : 'transparent',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Stack>
          )}

          {token ? (
            <>
              <IconButton onClick={handleProfileMenuOpen} sx={{ ml: 1 }}>
                <Avatar
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    width: 35,
                    height: 35,
                  }}
                >
                  {user?.name?.[0] || 'U'}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleProfileMenuClose}
                PaperProps={{
                  sx: {
                    mt: 1,
                    minWidth: 200,
                  },
                }}
              >
                <MenuItem onClick={() => { navigate('/profile'); handleProfileMenuClose(); }}>
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  Profile
                </MenuItem>
                <MenuItem onClick={() => { navigate('/settings'); handleProfileMenuClose(); }}>
                  <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                onClick={() => navigate('/login')}
                sx={{
                  borderRadius: '20px',
                  px: 3,
                }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate('/register')}
                sx={{
                  borderRadius: '20px',
                  px: 3,
                }}
              >
                Get Started
              </Button>
            </Stack>
          )}
        </Toolbar>
      </Container>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}
