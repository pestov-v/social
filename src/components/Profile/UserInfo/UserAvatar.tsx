import React, { useState, useRef, useEffect } from 'react'
import './UserAvatar.css'
import { useSelector, useDispatch } from 'react-redux'

import { IconButton, Avatar, Tooltip } from '@material-ui/core'
import { Add, Check, Clear } from '@material-ui/icons'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import { avatarUserLarge } from '../../../redux/selectors/profileSelectors'
import { isOwner as isOwnerSelector } from '../../../redux/selectors/authSelectors'
import { setProfilePhoto } from '../../../redux/profileActions'

import { ReactComponent as DefaultAvatar } from '../../../assets/man.svg'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginRight: theme.spacing(2)
        },
        avatar: {
            display: 'inline-flex',
            width: 160,
            height: 160,
        },
        addButtonWrapTooltip: {
            position: 'relative',
            backgroundColor: '#fff',
            boxShadow: '1px 1px 2px 2px rgba(0, 0, 0, 0.4)',
            borderRadius: '50%'
        },
        addButton: {
            padding: 0,
            minWidth: 0,
        },
        input: {
            position: 'absolute',
            width: 1,
            height: 1,
            margin: -1,
            opacity: 0.001
        },
        editButtons: {
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-around',
            bottom: theme.spacing(6),
            '& button': {
                padding: 0,
                borderRadius: '50%',
                backgroundColor: '#fff',
                boxShadow: '1px 1px 2px 2px rgba(0, 0, 0, 0.4)',
            }
        },

    })
)

const UserAvatar:React.FC = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const avatar = useSelector(avatarUserLarge)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const isOwner = useSelector(isOwnerSelector)

    const [localAvatar, setLocalAvatar] = useState<string | null | undefined>(avatar ? avatar : undefined)
    const [loadedPhoto, setLoadedPhoto] = useState<File | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)
    // const [isSaved, setIsSaved] = useState(true)

    useEffect(() => {
        setLocalAvatar(avatar)
    }, [avatar])

    const changePhotoHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setLoadedPhoto(e.currentTarget && e?.currentTarget?.files && e?.currentTarget?.files[0])
        const photo = window.URL.createObjectURL(e.currentTarget && e.currentTarget?.files && e.currentTarget?.files[0])
        setLocalAvatar(photo)
        setIsLoaded(true)
        // setIsSaved(false)
    }
    const saveHandler = () => {
        if (loadedPhoto) {
            dispatch(setProfilePhoto(loadedPhoto))
            // setIsSaved(true)
            setIsLoaded(false)
        }
    }
    const cancelHandler = () => {
        avatar ? setLocalAvatar(avatar) : setLocalAvatar(undefined)
        setIsLoaded(false)
        // setIsSaved(true)
    }
        
    return (
        <div className={classes.root} >
            <div className={'avatarWrap'}>
                <Avatar
                    src={localAvatar ? localAvatar : undefined}
                    alt='Avatar'
                    className={`${classes.avatar} avatar`}
                    variant='rounded'
                >
                    <DefaultAvatar />
                </Avatar>
                {
                    isOwner &&
                        (
                            !isLoaded ?                            
                                <div className={'avatarAddButtonWrap'}>
                                    <Tooltip
                                        className={classes.addButtonWrapTooltip}
                                        title={localAvatar ? 'Change photo' : 'Add photo'}
                                        placement='top'
                                    >
                                        <div>
                                            <IconButton
                                                className={classes.addButton}
                                                onClick={() => inputRef && inputRef.current && inputRef.current.click()}>
                                                <Add />
                                            </IconButton>
                                            <input ref={inputRef} type='file' className={classes.input} onChange={changePhotoHandler} />
                                        </div>
                                    </Tooltip>
                                </div>
                                    :
                                <div className={classes.editButtons}>
                                    <Tooltip title='Save' onClick={saveHandler}>
                                        <IconButton><Check style={{color: '#0f0'}} /></IconButton>
                                    </Tooltip>
                                    <Tooltip title='Cancel' onClick={cancelHandler}>
                                        <IconButton><Clear style={{color: '#f00'}} /></IconButton>
                                    </Tooltip>
                                </div>
                        
                        )
                }
            </div>    
        </div>
    )
}

export default UserAvatar