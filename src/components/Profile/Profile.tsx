import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom'

import { CircularProgress } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import { ResultCode } from '../../types/resultCodes'
import { postsSelector, loadingData } from '../../redux/selectors/profileSelectors'
import { userIdSelector } from '../../redux/selectors/authSelectors'
import { getProfile, addPost } from '../../redux/profileActions'
import { getDialogs } from '../../redux/dialogsActions'

import mainPicture from './main.jpg'
import UserInfo from './UserInfo/UserInfo'
import Posts from './Posts/Posts'
import TextFieldWithButton from '../UI/TextFieldWithButton'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        imgWrapper: {
            width: '100%',
            marginBottom: theme.spacing(2)
        },
        backPicture: {
            width: '100%',
            height: 'auto'
        },
        posts: {
            display: 'flex',
            justifyContent: 'center'
        }
    })
)

interface MatchProps {
    id: string 
}

const Profile: React.FC = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const loading = useSelector(loadingData)
    const id = useSelector(userIdSelector)
    const params = useParams<MatchProps>()
    const userId = parseInt(params.id) || id 
    const posts = useSelector(postsSelector)
    const addPostHandler = (value: string) => {
        dispatch(addPost(value))
        return ResultCode.Success
    }
    

    useEffect(() => {
        let isCancel = false
        const fetchData = () => {
            if (!isCancel && userId) {
                dispatch(getProfile(userId))
                userId === id && dispatch(getDialogs())
            }        
        }
        fetchData()
        return () => {
            isCancel = true
        }

    }, [dispatch, userId, id])

    return (
        <div>
            { !userId && <Redirect to='/' /> }
            {
                loading ? <CircularProgress size={120} /> :
                    <>
                        <div className={classes.imgWrapper}>
                            <img className={classes.backPicture} src={mainPicture} alt="main"/>
                        </div>
                        <UserInfo />
                        <Posts posts={posts}/>
                        <div className={classes.posts}>
                            <TextFieldWithButton onClick={addPostHandler} buttonName='add post'/>
                        </div>
                    </>
            }            
        </div>
    )
};

export default Profile
