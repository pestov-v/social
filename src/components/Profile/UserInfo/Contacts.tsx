import React, { useState } from 'react'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Collapse } from '@material-ui/core'
import { ChevronRight, ExpandMore } from '@material-ui/icons'

import InputWithEditC from '../../UI/InputWithEditOnClick'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        contactsWrap: {
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: theme.spacing(1)
        },
        contacts: {
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer'
        },
        contactItem: {
            display: 'flex',
            alignItems: 'center',
            minHeight: 25,
            paddingLeft: theme.spacing(4),
            '& input': {
                marginBottom: 0
            }
        }
    })
)

type TProps = {
    contacts: { [key: string]: string | null }
    saveHandler: (value: string, inputName: string | null) => void
    isOwner: boolean
}

const UserInfo:React.FC<TProps> = ({ contacts, saveHandler, isOwner}) => {
    const classes = useStyles()
    const [openContacts, setOpenContacts] = useState(false)
    
    return (
        <div className={classes.contactsWrap}>
            <strong className={classes.contacts}
                onClick={() => setOpenContacts(!openContacts)}
            >
                {openContacts ? <ExpandMore /> : <ChevronRight />}
                Contacts: {!openContacts && '...'}    
            </strong>

            <Collapse in={openContacts}>
                <>
                    {
                        Object.entries(contacts).map(([title, value], index) => {
                            return (
                                <div key={index} className={classes.contactItem}>
                                    <strong>{title}:&nbsp;</strong>
                                    <InputWithEditC
                                        inputName={title}
                                        onSave={saveHandler}
                                        text={value}
                                        canEdit={isOwner}
                                    />
                                </div>
                            )
                        })
                    }
                </>  
            </Collapse>
        </div>
    )
}

export default UserInfo