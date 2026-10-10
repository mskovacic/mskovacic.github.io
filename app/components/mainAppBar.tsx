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
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router";
import UserMenu from './userMenu';

const pages: { page: string, path: string }[] = [
  { page: 'Home', path: '/' },
  { page: 'Welcome', path: '/welcome' },
  { page: 'Other', path: '/other' }
];

export default function MainAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <img src="/android-chrome-192x192.png" alt="Logo" width={32} height={32} />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MSK PORTFOLIO
          </Typography>

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
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <Link key={page.page} to={page.path}>
                  <MenuItem key={page.page} onClick={handleCloseNavMenu}>
                    <Typography sx={{ textAlign: 'center' }}>{page.page}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: { xs: 1, sm: 2 },
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              minWidth: 0,
              fontFamily: 'monospace',
              fontWeight: 700,
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              letterSpacing: { xs: '.12rem', sm: '.2rem' },
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
              MSK
            </Box>
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
              MSK PORTFOLIO
            </Box>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link key={page.page} to={page.path}>
                <Button
                  key={page.page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.page}
                </Button>
              </Link>
            ))}
          </Box>
          <UserMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
