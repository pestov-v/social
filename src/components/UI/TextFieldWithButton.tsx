import React, { useState } from 'react'
import { Button, OutlinedInput } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import { ResultCode } from '../../types/resultCodes'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 700,
            display: 'flex',
            flexDirection: 'column'
        },
        input: {
            width: '100%',
            marginBottom: theme.spacing(1),
            backgroundColor: '#fff'
        },
        button: {
            display: 'flex',
            alignSelf: 'flex-end',
            marginRight: theme.spacing(2)
        }
    }),
)

type TProps = {
    onClick: (value: string) => ResultCode
    buttonName: string
}

const TextFieldWithButton: React.FC<TProps> = ({ onClick, buttonName }) => {
    const classes = useStyles()
    const [value, setValue] = useState('')
    const changeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    const onClickHandler = () => {
        if (value.length) {
            const res = onClick(value)            
            res === ResultCode.Success && setValue('')
        }
    }
    return (
        <form className={classes.root}>
            <OutlinedInput
                className={classes.input}
                rows={2}
                value={value}
                required
                multiline
                onChange={changeHandler}
            />
            <Button
                className={classes.button}
                variant='contained'
                color='primary'
                onClick={onClickHandler}
            >{buttonName}</Button>
        </form>
    )
};

export default TextFieldWithButton
