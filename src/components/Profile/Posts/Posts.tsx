import React from 'react'
import {TPosts} from '../../../types/profile'
import {List} from '@material-ui/core'
import PostItem from './PostItem'

type TProps = {
    posts: TPosts
}

const Posts: React.FC<TProps> = ({ posts }) => {

    return (
        <List>
            { posts.map(item => <PostItem key={item.id} {...item} />) }
        </List>
    )
};

export default Posts
