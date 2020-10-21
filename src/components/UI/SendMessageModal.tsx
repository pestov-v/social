import React, { useState } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Button, OutlinedInput, Dialog, DialogActions, DialogContent, Typography } from '@material-ui/core'
import Paper, { PaperProps } from '@material-ui/core/Paper'

import { ResultCode } from '../../types/resultCodes'
import Draggable from 'react-draggable'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minWidth: 400,
            maxWidth: 700,
            display: 'flex',
            flexDirection: 'column'
        },
        input: {
            width: '100%',
            backgroundColor: '#fff'
        },
        dialogActions: {
            display: 'flex',
            justifyContent: 'space-around',
        }
    }),
)

function PaperComponent(props: PaperProps) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

type TProps = {
    userId: number
    open: boolean
    sendToName?: string | null
    setOpen: (value: boolean) => void
    sendHandler: (userId: number, value: string) => ResultCode
}
const SendMessageModal:React.FC<TProps> = ({ userId, sendHandler, open, setOpen }) => {
    const classes = useStyles()
    const [value, setValue] = useState('')
    const changeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const handleSend = async () => {
        const res = await sendHandler(userId, value)
        if (res === ResultCode.Success) {
            setValue('')
            setOpen(false)
        }
    }
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
        >
            <Typography
                style={{ cursor: 'move', paddingTop: 8 }}
                align='center'
                id='draggable-dialog-title'
            >
                Send message
            </Typography>
            <DialogContent>
                <OutlinedInput
                    className={classes.input}
                    rows={3}
                    value={value}
                    required
                    multiline
                    onChange={changeHandler}
                />
            </DialogContent>
            <DialogActions className={classes.dialogActions}>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={handleSend}
                >Send</Button>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={handleClose}
                >Cancel</Button>
            </DialogActions> 
        </Dialog>
  );
}

export default SendMessageModal