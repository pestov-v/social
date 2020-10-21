import React, { useRef, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { List, Grid, CircularProgress } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import { ResultCode } from '../../types/resultCodes'
import { TDialogs, TMessages } from '../../types/dialogs'

import { pageSize as pageSizeSelector } from '../../redux/selectors/dialogsSelectors'
import DialogItem from './DialogItem/DialogItem'
import Messages from './Messages/Messages'
import TextFieldWithButton from '../UI/TextFieldWithButton'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dialogsWrapper: {
            marginBottom: theme.spacing(2)
        },
        dialogs: {
            flexDirection: 'column',
            padding: 0,
            margin: 0,
            '& li': {
                margin: 0,
                padding: 0
            },
        },
        messages: {
            height: '62vh',
            overflow: 'auto',
        },
        input: {
            justifyContent: 'flex-end'
        }
    }),
)

type TProps = {
    dialogs: TDialogs
    loadingMessages: boolean
    messages: TMessages
    selectedDialog: number | null
    getMessages: (id: number) => void
    sendHandler: (value: string) => ResultCode
    setNextPage: () => void
}

const Dialogs: React.FC<TProps> = ({
            dialogs, selectedDialog, loadingMessages, messages, 
            sendHandler, getMessages, setNextPage
        }) => {
    const classes = useStyles()
    const loadingMessagesStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
    const pageSize = useSelector(pageSizeSelector)
    const listRef = useRef<HTMLDivElement>(null)
    const element = listRef?.current
    const scrollHandler = useCallback(() => {
        if (element && element.scrollTop === 0) {
            setNextPage()
        }
}, [element, setNextPage])
    useEffect(() => {
        if (element) {
            element.addEventListener('scroll', scrollHandler)
            if (!loadingMessages)
                element.scrollBy(0, typeof element.offsetHeight === 'number' ? element.offsetHeight : 0)
        }
        return () => {
            element && element.removeEventListener('scroll', scrollHandler)
        }
    }, [scrollHandler, element, loadingMessages, messages, pageSize])
    

    return (
        <Grid container>
            <Grid item container className={classes.dialogsWrapper}>
                <Grid item sm={4}>
                    <List className={classes.dialogs}>
                        {
                            dialogs.map(({id, userName, profile, photos:{small}, newMessagesCount}) =>
                                <DialogItem
                                    key={id}
                                    name={profile && profile.fullName ? profile.fullName : userName}
                                    avatar={small}
                                    onClick={() => getMessages(id) }
                                    newMessagesCount={newMessagesCount}
                                    selected={selectedDialog === id}
                                />)
                        }
                    </List>
                </Grid>
                <Grid item sm={8}
                    className={classes.messages}
                    style={loadingMessages ? loadingMessagesStyle : undefined}
                    ref={listRef}
                >
                    {
                        loadingMessages && messages && !messages.length ? <CircularProgress size={80} /> :
                        <Messages messages={messages} loading={loadingMessages} />
                    }
                </Grid>
            </Grid>
            {
                selectedDialog &&
                    <Grid item container className={classes.input}>
                        <TextFieldWithButton onClick={sendHandler} buttonName='send' />
                    </Grid>
            }
        </Grid>
    )
};

export default Dialogs;
