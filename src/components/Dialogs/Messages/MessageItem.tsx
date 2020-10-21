import React from 'react'
import { useSelector } from 'react-redux'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Avatar, ListItem } from '@material-ui/core'
import { DoneOutlineRounded } from '@material-ui/icons'

import format from '../../../utils/formatText'
import { dialogAvatar as dialogAvatarSelector } from '../../../redux/selectors/dialogsSelectors'
import { avatarOwnerSmall } from '../../../redux/selectors/profileSelectors'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            marginBottom: theme.spacing(1)
        },
        day: {
            justifyContent: 'center',
            fontSize: '0.8rem',
            opacity: 0.7
        },
        textWrapper: {
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(1),
            paddingBottom: 12,
            border: '1px solid #ccc',
            borderRadius: 5,
        },
        avatar: {
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
        text: {
            marginLeft: '0.5rem',
            marginRight: '0.5rem'
        },
        meta: {
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            bottom: -12
        },
        time: {
            fontSize: '0.6rem',
            marginRight: 5,
        }
    }),
)

type TProps = {
    ownerId: number
    recipientId: number
    text: string
    addedAt: string
    viewed: boolean
    newDay: boolean
}

const MessageItem: React.FC<TProps> = ({ text, addedAt, recipientId, ownerId, viewed, newDay}) => {
    const classes = useStyles()
    const dialogAvatar = useSelector(dialogAvatarSelector)
    const ownerAvatar = useSelector(avatarOwnerSmall)
    const recipient = recipientId === ownerId
    const timeZone = (new Date().getTimezoneOffset()) * -1
    const hours = +((new Date(addedAt)).getHours()) + timeZone / 60
    const minutes = (new Date(addedAt)).toLocaleString('en-GB', {minute: '2-digit'})
    return (
        <>
            {
                newDay &&
                    <ListItem className={classes.day}>
                        {(new Date(addedAt)).toLocaleString('en-GB', { day: '2-digit', month: 'long', year: 'numeric'})}
                    </ListItem>
            }
            <ListItem
                dense
                className={classes.root}
                style={{
                    justifyContent: !recipient ? 'flex-end' : 'flex-start',
                    paddingRight: !recipient ? 0 : 12,
                    paddingLeft: recipient ? 0 : 12,
                }}
            >
                <div className={classes.textWrapper} >
                    <Avatar src={ !recipient ?
                                    (ownerAvatar ? ownerAvatar : undefined ) :
                                    (dialogAvatar ? dialogAvatar : undefined) }
                        className={classes.avatar}
                        style={{order: !recipient ? 2 : 0}} 
                    />
                    <span className={classes.text}
                        style={{order: !recipient ? 1 : 0}} 
                    >{text}</span>
                    <span className={classes.meta}>
                        <span className={classes.time}>
                            { `${hours}:${format.twoDigit(minutes)}`}
                        </span>
                        {!recipient && <DoneOutlineRounded style={{fontSize: '0.8rem', color: viewed ? 'green' : 'red'}}/>}
                    </span>
                </div>
            </ListItem>
        </>
    )
}

export default MessageItem
