import React from 'react'
import {DeleteForeverTwoTone, EditTwoTone} from '@material-ui/icons'

type TProps = {}

const IconsEdit: React.FC<TProps> = () => {

    return (
        <>
            <EditTwoTone style={{marginRight: 8, color: 'blue', cursor: 'pointer'}}/>
            <DeleteForeverTwoTone style={{color: 'red', cursor: 'pointer'}} />
        </>
    )
};

export default IconsEdit
