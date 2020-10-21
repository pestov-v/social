import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { CircularProgress } from '@material-ui/core'
import { ResultCode } from '../../types/resultCodes'
import {
    dialogs as dialogsSelector,
    selectedDialog as selectedDialogSelector,
    loadingDialogs as loadingDialogsSelector,
    messages as messagesSelector,
    loadingMessages as loadingMessagesSelector,
} from '../../redux/selectors/dialogsSelectors'
import { isAuthSelector } from '../../redux/selectors/authSelectors'

import { getDialogs, getMessages, sendMessage, setNextPage, unmount } from '../../redux/dialogsActions'

import Dialogs from './Dialogs'

const DialogsContainer:React.FC = () => {
    const dispatch = useDispatch()

    const isAuth = useSelector(isAuthSelector)
    const loadingDialogs = useSelector(loadingDialogsSelector)
    const selectedDialog = useSelector(selectedDialogSelector)
    const dialogs = useSelector(dialogsSelector)
    const messages = useSelector(messagesSelector)
    const loadingMessages = useSelector(loadingMessagesSelector)


    const getMessagesHandler = (id: number) => {
        dispatch(getMessages(id))
    }

    const sendMessageHandler = (value: string) => {
        if (selectedDialog) {
            dispatch(sendMessage(selectedDialog, value))
            return ResultCode.Success
        }
        return ResultCode.Error
    }

    const setNextPageHandler = () => {
        dispatch(setNextPage())
    }

    useEffect(() => {
        let isCancel = false
        if (!isCancel) {
            dispatch(getDialogs())
        }
        return () => { isCancel = true }
    }, [dispatch])
    
    useEffect( () => () => { dispatch(unmount()) }, [dispatch] )

    return (
        <>
            { !isAuth && <Redirect to='/' />}
            {
                loadingDialogs ? <CircularProgress size={120} /> :
                    <Dialogs
                        dialogs={dialogs}
                        messages={messages ? messages : []}
                        loadingMessages={loadingMessages}
                        sendHandler={sendMessageHandler}
                        getMessages={getMessagesHandler}
                        selectedDialog={selectedDialog}
                        setNextPage={setNextPageHandler}
                    />
            }
        </>
    )
}

export default DialogsContainer
