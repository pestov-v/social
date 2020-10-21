import React from 'react'
import { Badge } from '@material-ui/core'
import { makeStyles, withStyles, createStyles, Theme } from '@material-ui/core/styles'
import {FavoriteTwoTone} from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        like: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(3)
        }
    })
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
    numLikes: number
}

const LikeWithBadge: React.FC<TProps> = ({ numLikes }) => {
    const classes = useStyles()
    return (
        <StyledBadge badgeContent={numLikes} color="primary" className={classes.like}>
            <FavoriteTwoTone style={{color: 'red'}} />
        </StyledBadge>
    )
}

export default LikeWithBadge
