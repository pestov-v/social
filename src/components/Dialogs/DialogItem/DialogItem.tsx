import React from 'react'

import { ListItem, Avatar, Button, Badge } from '@material-ui/core'
import { makeStyles, createStyles, Theme, withStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            // cursor: 'pointer'
        },
        avatar: {
            width: theme.spacing(8),
            height: theme.spacing(8),
            marginRight: theme.spacing(1),
            boxSizing: 'border-box'
        },
        button: {
            textTransform: 'none'
        }
    }),
)

const StyledBadge = withStyles((theme: Theme) =>
    createStyles({
        badge: {
            right: -4,
            top: 4,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }),
)(Badge)


type TProps = {
    name: string
    avatar: string | null
    newMessagesCount: number
    selected: boolean
    onClick: () => void
}

const DialogItem: React.FC<TProps> = ({name, onClick, avatar, newMessagesCount, selected}) => {
    const classes = useStyles()
    return (
        <ListItem onClick={onClick} className={classes.root}>
            <Button className={classes.button}>
                <Avatar
                    className={classes.avatar}
                    alt='Avatar'
                    src={avatar ? avatar : undefined}
                    style={{border: selected ? '2px solid #0808f9' : 'none'}}
                />
                {
                    newMessagesCount ?
                        <StyledBadge badgeContent={newMessagesCount} color="secondary" max={100} >
                            <strong style={{color: selected ? '#0808f9' : '#000'}}>{name}</strong>
                        </StyledBadge> :
                        name 
                }
            </Button>
        </ListItem>
    )
};

export default DialogItem;
