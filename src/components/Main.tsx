import React, { lazy, Suspense } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import Login from './Login'
import Profile from './Profile/Profile'

const Dialogs = lazy(() => import('./Dialogs/DialogsContainer'))
const Users = lazy(() => import('./Users/UsersContainer'))


const Main: React.FC = () => {
    return (
        <Switch>
            <Route path='/profile/:id?' component={Profile} />
            <Route path='/messages' render={() => {
                    return <Suspense fallback={<div>Loading...</div>}>
                                <Dialogs />
                            </Suspense>
                    }
                }
            />
            <Route path='/users' render={() => {
                    return <Suspense fallback={<div>Loading...</div>}>
                                <Users />
                            </Suspense>
                    }
                }
            />
            
            <Route path='/login' component={Login}/>
            <Route path='/' exact component={Login} />
            <Redirect to='/' />
        </Switch>
    )
};

export default Main
