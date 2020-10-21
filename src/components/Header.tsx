import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles'
import { ExitToAppOutlined, LockOpen, ExpandMore, Menu as MenuIcon } from '@material-ui/icons'
import { AppBar, Toolbar, Typography, Button, Avatar, Menu, MenuItem, useMediaQuery } from '@material-ui/core'

import { isAuthSelector } from '../redux/selectors/authSelectors'
import { avatarOwnerSmall } from '../redux/selectors/profileSelectors'
import { logout } from '../redux/authActions'
import logoImg from '../assets/logo.png'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            '& a': {
                textDecoration: 'none',
                color: '#fff'
            },
        },
        toolbar: {
            justifyContent: 'space-between',
            '& .MuiButton-root': {
                minWidth: 0
            }
        },
        menuButton: {
            padding: 0,
            color: '#fff'
        },
        title: {
            flexGrow: 1
        },
        avatar: {
            width: 50,
            height: 55,
            marginTop: -5,
            marginRight: theme.spacing(1),
            '& .MuiButtonBase-root:hover': {
                backgroundColor: 'transparent'
            },
            '& .MuiButton-label': {
                display: 'flex',
                flexDirection: 'column'
            },
            '& svg': {
                marginTop: -7,
                fill: '#fff'
            },
        },
        menu: {
            top: 60
        },
        log: {
            textTransform: 'none',
            marginRight: theme.spacing(1)
        },
        login: {
            display: 'flex',
            alignItems: 'center',
            fontSize: '1.1rem'
        }
    }),
);

type TProps = {}

const Header: React.FC<TProps> = () => {
    const theme = useTheme()
    const isLaptop = useMediaQuery(theme.breakpoints.down('sm'))
    const classes = useStyles()
    const dispatch = useDispatch()
    const isAuth = useSelector(isAuthSelector)
    const avatar = useSelector(avatarOwnerSmall)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        dispatch(logout())
    }
    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar className={classes.toolbar}>
                {
                    isLaptop ?
                        <Button className={classes.menuButton}>
                            <MenuIcon fontSize='large' />
                        </Button> :
                        <img src={logoImg} alt='logo' width={70} height={70} style={{marginTop: 5}} />
                }
                {
                    isAuth ?
                        <>
                            <div className={classes.avatar}>
                                <Button disableRipple disableFocusRipple aria-controls="menu" aria-haspopup="true" onClick={handleClick}>
                                    {<Avatar variant='circle' src={avatar ? avatar : undefined} />}
                                    <ExpandMore />
                                </Button>
                                <Menu
                                    className={classes.menu}
                                    id="menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={() => {
                                            handleClose()
                                            handleLogout()
                                        }}
                                    >
                                        <ExitToAppOutlined />
                                        &nbsp;Logout
                                    </MenuItem>
                                </Menu>
                                    
                            </div>
                        </> :
                        <Button color="inherit">
                            <NavLink to='/login' className={classes.login}>
                                <span className={classes.log}>SignIn</span>
                                <LockOpen />
                            </NavLink>
                        </Button>
                }
            </Toolbar>
        </AppBar>
    )
};

export default Header;
