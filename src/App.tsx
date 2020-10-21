import React, {useEffect} from 'react'
import './App.css'
import {BrowserRouter as Router, HashRouter} from 'react-router-dom'

import {Provider, useSelector, useDispatch} from 'react-redux'
import store from './redux/store'
import {initialization as initSelector} from './redux/selectors/appSelectors'
import {initialization as init} from './redux/appActions'

import {makeStyles, createStyles, Theme, useTheme} from '@material-ui/core/styles'
import {Container, Grid, CircularProgress, Hidden, useMediaQuery} from '@material-ui/core'

import Header from './components/Header'
import Navbar from './components/Navbar'
import Main from './components/Main'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minHeight: '100vh',
        },
        main: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(4),
            '& .mainContent': {
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 0,
                paddingBottom: 0,
                paddingRight: 0,
                flexDirection: 'column'
            }
        },
        navbar: {
            backgroundColor: theme.palette.primary.main,
            maxHeight: 600,
        }
    }),
)

function App() {
    const theme = useTheme()
    const isLaptop = useMediaQuery(theme.breakpoints.down('sm'))
    const classes = useStyles()
    const dispatch = useDispatch()
    const initialization = useSelector(initSelector)

    useEffect(() => {
        dispatch(init())
    }, [dispatch])

    return (
        <div className="App">
            <HashRouter>
                {
                    initialization ? <CircularProgress size={120} /> :
                    <Container className={classes.root}>
                        <Header/>
                        <Grid container className={classes.main}>
                            <Hidden smDown>
                                <Grid container sm={3} md={2} item
                                    className={classes.navbar}
                                    spacing={0}>
                                    <Navbar/>
                                </Grid>
                            </Hidden>
                            <Grid container sm={12} md={10} item
                                className={'mainContent'} spacing={0}
                                style={{ paddingLeft: isLaptop ? 0 : theme.spacing(2) }}
                            >
                                <Main/>
                            </Grid>
                        </Grid>
                    </Container>
                }

            </HashRouter>
        </div>
    );
}

const AppContainer = () => {
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    )
}

export default AppContainer
