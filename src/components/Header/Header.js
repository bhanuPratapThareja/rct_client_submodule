import classes from './Header.module.css'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigation, useNavigate, createSearchParams } from 'react-router-dom';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, MenuItem, LinearProgress } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { userActions } from '../../store/slices/userSlice'
import { removeUserLogoutLocal } from '../../utils/auth';

const pages = ['Home', 'Albums', 'Posts', 'PostsLoader', 'Cars'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Header() {
    const navigation = useNavigation()
    const navigate = useNavigate()
    const linearProgress = <LinearProgress color="secondary" />
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { isLoggedIn } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = action => {
        setAnchorElUser(null);
        setTimeout(() => {
            if (action && action.toLowerCase() === 'logout') {
                // navigate('/auth', { state: { mode: 'login' }})
                const path = {
                    pathname: '/auth',

                    search: createSearchParams({ mode: 'login' }).toString()
                }
                const params = {
                    state: { mode: 'login' }
                }
                dispatch(userActions.logoutUser())
                removeUserLogoutLocal()
                navigate(path, params)
            }
        }, 0);
    };

    return (
        <AppBar>
            <Container maxWidth="xl">
                <Toolbar disableGutters>

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
                        LOGO
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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

                    {isLoggedIn && <><Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', alignItems: 'center' } }}>
                        {pages.map((page) => (
                            <NavLink key={page} to={`${page.toLowerCase()}`} className={classes.navlinks}>
                                {page}
                            </NavLink>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }} style={{ position: 'absolute', right: 0 }}>
                        <Tooltip title="Open settings" sx={{ p: 0 }}>
                            <IconButton onClick={handleOpenUserMenu} >
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                            onClose={() => handleCloseUserMenu()}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box></>}
                </Toolbar>
            </Container>
            {navigation.state === 'loading' && linearProgress}
        </AppBar>
    )
}
export default Header