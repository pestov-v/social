import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Redirect } from 'react-router-dom'

import { CircularProgress } from '@material-ui/core'
import { TStore } from '../../redux/store'
import { ResultCode } from '../../types/resultCodes'
import { TDialogs, TMessages } from '../../types/dialogs'
import {
    root as dialogsRootSelector,
    dialogs as dialogsSelector,
    loadingDialogs as loadingDialogsSelector,
    messages as messagesSelector,
    loadingMessages as loadingMessagesSelector,
} from '../../redux/selectors/dialogsSelectors'
import { isAuthSelector } from '../../redux/selectors/authSelectors'

import { getDialogs, getMessages, sendMessage, setNextPage, TDialogsActions, unmount } from '../../redux/dialogsActions'
import { TDialogsState } from '../../redux/dialogsReducer'

import Dialogs from './Dialogs'

type TProps = {
    isAuth: boolean
    loadingDialogs: boolean
    dialogs: TDialogs
    dialogsRoot: TDialogsState
    loadingMessages: boolean
    messages?: TMessages

    setNextPage: () => void,
    getDialogs: () => void,
    getMessages: (id: number) => void,
    sendMessage: (dialog: number, value: string) => Promise<ResultCode>
    unmount: () => void
}

class DialogsContainer extends Component<TProps> {

    componentDidMount() {
        this.props.getDialogs()
    }
    componentWillUnmount() {
        this.props.unmount()
    }
    sendMessageHandler(value: string) {
        if (this.props.dialogsRoot.selectedDialog) {
            this.props.sendMessage(this.props.dialogsRoot.selectedDialog, value)
            return ResultCode.Success
        }
        return ResultCode.Error
    }
    render() {
        const {
            isAuth,
            loadingDialogs,
            dialogs, messages,
            loadingMessages,
            dialogsRoot,
            setNextPage,
            getMessages
        } = this.props
        return (
            <>
            { !isAuth && <Redirect to='/' />}
            {
                loadingDialogs ? <CircularProgress size={120} /> :
                    <Dialogs
                        dialogs={dialogs}
                        messages={messages ? messages : []}
                        loadingMessages={loadingMessages}
                        sendHandler={this.sendMessageHandler.bind(this)}
                        getMessages={getMessages}
                        selectedDialog={dialogsRoot.selectedDialog}
                        setNextPage={setNextPage}
                    />
            }
            </>
        )
    }   
}

const mstp = (state: TStore) => ({
    isAuth: isAuthSelector(state),
    loadingDialogs: loadingDialogsSelector(state),
    dialogs: dialogsSelector(state),
    dialogsRoot: dialogsRootSelector(state),
    loadingMessages: loadingMessagesSelector(state),
    messages: messagesSelector(state)
})
const mdtp = (dispatch: ThunkDispatch<TStore, null, TDialogsActions>) => ({
    setNextPage: () => dispatch(setNextPage()),
    getDialogs: () => dispatch(getDialogs()),
    getMessages: (id: number) => dispatch(getMessages(id)),
    sendMessage: (dialog: number, value: string) => dispatch(sendMessage(dialog, value)),
    unmount: () => dispatch(unmount())
})
export default connect(mstp, mdtp)(DialogsContainer)
