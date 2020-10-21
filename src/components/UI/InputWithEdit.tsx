import React, {useState} from 'react'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import {DoneTwoTone, Close} from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'relative'
        },
        postEdit: {
            position: 'relative',
            left: -2,
            font: 'inherit',
            padding: '3px 50px 2px 2px',
            border: 0,
            borderBottom: '1px solid #b7b5b5',
            marginRight: theme.spacing(1),
            boxSizing: 'border-box'
        },
        icons: {
            position: 'absolute',
            top: -1,
            right: 8
        }
    })
)

type TProps = {
    text: string
    width: number
    editCancel: () => void
    onSave: (value: string) => void
}

const InputWithEdit: React.FC<TProps> = ({text, editCancel, onSave, width}) => {
    const classes = useStyles()
    if (typeof text === 'boolean' || !text) {
        text = ''
    }
    const [value, setValue] = useState(text)
    const changeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    return (
        <div className={classes.root}>
            <input className={classes.postEdit} value={value} onChange={changeHandler} style={{width: width + 62}} />
            <div className={classes.icons}>
                <DoneTwoTone style={{color: 'green', cursor: 'pointer'}} onClick={() => onSave(value)}/>
                <Close style={{color: 'red', cursor: 'pointer'}} onClick={editCancel} />
            </div>
        </div>
    )
};

export default InputWithEdit;
