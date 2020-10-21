import React, {useState, useEffect} from 'react'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import { Tooltip } from '@material-ui/core'
import {DoneTwoTone, Close} from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        inputWrap: {
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            marginTop: -1,
            marginBottom: -2
        },
        editInput: {
            position: 'relative',
            width: 200,
            font: 'inherit',
            padding: '0px 50px 0px 2px',
            border: 0,
            borderBottom: '1px solid #b7b5b5',
            margin: `0px ${theme.spacing(1)}px -1px -2px`,
            boxSizing: 'border-box',
            outline: 'none'
        },
        icons: {
            zIndex: 1,
            marginLeft: -55
        }
    })
)

type TProps = {
    inputName: string | null
    text: string | null
    canEdit: boolean
    onSave: (value: string, inputName: string | null) => void
}

const InputWithEdit: React.FC<TProps> = ({text, onSave, inputName, canEdit}) => {
    const classes = useStyles()
    const [isEdit, setIsEdit] = useState(false)
    const [value, setValue] = useState(text || '')
    if (!inputName) {
        inputName = 'input'
    }
    const changeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    const editCancel = () => {
        setIsEdit(false)
        setValue(text || '')
    }
    const width = 200
    useEffect(() => {
        setValue(text ? text : '')
    }, [text])
    return (
        <>
                    
            {
                canEdit && isEdit ? 
                    <span className={classes.inputWrap}>
                        <input
                            name={inputName}
                            className={classes.editInput}
                            value={value}
                            onChange={changeHandler}
                            style={{width}}
                            autoFocus
                        />
                        <span className={classes.icons}>
                            <DoneTwoTone
                                style={{color: 'green', cursor: 'pointer'}}
                                onClick={() => {
                                    onSave(value, inputName)
                                    setIsEdit(false)
                                }}
                            />
                            <Close style={{color: 'red', cursor: 'pointer'}} onClick={editCancel} />
                        </span>
                    </span> :
                    <Tooltip title='For edit - Double Click' placement='top-start'>
                        <span
                            style={{display: !isEdit ? 'flex' : 'none'}}
                            onDoubleClick={() => {canEdit && setIsEdit(true)}}
                        >
                            {text}
                        </span>
                    </Tooltip>
            }
        </>
    )
};

export default InputWithEdit;
