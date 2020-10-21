import React from 'react'
import { useSelector } from 'react-redux'
import formatText from '../../../utils/formatText'

import { TMessages } from '../../../types/dialogs'
import { List } from '@material-ui/core'

import { userIdSelector } from '../../../redux/selectors/authSelectors'
import MessageItem from './MessageItem'

type TProps = {
    messages?: TMessages
    loading: boolean
}
const Messages: React.FC<TProps> = ({ messages = [], loading }) => {
    const ownerId = useSelector(userIdSelector)
    return (
        <List style={{flexGrow: 1}}>
            {
                messages.map(({ id, body, recipientId, addedAt, viewed }, index, arr) => {
                    let newDay = true                 
                    if (index > 0) {
                        newDay = (new Date(arr[index - 1].addedAt)).toLocaleString('en-GB', {day: '2-digit'}) <
                                    (new Date(arr[index].addedAt)).toLocaleString('en-GB', {day: '2-digit'})
                    }
                    return (
                        <MessageItem
                            key={id}
                            ownerId={ownerId as number}
                            recipientId={recipientId}
                            text={formatText.unshielding(body)}
                            addedAt={addedAt}
                            viewed={viewed}
                            newDay={newDay}
                    />)
                })
            }
        </List>
    )
}

export default Messages