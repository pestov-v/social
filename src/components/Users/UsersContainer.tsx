import React, { Component  } from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { TUsersActions } from '../../redux/usersActions'

import { TStore } from '../../redux/store'
import { TUser } from '../../types/users'
import { usersItems as usersItemsSelector, loading as loadingSelector } from '../../redux/selectors/usersSelectors'
import { initialization, unmount } from '../../redux/usersActions'

import Users from './Users'

type TProps = {
    loading: boolean
    usersItems: Array<TUser> | null
    initialization: () => void
    unmount: () => void
}
type TState = {
    users: Array<TUser>
}

class UsersContainer extends Component<TProps, TState> {
    state = {
        users: [] as Array<TUser>
    }
    componentDidMount() {
        if (!this.state.users.length) {
            this.props.initialization()
        }
    }
    componentDidUpdate(prevProps: TProps, prevState: TState) {
        if (prevProps.usersItems !== this.props.usersItems && this.props.usersItems?.length) {
            this.setState({users: this.props.usersItems})
        }
    }
    componentWillUnmount() {
        this.props.unmount()
    }

    render() {
        return (
            <Users loading={this.props.loading} users={this.state.users} />
        )
    }
    
}
const mstp = (state: TStore) => ({
    loading: loadingSelector(state),
    usersItems: usersItemsSelector(state)
})
const mdtp = (dispatch: ThunkDispatch<TStore, null, TUsersActions>) => ({
    initialization: () => dispatch(initialization()),
    unmount: () => dispatch(unmount())
})

export default connect(mstp, mdtp)(UsersContainer)