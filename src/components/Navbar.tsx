import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import formatText from '../utils/formatText'
import { List, ListItem } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import { newMessages as newMessagesSelector } from '../redux/selectors/dialogsSelectors'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            width: '100%'
        },
        list: {
            paddingTop: theme.spacing(4),
            '& .MuiListItem-gutters': {
                paddingLeft: theme.spacing(4)
            },
        },
        link: {
            marginBottom: theme.spacing(2),
            textDecoration: 'none',
            color: '#fff',
            fontSize: '1.1rem',
            letterSpacing: 1,
        },
        activeLink: {
            color: 'yellow'
        },
        messageLabel: {
            display: 'flex',
            alignItems: 'center'
        },
        newMessagesNumber: {
            fontSize: '0.8rem'
        }
    }),
)


const template = [
    {id: 1, to: '/profile', label: 'profile'},
    {id: 2, to: '/messages', label: 'messages'},
    {id: 3, to: '/music', label: 'music'},
    {id: 4, to: '/users', label: 'users'},
]
const Navbar: React.FC = () => {
    const classes = useStyles()
    const newMessages = useSelector(newMessagesSelector)
    return (
        <nav>
            <List className={classes.list} aria-label="main-navbar">
                {
                    template.map(({to, label, id}) =>
                        <ListItem key={id}>
                            <NavLink
                                className={classes.link}
                                activeClassName={classes.activeLink}
                                to={to}
                            >
                                {
                                    label === 'messages'
                                        ?
                                            <span className={classes.messageLabel}>
                                                {formatText.firstLetterUpperCase(label)}&nbsp;
                                                {newMessages ? <span className={classes.newMessagesNumber}>{`+${newMessages}`}</span> : ''}
                                            </span>
                                        :
                                            <span>{formatText.firstLetterUpperCase(label)}</span>
                                }
                                
                            </NavLink>
                        </ListItem>
                    )
                }
            </List>
        </nav>
    )
};

export default Navbar