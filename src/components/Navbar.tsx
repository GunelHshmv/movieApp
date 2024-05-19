import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {  NavLink } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import logo from '../assets/Logo.png';

const pages = ['Home', 'Movies', 'Blog'];
interface NavbarProps {
  onFilterChange: (value: string) => void;
}

const NavbarComponent: React.FC<NavbarProps> = ({ onFilterChange }) => {

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [showSearchInput, setShowSearchInput] = React.useState(false);

    const [filter, setFilter] = React.useState<string>('');
  
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFilter(value);
      onFilterChange(value);
    };
  
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSearchIconClick = () => {
    setShowSearchInput(!showSearchInput);
  };

  return (
      <AppBar sx={{ bgcolor: 'rgba(15, 15, 15, 1)' ,padding:'0'}}  position="static" >
        <Container style={{padding:'0'}} maxWidth="xl">
          <Toolbar disableGutters sx={{ flexDirection: { xs: 'row-reverse', lg: 'row' }, justifyContent: { xs: 'space-between' } }}>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} >
              <img src={logo} alt='logo' />
            </Box>
            <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
              <Box
                sx={{
                  bgcolor: 'text.primary',
                  border: 3,
                  borderRadius: '6px',
                  borderColor: "#1A1A1A",
                  display: {
                    xs: 'none',
                    md: 'flex',
                    lg: 'flex'
                  },
                  my: 2,
                  color: 'white',
                  mx: 3,
                }}
              >
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 1,
                      color: 'white',
                      display: 'block',
                    }}
                  >
                    <NavLink
                      to={`/${page}`}
                      color='text-light'
                      style={({ isActive, isTransitioning }: { isActive: boolean; isTransitioning: boolean }) => ({
                        fontWeight: isActive ? "bold" : "",
                        backgroundColor: isActive ? "#1A1A1A" : undefined,
                        viewTransitionName: isTransitioning ? "slide" : "",
                        padding: '12px 24px',
                        borderRadius: '4px',
                        textDecoration: 'none',
                        textTransform: 'capitalize',
                        color: 'white'
                      })}
                    >
                      {page}
                    </NavLink>
                  </Button>
                ))}
              </Box>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <img src={logo} />
            </Box>
            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'none', lg: 'flex' }, }}>
            {showSearchInput && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mr: 2, }}>
              <input type="text" value={filter}
        onChange={handleFilterChange} style={{padding:'12px',borderRadius:'8px'}} placeholder="Search by Title..." />
            </Box>
          )}
              <Tooltip title="Open">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <SearchIcon style={{ color: '#fff' }} onClick={handleSearchIconClick} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Open">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mx: 2 }}>
                  <NotificationsIcon style={{ color: '#fff' }} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
              </Menu>
            </Box>
          </Toolbar>
          
        </Container>
      </AppBar>
  );
}
export default NavbarComponent;
