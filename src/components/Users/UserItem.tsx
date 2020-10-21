import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Card, Avatar, Button } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import { setFollowing } from '../../redux/usersActions'
import { followingInProgress } from '../../redux/selectors/usersSelectors'

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        root: {
            display: 'flex',
            padding: theme.spacing(2),
            marginRight: theme.spacing(1),
            marginBottom: theme.spacing(2),
        },
        avatarWrap: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: 120,
            marginRight: theme.spacing(2),
            '& button': {
                padding: '2px 8px'
            }
        },
        avatar: {
            width: theme.spacing(10),
            height: theme.spacing(10),
            marginBottom: theme.spacing(2)
        },
        name: {
            fontSize: '1.2rem',
            fontWeight: 500,
            marginBotton: theme.spacing(2)
        },
        status: {
            fontSize: '0.9rem',
            marginBottom: theme.spacing(1)
        },
        info: {
            display: 'flex',
            flexDirection: 'column'
        }
    })
)

type TProps = {
    userId: number | null
    name: string | null
    status: string | null
    avatar: string | null
    uniqueUrlName: string | null
    followed: boolean
}

const UserItem:React.FC<TProps> = ({name, status, avatar, uniqueUrlName, followed, userId}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const following = useSelector(followingInProgress)
    const followHandler = (userId: number) => {
        dispatch(setFollowing(userId))
    }
    return (
        <Card className={classes.root} >
                <div className={classes.avatarWrap}>
                    <NavLink to={`/profile/${userId}`}>
                        <Avatar className={classes.avatar} src={avatar ? avatar : undefined} />

                    </NavLink>
                    <Button
                        variant='contained'
                        color='primary'
                        disabled={following.some(id => id === userId)}
                        onClick={() => {userId && followHandler(userId)}}
                    >
                        {followed ? 'unfollow' : 'follow'}
                    </Button>
                </div>
                <div className={classes.info}>
                    <span className={classes.status}>{userId}</span>
                    <span className={classes.status}>{status || 'No status'}</span>
                    <span className={classes.name}>{name || 'No name'}</span>
                    <span>{uniqueUrlName}</span>
                </div>
        </Card>
    )
}

export default UserItem